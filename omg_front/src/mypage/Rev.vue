<template>
    <div class="container">
      <MypageTop />
      <div class="mypagemain">
        <MypageSideBar />
        <div class="mypagebox">
          <div class="rev_box">
            <p class="text1">MY 예매 내역</p>
          </div>
        </div>
      </div>
    </div>    
  </template>
  
  <script>
  import MypageSideBar from '../layouts/MypageSideBar.vue';
  import MypageTop from '../layouts/MypageTop.vue';
  
  export default {
    components: {
      MypageTop,
      MypageSideBar,
    },
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
  </style>
  