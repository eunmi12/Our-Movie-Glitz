<template>
    <div class="container">
      <div class="sidebartop">
        <div @click="goToAboutPage1">MY OMG HOME</div>
      </div>
      <div class="sidebarmain">
        <div class="text" @click="goToAboutPage2">&bull; 나의 예매내역</div>
        <div class="text" @click="goToAboutPage3">&bull; 포인트 적립내역</div>
        <div class="text" @click="goToAboutPage4">&bull; 나의 쿠폰</div>
        <div class="text" @click="toggleVisibility">&bull; 회원 정보</div>
        <div v-if="isVisible">
          <div class="toggle">
            <div style="cursor: pointer" @click="goToAboutPage5">&bull; 개인정보 변경</div>
            <div style="cursor: pointer" @click="goToAboutPage6">&bull; 회원탈퇴</div>
          </div>
        </div>
        <div class="text"  @click="goToAboutPage7">&bull; 나의 문의내역</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: false,
      };
    },
    methods: {
      toggleVisibility() {
        this.isVisible = !this.isVisible;
      },
      goToAboutPage1() {
        this.$router.push('./user/home');
      },
      goToAboutPage2() {
        this.$router.push('./user/rev');
      },
      goToAboutPage3() {
        this.$router.push('./user/point');
      },
      goToAboutPage4() {
        this.$router.push('./user/coupon');
      },
      goToAboutPage5() {
        this.$router.push('./user/user');
      },
      goToAboutPage6() {
        this.$router.push('./user/userout');
      },
      goToAboutPage7() {
        this.$router.push('./user/gogaekcenter')
      }
    },
  };
  </script>
<style scoped>
.container {
    width: 15%;
    margin: 400px 1000px 100px 200px;
}
.sidebartop {
    background-color: #f0eeda;
    border: 1px solid none;
    font-size: 20px;
    cursor: pointer;
}
.text {
    margin: 10px auto;
    text-align: left;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
}
.toggle {
    font-size: 18px;
    text-align: justify;
    margin-left: 30px;
}

</style>