<template>
  <div class="container">
    <MypageTop />
    <div class="mypagemain">
      <MypageSideBar />
      <div class="mypagebox">
        <div class="rev_box">
          <p class="text1">MY 쿠폰</p>
          <div v-if="paginatedCoupons.length > 0">
            <div v-for="cp in paginatedCoupons" :key="cp.coupon_no" class="user_coupon">
              <div class="coupon_info">
                <span class="coupon_title">{{ cp.coupon_title }}</span>
              </div>
              <div class="coupon_details">
                <div class="img_box">
                  <img src="../images/coupon.png" class="coupon_img" alt="쿠폰 이미지">
                </div>
                <div class="info">
                  <span class="coupon_sale">{{ cp.coupon_sale }}원</span>
                  <span class="coupon_enddate">{{ cp.coupon_enddate }}까지</span>
                  <span class="coupon_comment">{{ cp.coupon_comment }}</span>
                  <span class="coupon_comment">{{ CouponStatus(cp.uc_coupon_able) }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else>쿠폰함이 비어있습니다</div>
        </div>
      </div>
    </div>
    <ul class="paging">
      <li v-for="page in totalPages" :key="page">
        <a href="#" @click.prevent="gotoPage(page)" :class="{ active: page === currentPage }">
          {{ page }}
        </a>
      </li>
    </ul>
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
      currentPage: 1,
      itemsPerPage: 3,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.coupon.length / this.itemsPerPage);
    },
    paginatedCoupons() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.coupon.slice(start, end);
    }
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
    CouponStatus(uc_coupon_able) {
      const status = {
        0: '사용불가',
        1: '사용가능'
      };
      return status[uc_coupon_able] || '상태 불명';
    },
    gotoPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
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

.coupon_sale, .coupon_enddate, .coupon_comment {
  color: #888;
}

.coupon_details {
  display: flex;
  gap: 10px;
  padding-left: 10px;
  padding-top: 10px;
  text-align: right;
}

.coupon_details span {
  display: block;
}

.coupon_img {
  width: 250px;
  height: 250px;
  object-fit: cover;
}

.info {
  margin-top: 20px;
}

.paging {
  display: flex;
  list-style: none;
  padding: 0;
  margin-left: 400px;
  margin-top: 20px;
  justify-content: center;
}

.paging li {
  margin: 0 5px;
}

.paging a {
  display: block;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

.paging a.active {
  background-color: #f0eeda;
  border-color: #d8c6b0;
  color: #333;
}

.paging a:hover {
  background-color: #d8c6b0;
  border-color: #bfae9d;
}
</style>
