<template>
    <div>
        <div class="main1">
            <div class="title">
                <h3>{{ event.event_title }}</h3>
                <span>{{ event.event_startdate }}~{{ event.event_enddate }}</span>
            </div>
            <div class="main2">
                <img src="../../../omg_back/uploads/event/11-1.webp" alt="이벤트 이미지">
            </div>
            <div class="notice-btn">
            <button class="top" @click="gototop">▲Top</button>
        </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      event: {},
    };
  },
  mounted() {
  window.scrollTo(0, 0);
},
  created() {
    window.scrollTo(0, 0);
    this.getevent();
  },

  methods: {
    getevent() {
      const event_no = this.$route.params.event_no;
      console.log('event_no', event_no);
      axios.get(`http://localhost:3000/admin/event/${event_no}`)
        .then(res => {
          console.log('Events fetched:', res.data);
          this.event = res.data[0]; // 응답 데이터가 배열일 경우
          console.log('디스이벤트입니다', this.event);
        })
        .catch(error => {
          console.error('Error fetching event:', error);
        });
    },
    gototop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },
};

</script>

<style scoped>
.title{
    height: 50px;
    display: flex;
    background-color: #f8f8f8;
    border-top: 1px solid #9c9c9c;
    border-bottom: 1px solid #9c9c9c;
    border-radius: 5px;
    margin: 0px 25px 10px 25px;
    padding: 10px 20px 10px 20px;
    justify-content: space-between;
    align-items: center;
}
.title h3{
    float: left;
    
}
.title span{
    float: right;
    
}
.main2 img{
    width: 100%;
    margin-top: 100px;
    padding: 0px 300px 40px 300px;
    display: flex;
    justify-content: center;
    object-fit: cover; /* 이미지가이 컨테이너를 채우도록 설정 */
}
.top {
    margin-top: 10px; /* 필요에 따라 조정 */
    width: 70px;
    height: 30px;
    border-radius: 5px;
    background-color: ivory;
}
.notice-btn {
    display: flex;
    justify-content: flex-end;
    padding-top: 40px;
    padding-right: 20px;
    position: relative;
    z-index: 10; /* 높을수록 위에 표시됨 */
}
</style>