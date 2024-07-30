<template>
    <div class="container">
      <MypageTop />
      <div class="mypagemain">
        <MypageSideBar />
        <div class="mypagebox">
          <div class="rev_box">
          <p class="text1">MY 리뷰 내역</p>
          <div v-for="reviews in review" :key="reviews.movie_title" class="user_review">
            <div class="review_info">
              <span class="review_title">{{ reviews.movie_title }}</span>
              <span class="review_date">{{ reviews.review_date }}</span>
            </div>
            <div class="review_details">
              <span class="review_comment">{{ reviews.review_comment }}</span>
              <span class="review_like">좋아요: {{ reviews.review_like }}</span>
              <span class="review_rate">평점: {{ reviews.review_rate }}</span>
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
        review: [],
      }
    },
    methods: {
      async userreview() {
        const user_no = this.$route.params.user_no;
        try {
          const response = await axios.post(`http://localhost:3000/user/review/${user_no}`);
          this.review = response.data;
        } catch (error) {
          console.error("리뷰내역 에러 발생", error);
        }
      },
    },
    mounted() {
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
  .user_review {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
.review_info {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.review_details {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
.review_title {
  font-weight: bold;
}
.review_date {
  color: #888;
}
.review_comment {
  flex-grow: 2;
}
.review_like, .review_rate {
  margin-left: 10px;
}
  </style>
  