<template>
    <div class="container">
        <MypageTop />
        <div class="elmain">
            <MypageSideBar />
            <div class="elbox">
                <div class="rev_box">
                    <p class="text1">간편로그인 <br><br>
                        <span style="font-size: 14px; font-weight: lighter">각 서비스 별 1회 인증 후 간편 간편 로그인 설정을 하실 수 있습니다.</span>
                    </p>
                    <div class="social_wrap">
                        <div class="social_title">
                            <div class="title">
                                <span>구분</span>
                                <span>간편 로그인 설정 정보</span>
                            </div>
                        </div>
                        <div class="kakao_wrap">
                            <div class="sort">
                                <img class="sort_img" src="../images/ico_kakao.png" alt="kakao">
                                <p class="sort_name">카카오 로그인</p>
                            </div>
                            <div class="setbtn">
                                <p class="input_radio">
                                    <input class="ka_set" type="radio" name="kakao_set" id="kakao_set" value="set" @click="kakao_login" v-model="selectedOption" :class="{'active': selectedOption === 'set'}">
                                    <label :for="kakao_set" :class="{'active-label': selectedOption === 'set'}" >설정</label>
                                </p>
                                <p class="input_radio" >
                                    <input class="ka_unset" type="radio" name="kakao_unset" id="kakao_unset" value="unset" v-model="selectedOption" :class="{'active': selectedOption === 'unset'}">
                                    <label :for="kakao_unset" :class="{'active-label': selectedOption === 'unset'}" >설정안함</label>
                                </p>
                            </div>
                        </div>
                        <div class="naver_wrap">
                            <div class="sort">
                                <img class="sort_img" src="../images/ico_naver.png" alt="naver">
                                <p class="sort_name">네이버 로그인</p>
                            </div>
                            <div class="setbtn">
                                <p class="input_radio">
                                    <input class="na_set" type="radio" name="naver_set" id="naver_set" value="set1" v-model="selectedOption1" :class="{'active1': selectedOption1 === 'set1'}">
                                    <label :for="naver_set" :class="{'active-label1': selectedOption1 === 'set1'}" >설정</label>
                                </p>
                                <p class="input_radio" >
                                    <input class="na_unset" type="radio" name="naver_unset" id="naver_unset" value="unset1" v-model="selectedOption1" :class="{'active1': selectedOption1 === 'unset1'}">
                                    <label :for="naver_unset" :class="{'active-label1': selectedOption1 === 'unset1'}" >설정안함</label>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MypageSideBar from '../layouts/MypageSideBar.vue';
import MypageTop from '../layouts/MypageTop.vue';
import axios from 'axios';


export default {
    components: {
        MypageTop,
        MypageSideBar,
    },
    data() {
        return {
            selectedOption: 'unset',
            selectedOption1: 'unset1',
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        kakao_login(){
            window.Kakao.Auth.login({
                scope: "profile_nickname, account_email",
                success: this.getKakaoProfile,
                fail: err => {
                console.error(err);
                this.$swal('카카오 로그인에 실패했습니다.');
                }
            });
        }
    }
}
</script>
<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.elmain {
  display: flex;
  margin-top: 20px;
}

.elbox {
  width: 100%;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.rev_box {
  border: 1px solid #f0eeda;
  padding: 20px;
  padding-bottom: 10px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.text1 {
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid rgb(179, 177, 177);
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.social_wrap{
    width: 100%;

}

.social_title{
    width: 100%;
    height: 30px;
    background: #c1c1c1;
    line-height: 30px;
    margin-bottom: 10px;
}

.kakao_wrap, .naver_wrap{
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
}

.title{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.title span{
    width: 50%;
    text-align: center;
}

.kakao_wrap, .naver_wrap{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    /* border: 1px solid black; */
}

.sort, .setbtn{
    width: 50%;
    height: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.sort_img{
    width: 50px; 
    height: 50px; 
    line-height: 40px; 
    border-radius: 20px
}

.sort_name{
    padding-left: 20px;
    margin-bottom: 0;
    line-height: 50px;
}
.input_radio{
    position: relative;
    width: 100px;
    margin-bottom: 0;
    text-align: center;
    
}
.ka_set, .ka_unset, .na_set, .na_unset{
    appearance: none;
    position: absolute;
    left: 0;
    top: 6px;
    margin: 0;
    /* padding: 20px; */
    width: 100%;
    height: 35px;
    color: #999;
    line-height: 30px;
    border: 1px solid #d6d5c7;
    border-radius: 5px;
    cursor: pointer;
    /* opacity: 0; */
}

.active {
  border: 2px solid rgb(255, 95, 95);
  color: rgb(255, 95, 95);
}
.active-label {
  color: rgb(255, 95, 95);
}
.active1 {
  border: 2px solid rgb(255, 95, 95);
  color: rgb(255, 95, 95);
}
.active-label1 {
  color: rgb(255, 95, 95);
}
</style>