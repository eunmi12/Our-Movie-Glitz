<template>
  <div class="container">
    <MypageTop />
    <div class="mypagemain">
      <MypageSideBar />
      <div class="mypagebox">
        <div class="qna_box">
          <div>
            <span class="text1">MY 문의 내역</span>
            <button class="bt" @click="gotohelp">문의하기</button>
          </div>
          <div v-if="paginatedHelpcenter.length > 0">
            <div v-for="qna in paginatedHelpcenter" :key="qna.qna_no" class="user_qna" @click="gotoheldetail(qna.qna_no)">
              <div class="qna_info">
                <span class="qna_type">{{ getQnaType(qna.qna_type) }}</span>
                <span class="qna_title">{{ qna.qna_title }}</span>
                <span class="qna_date">{{ qna.qna_date }}</span>
              </div>
              <span class="nans" v-if="!qna.qna_answer">답변 대기</span>
              <span class="ans" v-else>답변 완료</span>
              <button class="delqna" @click.stop="delqna(qna.qna_no)">삭제하기</button>
            </div>
          </div>
          <div class="line" v-else>문의내역이 없습니다</div>
        </div>
        <!-- 페이징 버튼 추가 -->
        <ul class="paging">
          <li v-for="page in totalPages" :key="page">
            <a href="#" @click.prevent="gotoPage(page)" :class="{ active: page === currentPage }">
              {{ page }}
            </a>
          </li>
        </ul>
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
      helpcenter: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.helpcenter.length / this.itemsPerPage);
    },
    paginatedHelpcenter() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.helpcenter.slice(start, end);
    },
    user() {
      return this.$store.state.user || {}; // 상태가 정의되지 않았을 때 빈 객체 반환
    }
  },
  methods: {
    gotohelp() {
      this.$router.push(`/help/qna`);
    },
    gotoheldetail(qna_no) {
      this.$router.push({
        path: `/gogaekdetail/${this.user.user_no}`,
        query: { qna_no: qna_no }
      });
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
    async delqna(qna_no) {
      try {
        await axios.post('http://localhost:3000/user/delqna', { qna_no });
        this.userqna();  // 삭제 후 문의내역을 다시 가져옵니다.
      } catch (error) {
        console.error("QnA 삭제 도중 에러 발생", error);
      }
    },
    getQnaType(qna_type) {
      const types = {
        0: '문의유형 : 예매',
        1: '문의유형 : 이벤트',
        2: '문의유형 : 멤버쉽'
      };
      return types[qna_type] || '기타';
    },
    gotoPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  },
  mounted() {
    this.userqna();
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

.qna_box {
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

.user_qna {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  cursor: pointer;
}

.qna_info {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.qna_title {
  font-weight: bold;
}

.qna_date {
  color: #888;
}

.delqna {
  margin-left: 730px; /* 버튼을 오른쪽으로 정렬 */
  margin-top: 10px;
  border: 1px solid pink;
  background-color: pink;
  color: rgb(123, 122, 122);
  width: 80px;
  height: 30px;
  border-radius: 5px; /* 버튼의 모서리를 둥글게 */
  cursor: pointer;
}

.delqna:hover {
  background-color: #e0b0b0;
}

.delqna:active {
  background-color: #d09b9b;
}

.ans {
  margin-top: 30px;
  border: 1px solid rgb(245, 110, 110);
  background-color: rgb(245, 110, 110);
  color: white;
  padding: 3px 3px 3px 3px;
  border-radius: 5px; /* 버튼의 모서리를 둥글게 */
}

.nans {
  margin-top: 30px;
  border: 1px solid skyblue;
  background-color: skyblue;
  color: white;
  padding: 3px 3px 3px 3px;
  border-radius: 5px; /* 버튼의 모서리를 둥글게 */
}

.nans:hover {
  background-color: deepskyblue;
  border: 1px solid deepskyblue;
}

.ans:hover {
  background-color: rgb(225, 90, 90);
  border: 1px solid rgb(225, 90, 90);
}

.bt {
  margin-left: 30px;
  border: 1px solid rgb(160, 160, 160);
  background-color: rgb(255, 255, 255);
  color: rgb(111, 111, 111);
}

.line {
  margin-top: 20px;
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
</style>
