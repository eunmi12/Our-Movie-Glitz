<template>

  <div class="select">
      <div class="seat-selection">
      <h1>좌석 선택</h1>
      <div class="people-selection">
          <label>인원 / 좌석</label>
          <div class="people-buttons">
          <span
              v-for="num in 8"
              :key="num"
              :class="['people-button', { 'selected': numSeats === num }]"
              @click="selectNumSeats(num)"
          >
              {{ num }}
          </span>
          </div>
      </div>
      <div class="seat-status seat_ab" style="font-size: 12px; justify-content: center;">
          <div class="status-box available"></div>
          <span>좌석선택 가능</span>
      </div>
      <div class="seat-status seat_un" style="font-size: 12px; justify-content: center;">
          <div class="status-box unavailable"></div>
          <span>좌석선택 불가능</span>
      </div>
      <div class="screen">SCREEN</div>
      <div class="seats">
          <div v-for="(row, rowIndex) in seatRows" :key="rowIndex" class="seat-row">
          <span class="seat-label">{{ row.label }}</span>
              <span v-for="(seat, i) in row.seats" :key="i" @click="selectSeat(seat)"
                  :class="['seat', { 'selected': seat.selected, 'reserved': seat.seat_reserve == 0 }]">
                  {{ seat.seat_name }}
                  </span>
              </div>
          </div>
      </div>
      <div class="confirm-seats">
          <!-- <button @click="confirmBooking" :disabled="isBooking">예약 완료</button> -->
          <button class="next" @click="confirmBooking">다음단계</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movie_no: this.$route.params.movie_no,
      cinema_no: this.$route.params.cinema_no,
      date: this.$route.params.date,
      time: this.$route.params.time,
      user_no: this.$store.state.user.user_no,
      seats: [],
      seatRows: [],
      selectedSeats: [],
      numSeats: 1,
      ticket_no: {},
      seatName: [],
      isBooking: false // 예약 진행 상태를 나타내는 변수
    };
  },
  created() {
      this.fetchSeats();
  },

  computed:{
      user() {
          return this.$store.state.user;       
      }, 
      movie_r(){
        return this.$steor.state.movie_r;
      },
             
  }, // store에 저장된 값을 불러옴

  methods: {
      // selectSeat() {
      //     axios ({
      //         url: `http://localhost:3000/movie/selectseats`,
      //         method: "POST"
      //     }).then(results => {
      //         console.error({ error: '좌석 목록 조회 에러' });
      //         return this.seat = results.data;
      //     })
      // },
      formatDate(date) {
          const d = new Date(date);
          return d.toISOString().split('T')[0];
      },
      async fetchSeats() {
        console.log("aaaaaaaa", this.$store.state.movie_r);
        try {
          const res = await axios('http://localhost:3000/movie/seats', {
              method: 'POST', // Use POST method
              headers: {
                  'Content-Type': 'application/json' // Set content type to JSON
              },
              data : ({
                  movie_no: this.$store.state.movie_r.movie_no,
                  cinema_no: this.$store.state.movie_r.cinema_no,
                  date: this.$store.state.movie_r.date,
                  time: this.$store.state.movie_r.time
              })
          });

            console.log("response:", res);
            
            if (res.status !== 200) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            this.seats = res.data;
            console.log("this.seats: ------->",this.seats);
            console.log("res.data: ------->",res.data);
            this.processSeats();
        } catch (error) {
            console.error('좌석 선택 에러', error);
        }
    },
      processSeats() { // 좌석 배치 : 배열을 받아서 다시 배열로 뿌려주는 메소드
        console.log('Processing seats:', this.seats);
        const rows = {};

        this.seats.forEach(seat => {
            const rowLabel = seat.seat_name.charAt(0); // charAt(0) : 첫글자를 가져오기 위해
            if (!rows[rowLabel]) {
                rows[rowLabel] = { label: rowLabel, seats: [] };
            }
            rows[rowLabel].seats.push(seat);
        });

        this.seatRows = Object.values(rows);
      },
      selectSeat(seat) {
          if (seat.seat_reserve) {
              // 선택된 좌석의 수가 numSeats 미만일 때만 선택 상태를 변경
              if (seat.selected) {
                  // 이미 선택된 좌석 클릭 시 선택 해제
                  seat.selected = false;
                  this.selectedSeats = this.selectedSeats.filter(s => s.seat_no !== seat.seat_no);
              } else if (this.selectedSeats.length < this.numSeats) {
                  // 좌석 선택 (선택된 좌석 수가 numSeats 미만일 때)
                  seat.selected = true;
                  this.selectedSeats.push(seat);
              }
          }
          // const seatNumbers = this.selectedSeats.map(seat => seat.seat_name);
          // const seatNo = this.selectedSeats.map(seat => seat.seat_no);
          // const bookingDetails = {
          //     seatNumbers: seatNumbers,
          //     seatNo: seatNo
          // };
          // axios.post (`http://localhost:3000/movie/reserve`, bookingDetails)
          // .then(results => {
          //     alert('좌석 예약이 완료되었습니다.');
          //     this.selectedSeats = [];
          // })
      },
      selectNumSeats(num) {
          this.numSeats = num;
          // 선택된 좌석 초기화
          this.selectedSeats.forEach(seat => seat.selected = false);
          this.selectedSeats = [];
      },

      // selectTicketNo() {
      //       axios.post(`http://localhost:3000/movie/ticketNo`, selectTicketNo)
      //       .then(results => {
      //       console.log('티켓 넘버 꺼내옴');
      //       // window.location.href =`http://localhost:8081/payment`
      //     })
      //     .catch(error => {
      //       console.error('티켓 넘버 정보확인 오류', error);
      //     });
      //     },

      confirmBooking() {
          if (this.selectedSeats.length !== this.numSeats) {
          this.$swal(`선택된 좌석의 수가 인원수와 맞지 않습니다.`);
          return;
          }

          // 좌석 상태를 임시로 선택된 상태로 변경
          this.selectedSeats.forEach(seat => seat.selected = true);

          const seatName = this.selectedSeats.map(seat => seat.seat_name);
          const seatNumbers = this.selectedSeats.map(seat => seat.seat_no);
          // console.log("seatNumbers: ------------->",seatName);
          // console.log("seatNumbers: ------------->",seatNumbers);
          const bookingDetails = {
              user_no: this.$store.state.user.user_no,
              movie_no: this.$store.state.movie_r.movie_no,
              cinema_no: this.$store.state.movie_r.cinema_no,
              date: this.$store.state.movie_r.date, 
              time: this.$store.state.movie_r.time,
              seat_no: this.$route.params.seat_no,
              seatName,
              seatNumbers,
              total_price: this.selectedSeats.length * 15000
          };
          // console.log("bookingDetails:--------->",bookingDetails.seat_no);

          const selectTicketNo = {
              user_no: this.$store.state.user.user_no,
              movie_no: this.$store.state.movie_r.movie_no,
              cinema_no: this.$store.state.movie_r.cinema_no,
              date: this.$store.state.movie_r.date + ' ' + this.$store.state.movie_r.time, 
              seat_no: this.$route.params.seat_no,
              seatName,
          }
          this.seatName = bookingDetails.seatName;

          // 예약 진행 상태를 true로 설정
          this.isBooking = true;

          this.$store.commit('setMovie_r', bookingDetails);
          axios.post (`http://localhost:3000/movie/book`, bookingDetails, seatName ,seatNumbers)
          .then(results => {
              // this.$swal('좌석 예약이 완료되었습니다.');
              this.selectedSeats = [];
              this.fetchSeats();
              this.goToNext();
              // const ticket_no = results.data.ticket_no; // 티켓 넘버 호출
              // window.location.href = `http://localhost:8081/movie/payment/${ticket_no}`;
              // this.$router.push({
              //   name: 'Payment',
              //   data: {
              //     ticket_no,
              //   }
              // });
          })
          .catch(error => {
              console.error('좌석 예약 에러', error);
              // 좌석 예약 에러야? => 그럼 예약 진행 상태 false로
              this.isBooking = false;
          } 
        );

          axios.post(`http://localhost:3000/movie/reserve`, bookingDetails)
          .then(results => {
              console.log('좌석 저장 완료');
              // this.selectTicketNo();
          })
          .catch(error => {
              console.error('좌석 저장 에러', error);
          });
        },

    
        goToNext() {
          const seatName = this.selectedSeats.map(seat => seat.seat_name);
          const selectTicketNo = {
              user_no: this.$store.state.user.user_no,
              movie_no: this.$store.state.movie_r.movie_no,
              cinema_no: this.$store.state.movie_r.cinema_no,
              date: this.$store.state.movie_r.date,
              time: this.$store.state.movie_r.time, 
              // seat_no: this.$route.params.seat_no,
              seatName : this.seatName
          }

          this.$store.commit('setMovie_r', selectTicketNo);
          axios.post(`http://localhost:3000/movie/ticketNo`, selectTicketNo)
          .then(results => {
            console.log(('티켓 넘버 호출', results));
            this.selectedSeats = [];
            const ticket_no = results.data[0].ticket_no // 여기서 데이터를 꺼내옴
            console.log('tickt_no:', ticket_no);
            window.location.href =`http://localhost:8081/payment/${ticket_no}`
            // this.$router.push({
            //     name: 'Payment',
            //     data: {
            //       ticket_no,
            //     }
            // })
          }) .catch (error => {
              console.error('예약 중 오류 발생', error);
            this.$swal('예약 중 오류가 발생했습니다.');
          })
        },
          
        
      },
      // confirmBooking() {
      //     // 예약 완료 로직
      //     const bookingDetails = {
      //         date: this.formatDate(this.date),
      //         time: this.time,
      //         seats: this.selectedSeats,
      //         movie_no: this.selectedMovie.movie_no,
      //         cinema_no: this.selectedCinema.cinema_no,
      //         // date: this.selectedDate.toString().split('T')[0],
      //         user_no: this.$store.state.user.user_no,
      //         // time: this.selectedTime,
      //         // seate: this.selectedSeats.map(seat => seat.seat_no),
      //         total_price: this.selectedMovie.movie_price * this.selectedSeats.length,
      //     };
      //     axios ({
      //         url: `http://localhost:3000/movie/book`,
      //         method: "POST",
      //         data: {
      //             bookingDetails
      //         }
      //     }).then (results => {
      //         alert('예약이 완료되었습니다.');
      //     })
      //     .catch (error => {
      //         console.error('예약 중 오류 발생', error);
      //         alert('예약 중 오류가 발생했습니다.');
      //     })


          // axios.post (`http://localhost:3000/movie/book`, bookingDetails)
          // .then (results => {
          //     alert('예약이 완료되었습니다.');
          // })
          // .catch (error => {
          //     console.error('예약 중 오류가 발생', error);
          //     alert('예약 중 오류가 발생함');
          // });
  
};
</script>

