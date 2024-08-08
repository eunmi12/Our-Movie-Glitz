<template>
  <div class="container3">
    <div class="sidebartop" @click="goToAboutPage1">MY OMG HOME</div>
    <div class="sidebarmain">
      <div class="text" @click="goToAboutPage2">&bull; 나의 예매내역</div>
      <!-- <div class="text" @click="goToAboutPage3">&bull; 포인트 적립내역</div> -->
      <div class="text" @click="goToAboutPage4">&bull; 나의 쿠폰</div>
      <div class="text" @click="toggleVisibility">&bull; 회원 정보</div>
      <div v-if="isVisible" class="toggle">
        <div class="sub-text" @click="goToAboutPage5">&bull; 개인정보 변경</div>
        <div class="sub-text" @click="goToAboutPage6">&bull; 회원탈퇴</div>
        <div class="sub-text" @click="gotoganpyun">&bull; 간편 로그인</div>
      </div>
      <div class="text" @click="goToAboutPage8">&bull; 나의 관람평내역</div>
      <div class="text" @click="goToAboutPage7">&bull; 나문희내역</div>
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
  computed: {
        user(){
            return this.$store.state.user;
            },
        },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    goToAboutPage1() {
      this.$router.push(`/mypagemain/${this.user.user_no}`);
    },
    goToAboutPage2() {
      this.$router.push(`/rev/${this.user.user_no}`);
    },
    // goToAboutPage3() {
    //   this.$router.push(`/point/${this.user.user_no}`);
    // },
    goToAboutPage4() {
      this.$router.push(`/coupon/${this.user.user_no}`);
    },
    goToAboutPage5() {
      this.$router.push(`/usermypage/${this.user.user_no}`);
    },
    goToAboutPage6() {
      this.$router.push(`/userout/${this.user.user_no}`);
    },
    goToAboutPage7() {
      this.$router.push(`/gogaekcenter/${this.user.user_no}`);
    },
    goToAboutPage8() {
      this.$router.push(`/review/${this.user.user_no}`);
    },
    gotoganpyun() {
      this.$router.push(`/ellogin/${this.user.user_no}`)
    }
  },
};
</script>

<style scoped>
.container3 {
  width: 25%;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: auto;
}

.sidebartop {
  background-color: #f0eeda;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebarmain {
  padding-left: 10px;
}

.text {
  margin: 10px 0;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  text-align: left;
}

.text:hover {
  background-color: #f0eeda;
}

.toggle {
  margin-left: 20px;
}

.sub-text {
  margin: 5px 0;
  padding: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  text-align: left;
}

.sub-text:hover {
  background-color: #f0eeda;
}
</style>
