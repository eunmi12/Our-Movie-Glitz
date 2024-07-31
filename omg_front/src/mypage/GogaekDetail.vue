<template>
    <div class="container">
      <MypageTop />
      <div class="mypagemain">
        <MypageSideBar />
        <div class="mypagebox">
          <div class="qna_box">
          <p class="text1">MY 문의내역</p>
              <div v-for="qna in helpdetail" :key="qna" class="user_qna_detail">
                <div class="qna_info">
                  <span class="nans" v-if="!qna.qna_answer">답변 대기</span>
                  <span class="ans" v-else>답변 완료</span>
                  <span class="qna_title">{{ qna.qna_title }}</span>
                  <span class="qna_date">등록일 {{ qna.qna_date }}</span>
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
        helpcenter: [],
      };
    },
    methods: {
      async userqna() {
        const user_no = this.$route.params.user_no;
        try {
          const response = await axios.post(`http://localhost:3000/user/gogaek/${user_no}`);
          this.helpcenter = response.data;
        } catch (error) {
          console.error("문희내역 에러 발생", error);
        }
      },
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
  .user_qna {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
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
  </style>
  