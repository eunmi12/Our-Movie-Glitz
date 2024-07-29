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
            v-for="seat in row.seats"
            :key="seat.seat_no"
            :class="['seat', { 'selected': seat.selected, 'reserved': !seat.seat_reserve }]"
            @click="selectSeat(seat)"
          >
            {{ seat.seat_name }}
          </span>
        </div>
      </div>
      <div class="confirm-seats">
        <button @click="confirmSeats">좌석 선택 완료</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        seats: [
          { seat_no: 1, seat_cinema_no: 1, seat_name: 'A1', seat_reserve: 1 },
          { seat_no: 2, seat_cinema_no: 1, seat_name: 'A2', seat_reserve: 1 },
          { seat_no: 3, seat_cinema_no: 1, seat_name: 'A3', seat_reserve: 1 },
          { seat_no: 4, seat_cinema_no: 1, seat_name: 'A4', seat_reserve: 1 },
          { seat_no: 5, seat_cinema_no: 1, seat_name: 'A5', seat_reserve: 1 },
          { seat_no: 6, seat_cinema_no: 1, seat_name: 'A6', seat_reserve: 1 },
          { seat_no: 7, seat_cinema_no: 1, seat_name: 'A7', seat_reserve: 1 },
          { seat_no: 8, seat_cinema_no: 1, seat_name: 'A8', seat_reserve: 1 },
          { seat_no: 9, seat_cinema_no: 1, seat_name: 'A9', seat_reserve: 1 },
          { seat_no: 10, seat_cinema_no: 1, seat_name: 'A10', seat_reserve: 1 },
        //   { seat_no: 11, seat_cinema_no: 1, seat_name: 'A11', seat_reserve: 1 },
        //   { seat_no: 12, seat_cinema_no: 1, seat_name: 'A12', seat_reserve: 1 },
        //   { seat_no: 13, seat_cinema_no: 1, seat_name: 'A13', seat_reserve: 1 },
        //   { seat_no: 14, seat_cinema_no: 1, seat_name: 'A14', seat_reserve: 1 },
        //   { seat_no: 15, seat_cinema_no: 1, seat_name: 'A15', seat_reserve: 1 },
        //   { seat_no: 16, seat_cinema_no: 1, seat_name: 'A16', seat_reserve: 1 },
        //   { seat_no: 17, seat_cinema_no: 1, seat_name: 'A17', seat_reserve: 1 },
        //   { seat_no: 18, seat_cinema_no: 1, seat_name: 'A18', seat_reserve: 1 },
        //   { seat_no: 19, seat_cinema_no: 1, seat_name: 'A19', seat_reserve: 1 },
        //   { seat_no: 20, seat_cinema_no: 1, seat_name: 'A20', seat_reserve: 1 },
          { seat_no: 11, seat_cinema_no: 2, seat_name: 'A1', seat_reserve: 1 },
          { seat_no: 12, seat_cinema_no: 2, seat_name: 'A2', seat_reserve: 1 },
          { seat_no: 13, seat_cinema_no: 2, seat_name: 'A3', seat_reserve: 1 },
          { seat_no: 14, seat_cinema_no: 2, seat_name: 'A4', seat_reserve: 1 },
          { seat_no: 15, seat_cinema_no: 2, seat_name: 'A5', seat_reserve: 1 },
          { seat_no: 16, seat_cinema_no: 2, seat_name: 'A6', seat_reserve: 1 },
          { seat_no: 17, seat_cinema_no: 2, seat_name: 'A7', seat_reserve: 1 },
          { seat_no: 18, seat_cinema_no: 2, seat_name: 'A8', seat_reserve: 1 },
          { seat_no: 19, seat_cinema_no: 2, seat_name: 'A9', seat_reserve: 1 },
          { seat_no: 20, seat_cinema_no: 2, seat_name: 'A10', seat_reserve: 1 },
          { seat_no: 21, seat_cinema_no: 1, seat_name: 'B1', seat_reserve: 1 },
          { seat_no: 22, seat_cinema_no: 1, seat_name: 'B2', seat_reserve: 1 },
          { seat_no: 23, seat_cinema_no: 1, seat_name: 'B3', seat_reserve: 1 },
          { seat_no: 24, seat_cinema_no: 1, seat_name: 'B4', seat_reserve: 1 },
          { seat_no: 25, seat_cinema_no: 1, seat_name: 'B5', seat_reserve: 1 },
          { seat_no: 26, seat_cinema_no: 1, seat_name: 'B6', seat_reserve: 1 },
          { seat_no: 27, seat_cinema_no: 1, seat_name: 'B7', seat_reserve: 1 },
          { seat_no: 28, seat_cinema_no: 1, seat_name: 'B8', seat_reserve: 1 },
          { seat_no: 29, seat_cinema_no: 1, seat_name: 'B9', seat_reserve: 1 },
          { seat_no: 30, seat_cinema_no: 1, seat_name: 'B10', seat_reserve: 1 },
        //   { seat_no: 31, seat_cinema_no: 2, seat_name: 'B11', seat_reserve: 1 },
        //   { seat_no: 32, seat_cinema_no: 2, seat_name: 'B12', seat_reserve: 1 },
        //   { seat_no: 33, seat_cinema_no: 2, seat_name: 'B13', seat_reserve: 1 },
        //   { seat_no: 34, seat_cinema_no: 2, seat_name: 'B14', seat_reserve: 1 },
        //   { seat_no: 35, seat_cinema_no: 2, seat_name: 'B15', seat_reserve: 1 },
        //   { seat_no: 36, seat_cinema_no: 2, seat_name: 'B16', seat_reserve: 1 },
        //   { seat_no: 37, seat_cinema_no: 2, seat_name: 'B17', seat_reserve: 1 },
        //   { seat_no: 38, seat_cinema_no: 2, seat_name: 'B18', seat_reserve: 1 },
        //   { seat_no: 39, seat_cinema_no: 2, seat_name: 'B19', seat_reserve: 1 },
        //   { seat_no: 40, seat_cinema_no: 2, seat_name: 'B20', seat_reserve: 1 },
          { seat_no: 31, seat_cinema_no: 2, seat_name: 'B1', seat_reserve: 1 },
          { seat_no: 32, seat_cinema_no: 2, seat_name: 'B2', seat_reserve: 1 },
          { seat_no: 33, seat_cinema_no: 2, seat_name: 'B3', seat_reserve: 1 },
          { seat_no: 34, seat_cinema_no: 2, seat_name: 'B4', seat_reserve: 1 },
          { seat_no: 35, seat_cinema_no: 2, seat_name: 'B5', seat_reserve: 1 },
          { seat_no: 36, seat_cinema_no: 2, seat_name: 'B6', seat_reserve: 1 },
          { seat_no: 37, seat_cinema_no: 2, seat_name: 'B7', seat_reserve: 1 },
          { seat_no: 38, seat_cinema_no: 2, seat_name: 'B8', seat_reserve: 1 },
          { seat_no: 39, seat_cinema_no: 2, seat_name: 'B9', seat_reserve: 1 },
          { seat_no: 40, seat_cinema_no: 2, seat_name: 'B10', seat_reserve: 1 },
          // 더 많은 좌석 데이터B1
        ],
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
        async fetchSeats() {
            try {
                const response = await fetch(`/seats?movie_no=${this.movie_no}&cinema_no=${this.cinema_no}&date=${this.date}&time=${this.time}`);
                this.seats = await response.json();
                this.processSeats();
            } catch (error) {
                console.error('시트 선택 에러', error);
            }
        },
        processSeats() {
            const rows = {};
    
            this.seats.forEach(seat => {
            const rowLabel = seat.seat_name.charAt(0);
            if (!rows[rowLabel]) {
                rows[rowLabel] = {
                label: rowLabel,
                seats: [],
                };
            }
            rows[rowLabel].seats.push(seat);
            });
    
            this.seatRows = Object.values(rows).sort((a, b) => a.label.localeCompare(b.label));
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
    
            this.selectedSeats.forEach(seat => {
            seat.seat_reserve = 0; // 좌석 예약
            });
    
            alert('좌석 예약이 완료되었습니다.');
            this.selectedSeats = []; // 선택된 좌석 초기화
        },
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
  