<template>
    <div class="seat-selection">
      <h1>좌석 선택</h1>
      <div class="people-selection">
        <label>인원수:</label>
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
      <div class="screen">SCREEN</div>
      <div class="seats">
        <div v-for="(row, rowIndex) in seatRows" :key="rowIndex" class="seat-row">
          <span class="seat-label">{{ row.label }}</span>
          <span
            v-for="seat in row.seat"
            :key="seat.seat_no"
            :class="['seat', { 'selected': seat.selected, 'reserved': !seat.seat_reserve }]"
            @click="selectSeat(seat)"
          >
            {{ seat.seat_name }}
          </span>
        </div>
      </div>
      <div class="confirm-seats">
        <button @click="confirmBooking">예약 완료</button>
      </div>
    </div>
  </template>
  
  <script>
import axiot from 'axios';

  export default {
    data() {
      return {
        movie_no: this.$route.params.movie_no,
        cinema_no: this.$route.params.cinema_no,
        date: this.$route.params.date,
        time: this.$route.params.time,
        seat: [],
        seatRows: [],
        selectedSeats: [],
        numSeats: 1,
      };
    },
    created() {
        this.fetchSeats();
    },
    mounted() {
      this.processSeats();
    },
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
        fetchSeats() {
            axios.post('http://localhost:3000/movie/seats', {
                movie_no: this.movie_no,
                cinema_no: this.cinema_no,
                date: this.formatDate(this.date),
                time: this.time
            }).then(results => {
                this.seats = results.data;
            }).catch(error => {
                console.error('좌석 정보를 불러오는 중 오류가 발생했습니다.', error);
            });
        },
        formatDate(date) {
            const d = new Date(date);
            return d.toISOString().split('T')[0];
        },
        selectSeat(seat) {
            if (seat.seat_reserve && this.selectedSeats.length < this.numSeats) {
            seat.selected = !seat.selected;
            if (seat.selected) {
                this.selectedSeats.push(seat);
            } else {
                this.selectedSeats = this.selectedSeats.filter(s => s.seat_no !== seat.seat_no);
            }
            }
        },
        selectNumSeats(num) {
            this.numSeats = num;
            // 선택된 좌석 초기화
            this.selectedSeats.forEach(seat => seat.selected = false);
            this.selectedSeats = [];
        },
        confirmSeats() {
            if (this.selectedSeats.length !== this.numSeats) {
            alert(`선택된 좌석의 수가 인원수와 맞지 않습니다.`);
            return;
            }
            const seatNumbers = this.selectedSeats.map(seat => seat.seat_no);
            fetch(`/reserve`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ seatNumbers }),
                })
                .then(response => response.json())
                .then(data => {
                alert('좌석 예약이 완료되었습니다.');
                this.selectedSeats = [];
                this.fetchSeats();
                })
                .catch(error => {
                    console.error('좌석 예약 에러', error);
                });
        },
        confirmBooking() {
            // 예약 완료 로직
            const bookingDetails = {
                movie_no: this.movie_no,
                cinema_no: this.cinema_no,
                date: this.formatDate(this.date),
                time: this.time,
                seats: this.selectedSeats
            };

            axios.post (`http://localhost:3000/movie/book`, bookingDetails)
            .then (results => {
                alert('예약이 완료되었습니다.');
            })
            .catch (error => {
                console.error('예약 중 오류가 발생', error);
                alert('예약 중 오류가 발생함');
            });
        }
    },
};
  </script>
  
  <style scoped>
  .seat-selection {
    text-align: center;
    padding: 20px;
  }
  
  .people-selection {
    margin-bottom: 20px;
  }
  
  .people-buttons {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  .people-button {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin: 2px;
    text-align: center;
    background-color: #ccc;
    cursor: pointer;
  }
  
  .people-button.selected {
    background-color: #6c3;
  }
  
  .screen {
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .seats {
    display: inline-block;
    text-align: left;
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
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin: 2px;
    text-align: center;
    background-color: #ccc;
    cursor: pointer;
  }
  
  .seat.selected {
    background-color: #6c3;
  }
  
  .seat.reserved {
    background-color: #f66;
    cursor: not-allowed;
  }
  
  .confirm-seats {
    margin-top: 20px;
  }
  
  .confirm-seats button {
    padding: 10px 20px;
    background-color: #e9ec8d;
    border: none;
    cursor: pointer;
  }
  
  .confirm-seats button:hover {
    background-color: #d1da77;
  }
  </style>
  