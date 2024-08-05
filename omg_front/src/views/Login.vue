<template>
   <div class="login_main">
        <div class="login_wrap">
            <div class="login_list">
                <div class="list_title">
                    <h3>로그인</h3>
                </div>
                <form @submit.prevent="login">
                    <div class="list_menu">
                        <input type="text" v-model="user_id" placeholder="아이디"> 
                        <input type="password" v-model="user_pwd" placeholder="비밀번호"> 
                    </div>
                    <div class="find">
                        <a @click="openFindIdModal">아이디 찾기</a>
                        <span style="color: #2b2a2aa5">|</span>
                        <a @click="openFindPwModal">비밀번호 찾기</a>
                    </div>
                    <div class="login_btn">
                        <button type="subit">SING IN</button>
                    </div>
                    <div class="join_btn">
                        <button type="butotn" @click="join">JOIN</button>
                    </div>
                </form>
            </div>
            <div class="login_list2">
                <div class="list_title">
                    <h3>간편 로그인</h3>
                </div>
                <div class="social kakaologin">
                    <button type="button">카카오 로그인</button>
                </div>
                <div class="naverlogin">
                    <button type="button">네이버 로그인</button>
                </div>
            </div>
        </div>
        <FindIdModal :isOpen="isFindIdModalOpen" @close="closeFindIdModal" @switch="switchModal" />
        <FindPasswordModal :isOpen="isFindPwModalOpen" @close="closeFindPwModal" @switch="switchModal" />

   </div>
   
</template>
<script>
import axios from 'axios';
import FindIdModal from '../views/FindId';
import FindPasswordModal from '../views/FindPw';

export default {
    components: { FindIdModal, FindPasswordModal },
    data() {
        return {
            user_id: '',
            user_pwd: '',
            currentView: 'findId',
            isFindIdModalOpen: false,
            isFindPwModalOpen: false,
        };
    },
    methods: {
        openFindIdModal() {
            this.isFindIdModalOpen = true;
            this.isFindPwModalOpen = false;
        },
        closeFindIdModal() {
            this.isFindIdModalOpen = false;
        },
        openFindPwModal() {
            this.isFindPwModalOpen = true;
            this.isFindIdModalOpen = false;
        },
        closeFindPwModal() {
            this.isFindPwModalOpen = false;
        },
        switchModal(modal) {
            if (modal === 'findId') {
                this.openFindIdModal();
            } else if (modal === 'findPassword') {
                this.openFindPwModal();
            }
        },
        async login(){
            try{
                const res = await axios({
                    url: `http://localhost:3000/auth/login`,
                    method: "POST",
                    data: {
                        user_id : this.user_id,
                        user_pwd : this.user_pwd
                    },
                });
                console.log("res.data: ----------> ",res.data);
                if(res.data.code === 200) {
                    //로그인 성공 시
                    const user_auth = res.data.user_auth
                    if(user_auth === 1){
                        const userPayload = {
                            user_id: res.data.user_id,
                            user_no: res.data.user_no,
                            user_auth: res.data.user_auth,
                            user_name: res.data.user_name,
                            user_del : res.data.user_del
                        };
                        this.$store.commit('setUser', userPayload);
                        // window.location.href = '/';
                        this.$router.push({path: "/"})
                    } else {
                        const user_auth = res.data.user_auth;
                        if(user_auth === 0) {
                            const adminPayload = {
                                user_id : res.data.user_id,
                                user_no : res.data.user_no,
                                user_auth : res.data.user_auth,
                            };
                            this.$store.commit('setUser', adminPayload);
                            // window.location.href = "/admin";
                            this.$router.push({path: "/admin"})
                        } else {
                            console.log("관리자가 아닙니다.");
                            this.$swal("관리자가 아닙니다.");
                        }
                    }
                } else if(res.data.code === 401){
                    //비밀번호 오류시
                    this.$swal(res.data.message);
                } else if(res.data.code === 404){
                    //존재하지 않은 아이디일 때
                    this.$swal(res.data.message)
                } else if (res.data.code === 402) {
                    // 존재하지 않는 이메일일 때
                    this.$swal(res.data.message);
                }
            } catch (error){
                this.$swal(error);
            }
        },
        join(){
            this.$router.push({path: '/join'})
            console.log('회원가입 페이지로 이동');
        }
    }
}
</script>
<style scoped>
.login_main{
    width: 100%;
    height: 800px;
    /* background: gray; */
}
.login_wrap{
    width: 60%;
    height: 80%;
    margin: auto;
    position: relative;
    top: 80px;
    background: white;
    border: 1px solid #fdfbe7;
    border-radius: 20px;
    display: flex;
    text-align: center;
}
.login_list{
    width: 50%;
    height: 100%;
    background: #fdfbe7;
    border-radius: 20px 0 0 20px;
}
.login_list2{
    width: 50%;
    height: 100%;
    background: #f6f2c2;
    border-radius: 0 20px 20px 0;
}

.list_title{
    padding-top: 80px;
    padding-bottom: 10px;
}
.list_title>h3{
    font-size: 30px;
    font-weight: bold;
}

.list_menu{
    padding-top: 80px;
}
.list_menu > input{
    width: 70%;
    height: 50px;
    padding: 15px;
    border-radius: 20px;
    border: 1px solid;
    margin-top: 20px;
}

.find{
    padding-top: 20px;
}
.find > a{
    cursor: pointer;
}
.find > span{
    padding-left: 10px;
    padding-right: 10px;
}

.login_btn{
    padding-top: 30px;
}
.login_btn > button{
    width: 250px;
    height: 40px;
    font-size: 22px;
    border-radius: 25px;
    background: white;
}

.join_btn{
    padding-top: 15px;
}
.join_btn > button{
    width: 250px;
    height: 40px;
    font-size: 22px;
    border-radius: 25px;
    background: white;
}

.social {
    padding-top: 150px;
}
.kakaologin > button{
    width: 350px;
    height: 50px;
    background: yellow;
    border: 0px;
    border-radius: 25px;
    font-size: 22px;
}

.naverlogin {
    padding-top: 30px;
}
.naverlogin > button{
    width: 350px;
    height: 50px;
    background: rgb(0, 216, 0);
    border: 0px;
    border-radius: 25px;
    font-size: 22px;
    color: white;
}
</style>