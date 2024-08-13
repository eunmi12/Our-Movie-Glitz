<template>
  <div class="container">
    <MypageTop />
    <div class="mypagemain">
      <MypageSideBar />
      <div class="mypagebox">
        <!-- 예매내역 섹션 -->
        <div class="rev_box">
          <p class="text1">나의 예매내역</p>
          <div v-if="paginatedReservations.length > 0">
            <div v-for="rev in paginatedReservations" :key="rev.ticket_no" class="user_rev">
              <div class="rev_info">
                <span class="rev_title">{{ rev.movie_title }}</span>
                <div>
                  <span class="rev_date">{{ rev.ticket_date }}&nbsp;&nbsp;&nbsp;</span>
                  <span class="rev_date">{{ rev.ticket_time }}</span>
                </div>
              </div>
              <div class="rev_details">
                <span class="rev_cnt">{{ rev.ticket_cnt }}명</span>
                <span class="rev_seat">{{ rev.ticket_seat }}</span>
                <span class="rev_price">{{ rev.ticket_total_price }}원</span>
                <button class="cancel_btn" @click="cancelReservation(rev.ticket_no)">예매 취소</button>
              </div>
            </div>
            <button v-if="reservations.length > itemsPerSection" class="more_btn" @click="toggleExpand('reservations')">
              {{ expanded.reservations ? '접기' : '더보기' }}
            </button>
          </div>
          <p v-else>예매내역이 없습니다</p>
        </div>

        <!-- 문의내역 섹션 -->
        <div class="qna_box">
          <p class="text1">나의 문의내역</p>
          <div v-if="paginatedHelpcenter.length > 0">
            <div v-for="qna in paginatedHelpcenter" :key="qna.qna_no" class="user_qna">
              <div class="qna_info">
                <span class="qna_title" @click="gotoheldetail(qna.qna_no)">{{ qna.qna_title }}</span>
                <span class="qna_date">{{ qna.qna_date }}</span>
              </div>
            </div>
            <button v-if="helpcenter.length > itemsPerSection" class="more_btn" @click="toggleExpand('helpcenter')">
              {{ expanded.helpcenter ? '접기' : '더보기' }}
            </button>
          </div>
          <p v-else>문의내역이 없습니다</p>
        </div>

        <!-- 리뷰내역 섹션 -->
        <div class="rev_box">
          <p class="text1">나의 관람평 내역</p>
          <div v-if="paginatedReview.length > 0">
            <div v-for="reviews in paginatedReview" :key="reviews.review_no" class="user_review">
              <div class="review_info">
                <span class="review_title" @click="gotoreview">{{ reviews.movie_title }}</span>
                <span class="review_date">{{ reviews.review_date }}</span>
              </div>
              <div class="review_details">
                <span class="review_comment">{{ reviews.review_comment }}</span>
                <span class="review_like">좋아요: {{ reviews.review_like }}</span>
                <span class="review_rate">평점: <span v-html="renderStars(reviews.review_rate)"></span></span>
              </div>
            </div>
            <button v-if="review.length > itemsPerSection" class="more_btn" @click="toggleExpand('review')">
              {{ expanded.review ? '접기' : '더보기' }}
            </button>
          </div>
          <p v-else>리뷰내역이 없습니다</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MypageSideBar from '../layouts/MypageSideBar.vue';
