<template>
  <div class="container">
    <MypageTop />
    <div class="mypagemain">
      <MypageSideBar />
      <div class="mypagebox">
        <div class="qna_box">
          <p class="text1">
            나의 문의내역
          </p>
          <div class="user_qna_detail" v-for="(qna, i) in helpdetail" :key="i">
            <div class="qna_detail_title">
              <span class="nans" v-if="!qna.qna_answer">답변 대기</span>
              <span class="ans" v-else>답변 완료</span>
              <span class="qna_title">{{ qna.qna_title }}</span>
              <span class="qna_date">등록일 {{ qna.qna_date }}</span>
            </div>
            <div class="qna_info">
              <span class="qna_type">{{ getQnaType(qna.qna_type) }}</span>
              <span class="qna_phone">{{ qna.user_phone }}</span>
              <span class="qna_id">{{ qna.user_id }}</span>
            </div>
            <div class="commentbox">{{ qna.qna_comment }}</div>
            <div class="ans_title" v-if="qna.qna_answer">답변 등록일 {{ qna.qna_answer_date }}</div>
            <div class="ans_title" v-else></div>
            <div class="ans_box" v-if="qna.qna_answer">{{ qna.qna_answer }}</div>
            <div class="ans_box" v-else>답변이 없습니다</div>
            <button class="delqna" @click.stop="delqna(qna.qna_no)">삭제하기</button>
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
import Swal from 'sweetalert2';

export default {
  components: {
    MypageTop,
    MypageSideBar,
  },
  data() {
    return {
      helpdetail: [],
    };
  },
  methods: {
    async userqnadetail() {
      const user_no = this.$route.params.user_no;
      const qna_no = this.$route.query.qna_no;
      try {
        const response = await axios.post(
        `http://localhost:3000/user/gogaekdetail/${user_no}`, // URL
        null, // 본문 데이터 (여기서는 필요 없어서 null)
        {
          params: { qna_no: qna_no } // 쿼리 매개변수
        }
      );
        this.helpdetail = response.data;
        console.log("this.userqnadetail",this.helpdetail);
      } catch (error) {
        console.error("문의내역 에러 발생", error);
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
    async delqna(qna_no) {
      Swal.fire({
        title: '정말로 문의를 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제하기',
        cancelButtonText: '취소하기'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post('http://localhost:3000/user/delqna', { qna_no });
            Swal.fire('삭제되었습니다!', '문의가 삭제되었습니다.', 'success');
            this.$router.go(-1); // 삭제 후 이전 페이지로 이동
          } catch (error) {
            console.error("QnA 삭제 도중 에러 발생", error);
            Swal.fire('에러 발생', '문의 삭제 도중 에러가 발생했습니다.', 'error');
          }
        } else {
          console.log("문의 삭제가 취소되었습니다.");
        }
      });
    },
  },
  created() {
    this.userqnadetail();
  }
}
</script>

<style scoped>
/* 스타일 정의 */
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
}
.user_qna {
margin-bottom: 20px;
border-bottom: 1px solid #ddd;
padding-bottom: 10px;
}
.qna_detail_title {
display: flex;
justify-content: space-between;
font-weight: bold;
border-bottom: 3px solid #f0eeda;
padding-bottom: 10px;
}
.qna_title {
font-weight: bold;
}
.qna_date {
color: #888;
}
.ans {
border: 1px solid rgb(245, 110, 110);
background-color: rgb(245, 110, 110);
color: white;
padding: 3px 3px 3px 3px;
border-radius: 5px; /* 버튼의 모서리를 둥글게 */
}
.nans {
border: 1px solid skyblue;
background-color: skyblue;
color: white;
padding: 3px 3px 3px 3px;
border-radius: 5px; /* 버튼의 모서리를 둥글게 */
}
/* 호버 상태 */
.nans:hover {
background-color: deepskyblue;
border: 1px solid deepskyblue;
}
/* 호버 상태 */
.ans:hover {
background-color: rgb(225, 90, 90);
border: 1px solid rgb(225, 90, 90);
}
.ans_title {
text-align: right;
}
.commentbox {
text-align: center;
margin: 50px auto;
}
.qna_info {
display: flex;
justify-content: space-between;
border-bottom: 3px solid #f0eeda;
text-align: center;
padding-top: 15px;
padding-bottom: 15px;
}

.qna_type {
text-align: left;
}

.qna_phone {
text-align: center;
}

.qna_id {
text-align: right;
}

.ans_box {
border: 3px solid #f0eeda;
text-align: center;
padding-top: 50px;
padding-bottom: 50px;
}
.delqna {
margin-left: 830px; /* 버튼을 오른쪽으로 정렬 */
border: 1px solid pink;
background-color: pink;
color: rgb(123, 122, 122);
width: 80px;
height: 30px;
border-radius: 5px; /* 버튼의 모서리를 둥글게 */
cursor: pointer;
margin-top: 10px;
}
</style>
