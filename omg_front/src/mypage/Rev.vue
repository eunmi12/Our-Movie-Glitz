<template>
  <div class="container">
    <MypageTop />
    <div class="mypagemain">
      <MypageSideBar />
      <div class="mypagebox">
        <div class="rev_box">
          <p class="text1">나의 예매내역</p>
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
                      </div>
                      <div class="ticket-to">
                        <span class="label">Price</span>
                        <span class="value">{{ rev.ticket_total_price }} 원</span>
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
                        <span class="timevalue">{{ rev.ticket_date }} {{ rev.ticket_time }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="qwer">
                    <button v-if="isPastReservation(rev.ticket_date, rev.ticket_time) && rev.ticket_re == '0'" class="reviewbtn" @click="gotocreatereview(rev.ticket_no)">관람평 남기기</button>
                    <button type="submit" v-else-if="rev.ticket_re == '1'" class="reviewbtn">관람평 작성 완료</button>
                    <button type="submit" v-else class="reviewbtn">예매 완료</button>
                    <button v-if="!isPastReservation(rev.ticket_date, rev.ticket_time)" class="cancle" @click="movie(rev.ticket_no)">예매 취소</button>
                  </div>
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
import Swal from 'sweetalert2';

export default {
  components: {
    MypageTop,
    MypageSideBar,
  },
  data() {
    return {
      reservations: [],
      selectedRevIndex: null,
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
      this.$router.push(`/createreview/${ticket_no}`);
    },
    revtoggle(index) {
      this.selectedRevIndex = this.selectedRevIndex === index ? null : index;
    },
    async userrev() {
      const user_no = this.$route.params.user_no;
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
      const formattedTime = ticketTime.replace('시', ':00');
      const ticketDateTime = new Date(`${ticketDate}T${formattedTime}`);
      return new Date() > ticketDateTime;
    },
    async movie(ticket_no) {
      Swal.fire({
        title: '정말로 예매 취소 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '예매취소',
        cancelButtonText: '취소하기'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const user_no = this.$route.params.user_no;
          try {
            const response = await axios.post('http://localhost:3000/user/canclemovie', { user_no, ticket_no });
            Swal.fire('취소되었습니다!', '예매가 취소되었습니다.', 'success');
            this.userrev();
          } catch (error) {
            console.error("예매 취소 도중 에러 발생", error);
            Swal.fire('에러 발생', '예매 취소 도중 에러가 발생했습니다.', 'error');
          }
        } else {
          console.log("예매 취소가 취소되었습니다.");
        }
      });
    }
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
  width: 900px;
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
  gap: 20px;
  width: 100%;
}

.ticket-image {
  width: 160px;
  height: 170px;
}

.ticket-content {
  width: 100%; 
  display: flex;
  flex-direction: column; /* 항목을 세로로 정렬 */
  justify-content: space-between; 
  gap: 10px; /* 항목 간의 간격 */
}

.ticket-header,
.ticket-info {
  display: flex;
  flex-direction: column; /* 항목을 세로로 정렬 */
  gap: 5px;
}

.ticket-from,
.ticket-to,
.ticket-seat,
.ticket-gate,
.ticket-time {
  display: flex;
  justify-content: space-between;
}

.label {
  font-weight: bold;
}

.value {
  font-size: 18px;
}

.timevalue {
  font-size: 16px;
}

.qwer {
  margin-top: 20px;
}

.reviewbtn,
.cancle {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reviewbtn {
  background-color: #f0eeda;
  color: black;
  margin-right: 10px;
}

.cancle {
  background-color: #d33;
  color: white;
  margin-top: 10px;
}

.paging {
  display: flex;
  list-style: none;
  padding: 0;
  margin-left: 400px;
  margin-top: 20px;
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
