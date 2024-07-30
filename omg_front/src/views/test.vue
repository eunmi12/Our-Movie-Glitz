<template>
  <div class="container">
    <h1>Seat Selection</h1>
    <div class="screen">SCREEN</div>
    <div class="people-selection">
        <label><input type="radio" name="people" v-model="peopleCount" :value="1"> 1명</label>
        <label><input type="radio" name="people" v-model="peopleCount" :value="2"> 2명</label>
        <label><input type="radio" name="people" v-model="peopleCount" :value="3"> 3명</label>
        <label><input type="radio" name="people" v-model="peopleCount" :value="4"> 4명</label>
    </div>
    <div class="seating-chart-container">
      <div class="seating-chart">
        <div v-for="(seat, index) in seats" :key="index" :class="seatClass(seat)" @click="selectSeats(index)">
          {{ seat.seat_name }}
        </div>
      </div>
    </div>
    <div class="legend">
      <div><div class="box available"></div>Available</div>
      <div><div class="box selected"></div>Selected</div>
      <div><div class="box occupied"></div>Occupied</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rows: 5,
      columns: 10,
      seats: [],
      peopleCount: 0
    };
  },
  created() {
    this.fetchSeats();
  },
  methods: {
    async fetchSeats() {
      try {
        const response = await axios.get('http://localhost:3000/admin/user/seats');
        this.seats = response.data;
        // 모든 좌석에 'selected' 속성 추가
        this.seats.forEach(seat => {
          seat.selected = false;
        });
      } catch (error) {
        console.error('There was an error fetching the seat data!', error);
      }
    },
    seatClass(seat) {
      if (seat.seat_reserve === 0) {
        return 'seat occupied';
      } else if (seat.selected) {
        return 'seat selected';
      } else {
        return 'seat available';
      }
    },
    getSeatLabel(index) {
      const row = String.fromCharCode(65 + Math.floor(index / this.columns));
      const number = (index % this.columns) + 1;
      return `${row}${number}`;
    },
    selectSeats(startIndex) {
      // 좌석이 예약된 경우 선택할 수 없음
      if (this.seats[startIndex].seat_reserve === 0) return;

      // 선택된 좌석 초기화
      this.seats.forEach(seat => seat.selected = false);

      let endIndex = startIndex + this.peopleCount - 1;
      // 선택한 인원을 위한 연속된 좌석이 있는지 확인
      if (endIndex % this.columns < startIndex % this.columns) {
        alert('선택한 인원을 위한 연속된 좌석이 없습니다.');
        return;
      }

      for (let i = startIndex; i <= endIndex; i++) {
        // 좌석이 범위를 초과하거나 예약된 경우 선택 불가
        if (i >= this.rows * this.columns || this.seats[i].seat_reserve === 0) {
          alert('선택한 인원을 위한 연속된 좌석이 없습니다.');
          return;
        }
      }

      // 선택된 좌석 업데이트
      for (let i = startIndex; i <= endIndex; i++) {
        this.seats[i].selected = true;
      }

      this.displaySelectedSeats();
    },
    displaySelectedSeats() {
      const selectedSeats = this.seats.map((seat, index) => {
        if (seat.selected) {
          return this.getSeatLabel(index);
        }
        return null;
      }).filter(seat => seat !== null);

      console.log('Selected Seats:', selectedSeats);
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  margin: 20px;
}

.screen {
  background-color: #ccc;
  height: 50px;
  width: 300px;
  margin: 20px auto;
  line-height: 50px;
  font-weight: bold;
}

.people-selection {
  margin-bottom: 20px;
}

.people-selection label {
  margin: 0 10px;
}

.seating-chart-container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.seating-chart {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
}

.seat {
  width: 30px;
  height: 30px;
  background-color: #ddd;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  border-radius: 5px;
}

.seat.selected {
  background-color: #6c7ae0;
  color: white;
}

.seat.occupied {
  background-color: #444;
  cursor: not-allowed;
}

.legend {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.legend div {
  display: flex;
  align-items: center;
}

.legend .box {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 3px;
}

.box.available {
  background-color: #ddd;
}

.box.selected {
  background-color: #6c7ae0;
}

.box.occupied {
  background-color: #444;
}
</style>
