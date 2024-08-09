<template>
  <div class="container">
    <MypageTop />
    <div class="mypagemain">
      <MypageSideBar />
      <div class="mypagebox">
        <div class="rev_box">
          <p class="text1">MY 예매내역</p>
          <div v-if="reservations.length > 0">
            <div v-for="(rev, index) in paginatedReservations" :key="rev.ticket_no" class="user_rev" @click="revtoggle(index)">
              <div class="rev_info">
                <span class="rev_title">{{ rev.movie_title }}</span>
                <div>
                  <span class="rev_date">{{ rev.ticket_date }}&nbsp;&nbsp;&nbsp;</span>
                  <span class="rev_date">{{ rev.ticket_time }}</span>
                </div>
              </div>
              <div class="rev_details">
                <span class="rev_cnt">{{ rev.ticket_cnt }}명</span>
                <span class="rev_price">{{ rev.ticket_total_price }}원</span>
              </div>
              <div v-if="selectedRevIndex === index" class="toggle ticket">
                <div class="ticket-container">
                  <img :src="getImagePath(rev.movie_img0)" class="ticket-image" />
                  <div class="ticket-content">
                    <div class="ticket-header">
                      <div class="ticket-from">
                        <span class="label">Title</span>
                        <span class="value">{{ rev.movie_title }}</span>
                        <span class="sub-label">enjoy</span>
                      </div>
                      <div class="ticket-to">
                        <span class="label">Price</span>
                        <span class="value">{{ rev.ticket_total_price }}</span>
                        <span class="sub-label">원</span>
                      </div>
                    </div>
                    <div class="ticket-info">
                      <div class="ticket-seat">
                        <span class="label">Seat</span>
                        <span class="value">{{ rev.ticket_seat }}</span>
                      </div>
                      <div class="ticket-gate">
                        <span class="label">Gate</span>
                        <span class="value">3</span>
                      </div>
                      <div class="ticket-time">
                        <span class="label">Start Time</span>
                        <span class="value">{{ rev.ticket_date }} {{ rev.ticket_time }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="qwer">
                    <button v-if="isPastReservation(rev.ticket_date, rev.ticket_time) && rev.ticket_re == '0'" class="reviewbtn" @click="gotocreatereview(rev.ticket_no)">관람평 남기기</button>
                    <button type="submit" v-else-if="rev.ticket_re == '1'" class="reviewbtn">관람평 작성 완료</button>
                    <button type="submit" v-else class="reviewbtn">예매 완료</button>
                  </div>
                  <!-- 리뷰 남기기 버튼 조건부 렌더링 -->
                </div>
              </div>
            </div>
          </div>
          <p v-else>예매내역이 없습니다</p>
        </div>
      </div>
    </div>
    <ul class="paging">
      <li v-for="page in totalPages" :key="page">
        <a href="#" @click.prevent="gotoPage(page)" :class="{ active: page === currentPage }">{{ page }}</a>
      </li>
    </ul>
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
      reservations: [],
      selectedRevIndex: null, // 선택된 예약의 인덱스를 저장할 변수
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.reservations.length / this.perPage);
    },
    paginatedReservations() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.reservations.slice(start, end);
    },
  },
  methods: {
    gotocreatereview(ticket_no) {
      this.$router.push(`/createreview/${ticket_no}`)
    },
    revtoggle(index) {
      // 같은 인덱스를 클릭하면 토글, 다른 인덱스를 클릭하면 선택 변경
      this.selectedRevIndex = this.selectedRevIndex === index ? null : index;
    },
    async userrev() {
      const user_no = this.$route.params.user_no;
      const reviewcomt = this.review_comment;
      console.log(reviewcomt);
      
      try {
        const response = await axios.post(`http://localhost:3000/user/rev/${user_no}`);
        this.reservations = response.data;
      } catch (error) {
        console.error("나의예약 에러 발생", error);
      }
    },
    getImagePath(image) {
      return `https://image.tmdb.org/t/p/w500/${image}`;
    },
    gotoPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    isPastReservation(ticketDate, ticketTime) {
      // 시간에서 "시"를 제거하고 24시간 형식으로 변환
      const formattedTime = ticketTime.replace('시', ':00');
      const ticketDateTime = new Date(`${ticketDate}T${formattedTime}`);
      return new Date() > ticketDateTime;
    },
  },
  mounted() {
    this.userrev();
  },
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

.rev_box {
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

.user_rev {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  cursor: pointer;
}

.rev_info {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.rev_details {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

.rev_title {
  font-weight: bold;
}

.rev_date {
  color: #888;
}

.toggle {
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
}

.ticket {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
}

.ticket-container {
  display: flex;
  gap: 20px; /* 이미지와 컨텐츠 사이의 간격을 넓혔습니다 */
  width: 100%;
}

.ticket-image {
  width: 160px;
  height: 170px;
}

.ticket-content {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 컨텐츠 내부 요소 간의 간격을 넓혔습니다 */
}

.ticket-header {
  display: flex;
  justify-content: space-between;
}

.qwer {
  float: right;
  display: flex;
  justify-content: flex-end;
}

.ticket-from,
.ticket-to {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ticket-info {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* 티켓 정보 요소 간의 간격을 넓혔습니다 */
}

.ticket-time,
.ticket-seat,
.ticket-gate,
.ticket-class {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  font-weight: bold;
  color: #333;
}

.value {
  font-size: 1.2em;
  color: #555;
}

.sub-label {
  color: #999;
}

.ticket-qr {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.reviewbtn {
  text-align: center;
  width: 140px;
  display: flex;
  justify-content: center;
  height: 40px;
  margin-top: 60px;
  border: 1px solid rgb(225, 225, 225);
  background-color: #f0eeda;
  padding: 10px 5px 10px 5px;
  border-radius: 7px;
  margin-left: 100px;
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
