<template>
    <div class="movie-booking">
        <h1>영화 예매</h1>
        <div class="steps">
        <!-- Step 1: 영화 선택 -->
        <div class="step">
            <h2>영화 선택</h2>
            <div>
                <ul>
                    <li v-for="(movie, i) in movies" :key="i" @click="selectMovie(movie)" :class="{ selected: selectedMovie && selectedMovie.movie_no === movie.movie_no }" style="display: flex;">
                        <!-- &nbsp; : 띄어쓰기 -->
                        <span class="movie-title">{{ movie.movie_title }}</span>&nbsp;&nbsp;
                        <span class="movie-age">{{ movie.movie_age }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- Step 2: 상영관 선택 -->
        <div class="step">
            <h2>상영관 선택</h2>
            <div>
                <ul>
                    <li v-for="(cinema, i) in cinemas" :key="i" @click="selectCinema(cinema)" :class="{ selected: selectedCinema && selectedCinema.cinema_no === cinema.cinema_no }">{{ cinema.cinema_name }}</li>
                </ul>
            </div>
         </div>
        <!-- Step 3: 날짜 선택 -->
         <div class="step">
            <h2>날짜 선택</h2>
            <div>
                <ul>
                    <!-- date를 시작일과 종료일로 계산해서 넣어야 됨 -->
                    <!-- dates 배열에 각 날짜에 대한 리스트 아이템을 생성 -->
                    <li v-for="date in dates" :key="date" @click="selectDate(date)" :class="{ selected: selectedDate === date }">{{ new Date(date).toISOString().split('T')[0] }}</li>
                </ul>
            </div>
         </div>
         <!-- Step 4: 시간 선택 -->
         <div class="step">
            <h2>시간 선택</h2>
            <div>
                <ul>
                    <li v-for="time in times" :key="time" @click="selectTime(time)" :class="{ selected: selectedTime === time }">{{ time }}</li>
                </ul>
            </div>
          </div>
          <!-- Confirm booking -->
           <div class="confirm-booking">
            <button @click="goToSeatSelection" :disabled="!selectedMovie || !selecteDate || !selectedTime">좌석 선택으로 이동</button>
           </div>
          <!-- Step 5: 좌석 선택 -->
           <!-- <div class="select-seat" v-if="currentStep === 5">
            <h2>좌석 선택</h2>
            <div class="seats"> -->
                <!-- seats 배열의 각 좌석에 대해 div 요소를 생성 -->
                <!-- <div v-for="seat in seats" :key="seat.seat_no" @click="selectSeat(seat)" :class="{ selected: selectedSeats.includes(seat.seat_no) }">{{ seat.seat_name }}</div>
            </div>
        </div> -->
        <!-- 이전 단계로 돌아가기 버튼 (1단계 이후부터 보임) -->
         <!-- <div v-if="currentStep > 1">
            <button @click="previousStep">이전</button>
         </div>
         <div v-if="currentStep < 5">
            <button @click="nextStep">다음</button>
         </div>
         <div v-if="currentStep === 5">
            <button @click="confirmBooking">예매 완료</button>
         </div> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            // activeStep: 1, // 현재 활성화된 단계 (1: 영화, 2: 날짜, 3: 상영관, 4: 시간, 5: 좌석)
            movies: [], // 영화 목록
            cinemas: [], // 상영관 목록
            availableDates: [], // 상영가능 날짜 목록
            times: ['9:00 - 11:00', '13:00 - 15:00', '16:00 - 18:00'], // 상영가능 시간 목록
            // seats: [], // 좌석 목록
            selectedMovie: null, // 선택된 영화
            selectedCinema: null, // 선택된 상영관
            selectedDate: null, // 선택된 날짜
            selectedTime: null, // 선택된 시간
            // selectedSeats: [], // 선택된 좌석 목록
            today: new Date().toISOString().split('T')[0],
            tomorrow: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
            currentHour: new Date().getHours(), // 현재 시간 (24시간제)
        };
    },

    created() {
        this.fetchMovies();
    },

    computed: {
        dates() {
            return this.availableDates.filter(date => new Date(date) >= new Date(this.tomorrow));
        },
        // validTimes() {
        //     if (this.selectedDate === this.today) {
        //         // const currentHour = new Date().getHours();
        //         return this.times.filter(time => {
        //             const [startTime] = time.split(' - ');
        //             const startHour = parseInt(startTime.split(':')[0]);
        //             return startHour > this.currentHour;
        //         });
        //     }
        //     return this.times;
        // },
    },

    mounted() {
        this.fetchMovies(); // 컴포넌트가 마운트 될 때, 영화 목록을 가져옴
    },

    methods: {
        fetchMovies() {
            axios.get(`http://localhost:3000/movie/movies`)
            .then(results => {
                this.movies = results.data;
            });
        },
        selectMovie(movie) {
            this.selectedMovie = movie;
            this.fetchCinemas();
            this.currentStep = 2;
            },
        fetchCinemas() {
            axios.get(`http://localhost:3000/movie/cinemas`)
            .then(results => {
                this.cinemas = results.data;
                // 현재 상영관이 없는 영화는 알럿 띄움
                if (this.cinemas.length === 0) {
                    alert('현재 상영 중이지 않은 영화입니다.');
                } else {
                    this.currentStep = 2;
                }
            }).catch(error => {
                console.error('상영관 정보를 불러올 수 없습니다.', error);
                alert('상영관 정보를 불러올 수 없습니다.');
            });
        },
        selectCinema(cinema) {
            this.selectedCinema = cinema;
            this.fetchAvailableDates();
            this.currentStep = 3;
        },
        fetchAvailableDates() {
            axios.post(`http://localhost:3000/movie/availableDates`, {
                movie_no: this.selectedMovie.movie_no,
                cinema_no: this.selectedCinema.cinema_no
            }).then(results => {
                // console.log('rerererer', results);
                this.availableDates = results.data;
                if (this.availableDates.length === 0) {
                    alert('해당 영화의 상영 일정이 없습니다.');
                    this.currentStep = 2;
                } else {
                    this.currentStep = 3;
                }
            }).catch(error => {
                console.error('상영 날짜를 불러오는 중 오류가 발생했습니다.', error);
                alert('상영 날짜를 불러오는 중 오류가 발생했습니다.');
            });
        },
        selectDate(date) {
            // 날짜 저장하고 다음 단계 이동
            this.selectedDate = date;
            this.currentStep = 4;
        },
        selectTime(time) {
            // 시간 저장, 다음 단계 이동
            this.selectedTime = time;
            this.fetchSeats();
            this.currentStep = 5;
        },

        goToSeatSelection() {
            this.$router.push({
                name: 'SeatSelection',
                params: {
                    movie_no: this.selectedMovie.movie_no,
                    cinema_no: this.selectedCinema.cinema_no,
                    date: this.selecteDate,
                    time: this.selectedTime,
                },
            });
            this.currentStep = 5;
        },
        // fetchSeats() {
        //     axios.post(`http://localhost:3000/seats`, {
        //         cinema_no: this.selectCinema.cinema_no
        //     }).then(results => {
        //         this.seats = results.data;
        //     });
        // },
        // selectSeat(seat) {
        //     // 좌석 선택 저장 또는 선택 해제
        //     if (this.selectedSeats.includes(seat.seat_no)) { // this.selectedSeats : 사용자가 현재 선택한 좌석 목록(배열) => incluses(seat)메서드로 배열에 seat가 포함되어있는지 확인
        //         // 만약 seat가 배열에 포함되어 있다면, 사용자가 이미 해당 좌석을 선택한 상태라는 의미
        //         this.selectedSeats = this.selectedSeats.filter(s => s !== seat.seat_no); // s : 배열의 각 요소, s !== seat는 현재요소 s가 seat와 같지 않을 경우에만 true 반환
        //         // 따라서 filter 메서드는 seat와 같은 요소를 제외한 새로운 배열을 반환 => 선택 해제하려는 좌석을 배열에서 제거하는 역할
        //     } else {
        //         this.selectedSeats.push(seat.seat_no); // seat가 this.selectedSeats 배열에 포함되어 있지 않은 경우에 실행
        //         // push 메서드는 배열의 끝에 새로운 요소를 추가 => 사용자가 해당 좌석을 선택했음을 나타냄
        //     }
        // },
        // previousStep() {
        //     // 이전 단계로 돌아가기
        //     this.currentStep--;
        // },
        // nextStep() {
        //     this.currentStep++;
        // },
        bookTickets() {
            const bookingDetails = {
                movie_no: this.selectedMovie.movie_no,
                cinema_no: this.selectedCinema.cinema_no,
                date: this.selectedDate,
                time: this.selectedTime,
                seate: this.selectedSeats.map(seat => seat.seat_no),
                total_price: this.selectedMovie.movie_price * this.selectedSeats.length,
                ticket_type: 'standard' // 예매 타입은 필요에 따라 변경
            };

            axios.post(`http://localhost:3000/movie/book`, bookingDetails).then((results) => {
                alert(results.data.message);
            }).catch(() => {
                alert('예매 중 오류가 발생했습니다.');
            });
        },
    },
};
</script>

