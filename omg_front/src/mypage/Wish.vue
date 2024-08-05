<template>
  <div class="container">
    <MypageTop />
    <div class="mypagemain">
      <MypageSideBar />
      <div class="mypagebox">
        <div class="rev_box">
          <p class="text1">나의 관심 영화</p>
          <div v-if="wish.length > 0">
            <div v-for="item in wish" :key="item.movie_id" class="user_wish">
              <div class="wish_info">
                <span class="movie_title">{{ item.movie_title }}</span>
              </div>
              <div class="wish_details">
                <div class="img_box">
                  <img :src="getImagePath(item.movie_img0)" class="movie_img">
                </div>
                <div class="info">
                  <span class="movie_startdate">{{ item.movie_startdate }}</span>
                  <span class="movie_enddate">{{ item.movie_enddate }}</span>
                  <span class="movie_tag">{{ item.movie_tag }}</span>
                  <span class="movie_director">{{ item.movie_director }}</span>
                  <button class="wish_btn" @click="gotorev">예매하기</button>
                  <div>
                  <button class="wish_btn" @click="delwish">위시리스트 삭제</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>나의 관심영화가 비어있습니다</div>
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
      wish: [],
    };
  },
  methods: {
    gotorev() {
      this.$router.push(`/moviebooking`);
    },
    async userwish() {
      const user_no = this.$route.params.user_no;
      try {
        const response = await axios.post(`http://localhost:3000/user/wish/${user_no}`);
        this.wish = response.data;
      } catch (error) {
        console.error("찜한영화 리스트 에러 발생", error);
      }
    },
    getImagePath(image){
            return (`https://image.tmdb.org/t/p/w500/${image}`);
        },
  },
  mounted() {
    this.userwish();
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

.user_wish {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.wish_info, .wish_details {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

.movie_title {
  font-weight: bold;
  font-size: 1.1em;
}

.movie_startdate, .movie_enddate, .movie_tag, .movie_director {
  color: #888;
}

.wish_details {
  display: flex;
  gap: 5px;
  padding-left: 10px;
  padding-top: 10px;
  text-align: right;
}

.wish_details span {
  display: block;
}

.movie_img {
  width: 250px;
  /* height: 200px; */
  object-fit: cover;
}

.info {
  margin-top: 50px;
}
/* wish_btn 스타일 */
.wish_btn {
  background-color: #f0eeda; /* 배경색 */
  border: 1px solid #d8c6b0; /* 테두리색 */
  color: #333; /* 텍스트 색상 */
  padding: 10px 20px; /* 패딩 */
  border-radius: 5px; /* 테두리 둥글게 */
  font-size: 1em; /* 글꼴 크기 */
  font-weight: bold; /* 글꼴 두께 */
  cursor: pointer; /* 커서 모양 */
  margin-top: 20px;
  transition: background-color 0.3s, border-color 0.3s; /* 호버 효과를 위한 트랜지션 */
}

/* 버튼 호버 상태 */
.wish_btn:hover {
  background-color: #d8c6b0; /* 호버 시 배경색 */
  border-color: #bfae9d; /* 호버 시 테두리색 */
}

/* 버튼 클릭 상태 */
.wish_btn:active {
  background-color: #c7bfa6; /* 클릭 시 배경색 */
}
</style>