<style scoped>
.select {
  width: 100%;
}
.seat-selection {
  text-align: center;
  padding: 20px;
}

.seat-selection h1 {
  padding-bottom: 50px;
}

.people-selection {
  margin-bottom: 12px;
}

.people-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.people-button {
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 30px;
  margin: 2px;
  text-align: center;
  background-color: #ccc;
  cursor: pointer;
  font-size: small;
  margin-bottom: 30px;
}

.people-button.selected {
  background-color: rgb(232, 197, 132);
}

.screen {
  /* margin-bottom: 50px;
  margin-top: 50px; */
  font-weight: bold;
  border: 1px solid #5f5e5e;
  height: 30px;
  width: 500px;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 20px;
  margin: 0 auto;
}

.seat-status {
  display: flex; /* 가로 방향으로 정렬 */
  align-items: center; /* 수직 정렬 */
  margin-bottom: 10px; /* 항목 간 간격 */
  text-align: center;
  }
  /* 네모칸의 스타일 */
  .status-box {
      width: 20px; /* 네모칸의 너비 */
      height: 20px; /* 네모칸의 높이 */
      margin-right: 10px; /* 네모칸과 텍스트 사이의 간격 */
  }

  .available {
      background-color: #ccc; /* 선택 가능 상태 색상 */

  }

  .unavailable {
      background-color: rgb(179, 141, 141); /* 선택 불가능 상태 색상 */
  }

  .seat_un {
      margin-bottom: 70px;
  }

.seats {
  display: inline-block;
  text-align: left;
  margin: 0 auto;
  padding-top: 120px;
}

.seat-row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.seat-label {
  margin-right: 10px;
  font-weight: bold;
}

.seat {
  display: flex;
  width: 37px;
  height: 37px;
  line-height: 30px;
  margin: 2px;
  align-items: center;
  background-color: #ccc;
  cursor: pointer;
  /* vertical-align: middle; */
  justify-content: center;
}

.seat.selected {
  background-color: rgb(221, 151, 85);
}

.seat.reserved {
  background-color: rgb(179, 141, 141);
  cursor: not-allowed;
}

.confirm-seats {
  margin-top: 20px;
  text-align: center;
}

.confirm-seats button {
  padding: 10px 20px;
  background-color: #e9ec8d;
  border: none;
  cursor: pointer;
  margin-top: 70px;
}

.next {
  margin-left: 50px;
}

.confirm-seats button:hover {
  background-color: #d1da77;
}
</style>