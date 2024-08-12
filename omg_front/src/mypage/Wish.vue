<template>
  <div class="container">
    <MypageTop />
    <div class="mypagemain">
      <MypageSideBar />
      <div class="mypagebox">
        <div class="rev_box">
          <p class="text1">나의 관심 영화</p>
          <div v-if="wish.length > 0">
            <div v-for="item in paginatedWish" :key="item.movie_id" class="user_wish">
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
                  <button class="wish_btn" @click="gotorev(item.movie_no)">예매하기</button>
                  <div>
                  <button class="wish_btn" @click="delwish(item.movie_no)">관심영화 삭제</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>나의 관심영화가 비어있습니다</div>
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
import Swal from 'sweetalert2';

export default {
  components: {
    MypageTop,
    MypageSideBar,
  },
  data() {
    return {
      wish: [],
      currentPage: 1,
      perPage: 2,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.wish.length / this.perPage);
    },
    paginatedWish() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.wish.slice(start, end);
    },
  },
  methods: {
    gotorev(movie_no) {
      this.$router.push({
        path: `/moviebooking`,
        params: { movie_no: movie_no }
      });
    },
    async delwish(movie_no) {
      const user_no = this.$route.params.user_no;
      Swal.fire({
        title: '정말로 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제하기',
        cancelButtonText: '취소하기'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post(`http://localhost:3000/user/delwish`, { user_no: user_no, wish_movie_no: movie_no });
            Swal.fire('삭제되었습니다!', '관심영화에서 삭제되었습니다.', 'success');
            this.userwish(); // 삭제 후 위시리스트를 새로고침
          } catch (error) {
            console.error("나의 관심영화 삭제 에러 발생", error);
            Swal.fire('에러 발생', '관심영화 삭제 도중 에러가 발생했습니다.', 'error');
          }
        } else {
          console.log("관심영화 삭제가 취소되었습니다.");
        }
      });
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
    getImagePath(image) {
      return `https://image.tmdb.org/t/p/w500/${image}`;
    },
    gotoPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
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
  object-fit: cover;
}

.info {
  margin-top: 50px;
}

.wish_btn {
  background-color: #f0eeda;
  border: 1px solid #d8c6b0;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s, border-color 0.3s;
}

.wish_btn:hover {
  background-color: #d8c6b0;
  border-color: #bfae9d;
}

.wish_btn:active {
  background-color: #c7bfa6;
}

.paging {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 20px 0;
  justify-content: center;
  margin-left: 400px;
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