import MypageTop from '../layouts/MypageTop.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  components: {
    MypageTop,
    MypageSideBar,
  },
  data() {
    return {
      reservations: [],
      helpcenter: [],
      review: [],
      itemsPerSection: 3, // 각 섹션에 표시할 항목 수
      expanded: {
        reservations: false,
        helpcenter: false,
        review: false
      }
    };
  },
  computed: {
    paginatedReservations() {
      return this.getPaginated(this.reservations, 'reservations');
    },
    paginatedHelpcenter() {
      return this.getPaginated(this.helpcenter, 'helpcenter');
    },
    paginatedReview() {
      return this.getPaginated(this.review, 'review');
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    renderStars(rating) {
      const fullStar = '★';
      const emptyStar = '☆';
      const maxStars = 5;
      const fullStars = fullStar.repeat(rating);
      const emptyStars = emptyStar.repeat(maxStars - rating);
      return fullStars + emptyStars;
    },
    gotoheldetail(qna_no) {
      this.$router.push({
        path: `/gogaekdetail/${this.user.user_no}`,
        query: { qna_no: qna_no }
      });
    },
    gotorev() {
      this.$router.push(`/rev/${this.user.user_no}`)
    },
    gotohelpcenter() {
      this.$router.push(`/gogaekcenter/${this.user.user_no}`)
    },
    gotoreview() {
      this.$router.push(`/review/${this.user.user_no}`)
    },
    async userrev() {
      const user_no = this.$route.params.user_no;
      try {
        const response = await axios.post(`http://localhost:3000/user/revs/${user_no}`);
        this.reservations = response.data;
      } catch (error) {
        console.error("예약내역 에러 발생", error);
      }
    },
    async userqna() {
      const user_no = this.$route.params.user_no;
      try {
        const response = await axios.post(`http://localhost:3000/user/gogaek/${user_no}`);
        this.helpcenter = response.data;
      } catch (error) {
        console.error("문의내역 에러 발생", error);
      }
    },
    async userreview() {
      const user_no = this.$route.params.user_no;
      try {
        const response = await axios.post(`http://localhost:3000/user/review/${user_no}`);
        this.review = response.data;
      } catch (error) {
        console.error("리뷰내역 에러 발생", error);
      }
    },
    async cancelReservation(ticket_no){
      Swal.fire({
        title: '정말로 예매 취소 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '예매취소',
        cancelButtonText: '취소하기'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const user_no = this.user.user_no; // user_no를 this.user에서 가져옴
          try {
            const response = await axios.post('http://localhost:3000/user/canclemovie', { user_no, ticket_no });
            console.log("예매 취소 성공", response.data);
            Swal.fire('취소되었습니다!', '예매가 취소되었습니다.', 'success');
            this.userrev(); // 예매 내역을 다시 불러와서 갱신
          } catch (error) {
            console.error("예매 취소 도중 에러 발생", error);
            Swal.fire('에러 발생', '예매 취소 도중 에러가 발생했습니다.', 'error');
          }
        } else {
          console.log("예매 취소가 취소되었습니다.");
        }
      });
    },
    toggleExpand(section) {
      this.expanded[section] = !this.expanded[section];
    },
    getPaginated(items, type) {
      const limit = this.expanded[type] ? items.length : this.itemsPerSection;
      return items.slice(0, limit);
    }
  },
  mounted() {
    this.userrev();
    this.userqna();
    this.userreview();
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
}

.text1 {
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid rgb(179, 177, 177);
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.user_rev, .user_qna, .user_review {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.rev_info, .qna_info, .review_info {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.rev_details, .review_details {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

.rev_title, .qna_title, .review_title {
  font-weight: bold;
}
.review_title {
  cursor: pointer;
}
.qna_title {
  cursor: pointer;
}

.rev_date, .qna_date, .review_date {
  color: #888;
}

.review_comment {
  flex-grow: 2;
}

.review_like, .review_rate {
  margin-left: 10px;
}

.more_btn {
  display: block;
  margin-top: 10px;
  margin-left: 400px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f0eeda;
  color: #333;
  cursor: pointer;
  font-size: 16px;
}

.more_btn:hover {
  background-color: #d8c6b0;
}
.cancle {
  border: none;
  background-color: red;
  color: white;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
}
.review_rate span {
  color: red;
  font-size: 20px;
}
.cancel_btn {
  margin-top: 10px;
  border: 1px solid pink;
  background-color: pink;
  color: rgb(123, 122, 122);
  height: 30px;
  width: 80px;
  border-radius: 5px;
}
</style>
