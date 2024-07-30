<template>
    <div class="container">
        <MypageTop />
        <div class="mypagemain">
            <MypageSideBar />
            <div class="mypagebox">
                <div class="rev_box">
                    <div class="text1">비밀번호 확인</div>
                    <div class="text2">고객님의 개인정보 보호를 위한 절차이오니, OMG 로그인 시 사용하는 비밀번호를 입력해 주세요.</div>
                    <div class="id_check">
                        <div class="id">
                            <p>
                                <strong class="str_id">아이디</strong>
                                <span>ghlckd1999</span>
                            </p>
                        </div>
                        <div class="pw">
                            <p>
                                <strong class="str_pw">비밀번호</strong>
                                <input type="password" placeholder="비밀번호를 입력하세요">
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="button">
            <button class="ok" @click="deleteuser(user.user_no)">탈퇴하기</button>
            <button class="no" @click="gotomainpage">탈퇴취소</button>
        </div>
    </div>    
</template>

<script>
import MypageSideBar from '../layouts/MypageSideBar.vue';
import MypageTop from '../layouts/MypageTop.vue';

export default {
    components: {
        MypageTop,
        MypageSideBar,
    },
    computed: {
        users(){
            return this.$store.state.user;
            },
        },
    methods: {
        gotomainpage() {
            // 메인 페이지로 이동하는 로직 추가
            this.$router.push(`/mypagemain/${this.users.user_no}`);
        }
    }
}
</script>

<style scoped>
.container {
    width: 80%;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.mypagemain {
    display: flex;
    margin-top: 20px;
}

.mypagebox {
    width: 100%;
    margin-left: 20px;
}

.rev_box {
    border: 1px solid #ccc;
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 10px;
    background-color: #f0eeda;
}

.text1, .text2 {
    text-align: left;
    margin: 10px 0;
    font-weight: bold;
    border-bottom: 1px solid #b3b1b1;
    padding-bottom: 5px;
}

.text2 {
    background-color: #f0eeda;
    padding: 10px;
    border-radius: 5px;
}

.id_check {
    margin-top: 20px;
}

.id, .pw {
    margin: 10px 0;
}

.str_id, .str_pw {
    margin-right: 10px;
    display: inline-block;
    width: 100px;
    font-weight: bold;
}

.pw input {
    padding: 8px;
    width: calc(100% - 110px);
    border: 1px solid #ccc;
    border-radius: 5px;
}

.button {
    display: flex;
    justify-content: center;
    margin-left: 250px;
}

.ok, .no {
    padding: 15px 30px;
    border-radius: 10px;
    border: none;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0 10px;
}

.ok {
    background-color: #4CAF50;
    color: white;
}

.ok:hover {
    background-color: #45a049;
}

.no {
    background-color: rgb(218, 106, 106);
    color: white;
}

.no:hover {
    background-color: rgb(200, 90, 90);
}
</style>
