<template>
  <div class="container">
    <MypageTop />
    <div class="mypagemain">
      <MypageSideBar />
      <div class="mypagebox">
        <div class="rev_box">
          <p class="text1">MY 쿠폰</p>
            <div v-if="coupon.length > 0">
              <div v-for="cp in coupon" :key="cp" class="user_coupon">
                <div class="coupon_info">
                  <span class="coupon_title">{{ cp.coupon_title }}</span>
                </div>
                <div class="coupon_details">
                  <div class="img_box">
                    <img src="../images/coupon.png" class="coupon_img">
                  </div>
                  <div class="info">
                    <span class="coupon_sale">{{ cp.coupon_sale }}원</span>
                    <!-- <span class="coupon_img1">{{ cp.coupon_img1 }}</span> -->
                    <span class="coupon_enddate">{{ cp.coupon_enddate }}까지</span>
                    <span class="coupon_comment">{{ cp.coupon_comment }}</span>
                  </div>
                </div>
              </div>
            </div>
          <div v-else>쿠폰함이 비어있습니다</div>
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
      coupon: [],
    };
  },
  methods: {
    async usercoupon() {
      const user_no = this.$route.params.user_no;
      try {
        const response = await axios.post(`http://localhost:3000/user/coupon/${user_no}`);
        this.coupon = response.data;
      } catch (error) {
        console.error("쿠폰 상세보기 에러 발생", error);
      }
    },
  },
  mounted() {
    this.usercoupon();
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

.mypagemain {
  display: flex;
  margin-top: 20px;
}

.mypagebox {
  width: 100%;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.rev_box, .qna_box {
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

.user_coupon {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.coupon_info, .coupon_details {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

.coupon_title {
  font-weight: bold;
  font-size: 1.1em;
}

.coupon_sale, .coupon_img1, .coupon_startdate, .coupon_enddate, .coupon_comment {
  color: #888;
}

.coupon_details {
  display: flex;
  /* flex-direction: column; */
  gap: 5px;
  padding-left: 10px;
  padding-top: 10px;
  text-align: right;
}
.coupon_details span {
  display: block;
}
.coupon_img {
  width: 200px;
  height: 200px;
}
.info {
  margin-top: 50px;
}
</style>