<style scoped>
.movie-booking {
 width: 90%;
 margin: 0 auto;
}

.movie-booking h1 {
    text-align: left;
    padding: 3%;
    border-bottom: 1px solid #ccc;
}

.steps {
    display: flex;
    justify-content: space-between;
}

.step {
    width: 25%;
}

.step h2 {
    text-align: center;
    margin-top: 3%;
    color: rgb(74, 73, 73);;
}
/* .movie-booking h2 {
    text-align: center;
    margin-top: 3%;
    color: rgb(74, 73, 73);
} */

.selected {
    background-color: #4c4847;
    color: white;
}

.movie-age {
    border: 1px solid #000000;
    width: 20px;
    height: 20px;
    /* background-color: #d54646; */
    color: #312b2b;
    border-radius: 3px;
}

ul {
    list-style: none;
    padding: 0;
    border: 1px solid #312b2b
}

li {
    padding: 10px;
    cursor: pointer;
}

.confirm-booking {
    text-align: center;
    margin-top: 20px;
}

.confirm-booking button {
    padding: 10px 20px;
    background-color: #e9ec8d;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px
}

.confirm-booking button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    width: 10px;
    height: 500px;
    display: inline-block
}


/* .seats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.seats div {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.seats div.selected {
  background-color: #4caf50;
  color: white;
}

.select-movie {
    cursor: pointer;
} */

</style>