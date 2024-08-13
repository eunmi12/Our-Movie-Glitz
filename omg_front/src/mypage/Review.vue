<template>
  <div class="container">
    <MypageTop />
    <div class="mypagemain">
      <MypageSideBar />
      <div class="mypagebox">
        <!-- 관람평 섹션 -->
        <div class="rev_box">
          <p class="text1">나의 관람평 내역</p>
          <div v-if="paginatedReviews.length > 0">
            <!-- 리뷰 목록 -->
            <div v-for="review in paginatedReviews" :key="review.review_no" class="user_review">
              <div class="review_info">
                <span class="review_title">{{ review.movie_title }}</span>
                <span class="review_date">{{ review.review_date }}</span>
              </div>
              <div class="review_details">
                <span class="review_comment">{{ review.review_comment }}</span>
                <span class="review_like">좋아요: {{ review.review_like }}</span>
                <span class="review_rate">
                  평점: <span v-html="renderStars(review.review_rate)"></span>
                </span>
              </div>
              <button class="delete_btn" @click="delreview(review.review_no)">삭제하기</button>
            </div>
          </div>
          <div v-else>리뷰내역이 없습니다</div>
        </div>
      </div>
    </div>
    <!-- 페이지네이션 -->
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
import Swal from 'sweetalert2';

export default {
  components: {
    MypageTop,
    MypageSideBar,
  },
  data() {
    return {
      review: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.review.length / this.itemsPerPage);
    },
    paginatedReviews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.review.slice(start, end);
    },
  },
  methods: {
    // 유저 리뷰 목록 가져오기
    async userreview() {
      const user_no = this.$route.params.user_no;
      try {
        const response = await axios.post(`http://localhost:3000/user/review/${user_no}`);
        this.review = response.data;
      } catch (error) {
        console.error("리뷰내역 에러 발생", error);
      }
    },
    // 리뷰 삭제
    async delreview(review_no) {
      Swal.fire({
        title: '정말로 리뷰를 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제하기',
        cancelButtonText: '취소하기'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post('http://localhost:3000/user/delreview', { review_no });
            Swal.fire('삭제되었습니다!', '리뷰가 삭제되었습니다.', 'success');
            this.userreview();  // 삭제 후 리뷰 목록을 다시 가져옴
          } catch (error) {
            console.error("리뷰 삭제 도중 에러 발생", error);
            Swal.fire('에러 발생', '리뷰 삭제 도중 에러가 발생했습니다.', 'error');
          }
        } else {
          console.log("리뷰 삭제가 취소되었습니다.");
        }
      });
    },
    // 페이지 이동
    gotoPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    // 평점을 별로 렌더링
    renderStars(rate) {
      const fullStar = '★'; // 가득 찬 별
      const emptyStar = '☆'; // 빈 별
      const maxStars = 5;
      let stars = '';

      for (let i = 0; i < maxStars; i++) {
        stars += i < rate ? fullStar : emptyStar;
      }

      return stars;
    }
  },
  mounted() {
    this.userreview();
  }
}
</script>

<style scoped>
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.mypagemain {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.mypagebox {
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.rev_box {
  border: 1px solid #f0eeda;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: 100%;
  box-sizing: border-box;
}

.text1 {
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid rgb(179, 177, 177);
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.user_review {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  overflow: hidden;
}

.review_info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-weight: bold;
}

.review_details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 10px;
}

.review_title {
  font-weight: bold;
  flex: 1;
}

.review_date {
  color: #888;
}

.review_comment {
  flex: 2;
}

.review_like, .review_rate {
  margin-left: 10px;
}

.delete_btn {
  margin-top: 10px;
  border: 1px solid pink;
  background-color: pink;
  color: rgb(123, 122, 122);
  height: 30px;
  width: 70px;
  border-radius: 5px;
}

.paging {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 20px 0;
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

.review_rate span {
  color: red;
  font-size: 20px;
}
</style>
