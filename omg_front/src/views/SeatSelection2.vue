<!-- <template>
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
                total_pirce: this.selectedSeats.length * 15000, // 좌석당 가격 15,000원으로 가정
            };

            axios.post(`http://localhost:3000/movie/book`, bookingDetails.then(results => {
                alert(results.data.message);
                this.$router.push({ name: 'Home' }); // 예매 완료 후 홈으로 이동
            }))
        }
    }
}
</script> -->









<template>
    <div class="seat-selection">
        <h1>좌석 선택</h1>
        <div class="screen">SCREEN</div>
        <div class="seats">
            <div v-for="(row, rowIndex) in seatRows" :key="rowIndex" class="seat-row">
                <span class="seat-label">{{ row.label }}</span>
                <span 
                    v-for="seat in row.seats" :key="seat.seat_no" :class="['seat', { 'selected': seat.selected, 'reserved': seat.seat_reserve }]"
                    @click="selectSeat(seat)">{{ seat.seat_name }}
                </span>
            </div>
        </div>
        <div class="confirm-seats">
            <button @click="confirmSeats">좌석 선택 완료</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            seatRows: [],
            selectedSeats: [],
        };
    },
    mounted() {
        this.fetchSeats();
    },
    methods: {
        async fetchSeats() {
            try {
                const response = await fetch('http://localhost:3000/movie/seats', {
                    cinema_no: [],
                });
                const seats = response.json();
                this.processSeats(seats);
            } catch (error) {
                console.error('Failed to fetch seats:', error);
            }
        },
        processSeats(seats) {
            const rows = {};

            seats.forEach(seat => {
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
            if (!seat.seat_reserve) {
                seat.selected = !seat.selected;
                if (seat.selected) {
                    this.selectedSeats.push(seat);
                } else {
                    this.selectedSeats = this.selectedSeats.filter(s => s.seat_no !== seat.seat_no);
                }
            }
        },
        async confirmSeats() {
            try {
                await Promise.all(this.selectedSeats.map(seat => 
                    axios.post(`http://localhost:3000/movie/reserve`, {
                        seat_no: seat.seat_no,
                        reserve: true
                    })
                ));

                alert('좌석이 성공적으로 선택되었습니다.');
                this.fetchSeats(); // 좌석 목록 새로고침
            } catch (error) {
                console.error('좌석 선택 실패', error);
            }
        },
    },
};
</script>

<style scoped>
.seat-selection {
    text-align: center;
    padding: 20px;
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
