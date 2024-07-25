<template>
    <div class="container1">
      <div class="user">
        <img class="img1" src="../images/search.png" alt="User Image">
        <span class="username">홍길동님은</span>
        <span class="usertype"> 일반 고객 입니다.</span>
      </div>
      <div class="container2">
        <div class="coupon">
          <div class="text3">MY COUPON</div>
          <div class="text4">할인쿠폰 개</div>
        </div>
        <div class="point">
          <div class="text5">VIP 점수</div>
          <div class="text6">VIP 누적 점수</div>
        </div>
        <div class="wish" @click="gotopagewish">
          <div class="text7">관심 영화</div>
          <img class="text8" src="../images/heart.png" alt="Heart Image">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
    methods: {
      gotopagewish() {
        this.$router.push('./user/wish');
      }
    },
  };
  </script>
  
  <style scoped>
  .container1 {
    width: 50%;
    height: auto;
    margin: 70px auto;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
  
  .user {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .img1 {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .username {
    font-size: 18px;
    font-weight: bold;
  }
  
  .usertype {
    font-size: 18px;
    color: #777;
  }
  
  .container2 {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
  
  .coupon, .point, .wish {
    flex: 1;
    padding: 20px;
    margin: 0 10px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f0eeda;
  }
  
  .coupon {
    border-right: 1px solid #ddd;
  }
  
  .point {
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
  }
  
  .wish {
    cursor: pointer;
  }
  
  .text3, .text5, .text7 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .text4, .text6 {
    font-size: 16px;
    color: #555;
  }
  
  .text8 {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
  </style>
  