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
                        <div class="kakao">kakao</div>
                        <div class="kakao">naver</div>
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
            //sampleData: ''
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
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
</style>