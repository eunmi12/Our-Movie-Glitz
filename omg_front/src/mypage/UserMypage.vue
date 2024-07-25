<template>
    <div class="container">
      <div class="title">회원정보 수정</div>
      <div class="update_box">
        <div class="namebox">
          <span class="namebox1">이름</span>
          <span class="namebox2">김회창</span>
        </div>
        <div class="namebox">
          <span class="namebox1">아이디</span>
          <span class="namebox2">example_id</span>
        </div>
        <div class="namebox">
          <span class="namebox1">비밀번호</span>
          <input type="password" class="inputbox" placeholder="비밀번호">
        </div>
        <div class="namebox">
          <span class="namebox1">생년월일</span>
          <span class="namebox2">1990-01-01</span>
        </div>
        <div class="namebox">
          <span class="namebox1">성별</span>
          <span class="namebox2">남성</span>
        </div>
        <div class="namebox">
          <span class="namebox1">핸드폰번호</span>
          <input type="text" class="inputbox" placeholder="핸드폰번호">
        </div>
      </div>
      <div class="button">
        <button class="ok">수정 완료</button>
        <button class="no" @click="gotomainpage">수정 취소</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
    methods: {
      gotomainpage() {
        this.$router.push('/mypagemain');
      }
    }
  };
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
  
  .title {
    width: 100%;
    height: 15%;
    padding-bottom: 10px;
    display: flex;
    align-items: end;
    border-bottom: 3px solid #f0eeda;
    justify-content: center;
    color: #1d1d1d;
    font-size: 25px;
    font-weight: bold;
  }
  
  .update_box {
    width: 80%;
    margin: 30px auto;
    padding: 20px;
    border: 1px solid #f0eeda;
    font-size: 18px;
    border-radius: 15px;
    background-color: #fafafa;
  }
  
  .namebox {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .namebox1 {
    flex: 1;
    text-align: center;
    background-color: #f0eeda;
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
    font-weight: bold;
  }
  
  .namebox2 {
    flex: 2;
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #f0eeda;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .inputbox {
    flex: 2;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #f0eeda;
    background-color: #fff;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .button {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  
  .ok, .no {
    padding: 15px 30px;
    border-radius: 10px;
    border: none;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .ok {
    background-color: #4CAF50;
    color: white;
  }
  
  .ok:hover {
    background-color: #45a049;
  }
  
  .no {
    background-color: rgb(218, 106, 106);
    color: white;
    margin-left: 20px;
  }
  
  .no:hover {
    background-color: rgb(200, 90, 90);
  }
  </style>
  