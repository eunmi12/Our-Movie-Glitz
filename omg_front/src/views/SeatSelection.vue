<template>
    <div class="seat-selection">
      <h1>좌석 선택</h1>
      <div class="seats">
        <div v-for="seat in seats" :key="seat.seat_no" @click="selectSeat(seat)" :class="{ selected: selectedSeats.includes(seat.seat_no) }">
          {{ seat.seat_name }}
        </div>
      </div>
      <div class="confirm-booking">
        <button @click="confirmBooking">예매 완료</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            seats: [],
            selectedSeats: [],
        };
    },
    created() {
        this.fetchSeats();
    },
    methods: {
        fetchSeats() {
            const { cinema_no } = this.$router.params;
            axios.post(`http://localhost:3000/movie/seats`, { cinema_no }).this(results => {
                this.seats = results.data;
            });
        },
        selectSeat(seat) {
            if (this.selectedSeats.includes(seat.seat_no)) {
                this.selectedSeats = this.selectedSeats.filter( s => s !== seat.seat_no);
            } else {
                this.selectedSeats.push(seat.seat_no);
            }
        },
        confirmBooking() {
            const { movie_no, cinema_no, date, time } = this.$route.params;
            const bookingDetails = {
                movie_no,
                cinema_no,
                date,
                time,
                seats: this.selectedSeats,
                total_pirce: this.selectedSeats.length * 10000, // 좌석당 가격 만원으로 가정
            };

            axios.post(`http://localhost:3000/movie/book`, bookingDetails.then(results => {
                alert(results.data.message);
                this.$router.push({ name: 'Home' }); // 예매 완료 후 홈으로 이동
            }))
        }
    }
}
</script>