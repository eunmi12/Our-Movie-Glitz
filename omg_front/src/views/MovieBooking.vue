<template>
    <div class="movie-booking">
        <h1>영화 예매</h1>
        <!-- Step 1: 영화 선택 -->
        <div v-if="currentStep === 1">
            <h2>영화 선택</h2>
            <ul>
                <li class="select-movie" v-for="(movie, i) in movies" :key="i" @click="selectMovie(movie)">{{ movie.movie_title }} {{ movie.movie_age }}</li>
            </ul>
        </div>
        <!-- Step 2: 날짜 선택 -->
         <div v-if="currentStep === 2">
            <h2>날짜 선택</h2>
            <ul>
                <!-- date를 시작일과 종료일로 계산해서 넣어야 됨 -->
                 <!-- dates 배열에 각 날짜에 대한 리스트 아이템을 생성 -->
                <li v-for="(date, i) in dates" :key="i" @click="selectDate(date)">{{ date }}</li>
            </ul>
         </div>
         <!-- Step 3: 상영관 선택 -->
         <div v-if="currentStep === 3">
            <h2>상영관 선택</h2>
            <ul>
                <li v-for="screen in screens" :key="screen" @click="selectScreen(screen)">{{ movie_screen }}</li>
            </ul>
          </div>
         <!-- Step 4: 시간 선택 -->
          <div v-if="currentStep === 4">
            <h2>시간 선택</h2>
            <ul>
                <!-- time : screen 테이블의 상영시작 시간 -->
                 <!-- times 배열의 각 시간에 대해 리스트 아이템을 생성 -->
                <li v-for="time in times" :key="time" @click="selectTime(time)">{{ time }}</li>
            </ul>
          </div>
          <!-- Step 5: 좌석 선택 -->
           <div v-if="currentStep === 5">
            <h2>좌석 선택</h2>
            <div class="seats">
                <!-- seats 배열의 각 좌석에 대해 div 요소를 생성 -->
                <div v-for="seat in seats" :key="seat" @click="selectSeat(seat)" :class="{ selected: selectedSeats.includes(seat) }">{{ movie_seat }}</div>
            </div>
        </div>
        <!-- 이전 단계로 돌아가기 버튼 (1단계 이후부터 보임) -->
         <div v-if="currentStep > 1">
            <button @click="previousStep">이전</button>
         </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            currentStep: 1, // 현재 단계 (1: 영화, 2: 날짜, 3: 상영관, 4: 시간, 5: 좌석)
            selectedMovie: null, // 선택된 영화
            selectedDate: null, // 선택된 날짜
            selectedScreen: null, // 선택된 상영관
            selectedTime: null, // 선택된 시간
            selectedSeats: [], // 선택된 좌석 목록
            movies: [], // 영화 목록
            dates: [], // 날짜 목록
            screens: [], // 상영관 목록
            times: [], // 시간목록
            seats: [], // 좌석 목록
        };
    },

    mounted() {
        this.fetchMovies(); // 컴포넌트가 마운트 될 때, 영화 목록을 가져옴
    },

    methods: {
        fetchMovies() {
            axios.get('http://localhost:3000/movie/movies')
            .then(response => {
                this.movies = response.data;
                // 예를 들어 첫 번째 영화를 선택한 경우, 날짜를 가져오도록 설정
                if (this.movies.length > 0) {
                    this.selectMovie(this.movies[0]);
                }
            })
            .catch(error => {
                console.error('영화 목록을 가져오는 데 실패했습니다.', error);
            });
        },
        selectMovie(movie) {
            this.selectedMovie = movie;
            this.fetchDates(movie); // 선택된 영화에 대한 날짜를 가져옴
            },
        fetchDates(movie) {
            this.dates = this.generateDates(movie.movie_startdate, movie.movie_enddate);

            // 모든 날짜에 대해 예약 가능 여부를 확인
            const availabilityChecks = this.dates.map(date =>
                axios.get(`http://localhost:3000/movie/movies/${movie.movie_no}/dates/${date}/availability`)
            );

            axios.all(availabilityChecks)
                .then(results => {
                    // 각 날짜의 응답 결과를 필터링하여 예매 가능한 날짜만 남김
                    this.dates = this.dates.filter((date, index) => results[index].data.available);
                    this.currentStep = 2;
                })
                .catch(error => {
                    console.error('상영 날짜를 가져오는 데 실패했습니다.', error);
                });
        },
        generateDates(startDate, endDate) {
            const dates = [];
            let currentDate = new Date(startDate);
            const end = new Date(endDate);

            while (currentDate <= end) {
                dates.push(currentDate.toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;
        },
        // isAvailableDate(date) {

        // },
        selectDate(date) {
            // 날짜 저장하고 다음 단계 이동
            this.selectedDate = date;
            this.currentStep = 3;
        },
        selectScreen(screen) {
            // 상영관 저장, 다음 단계 이동
            this.selectedScreen = screen;
            this.currentStep = 4;
        },
        selectTime(time) {
            // 시간 저장, 다음 단계 이동
            this.selectedTime = time;
            this.currentStep = 5;
        },
        selectSeat(seat) {
            // 좌석 선택 저장 또는 선택 해제
            if (this.selectedSeats.includes(seat)) { // this.selectedSeats : 사용자가 현재 선택한 좌석 목록(배열) => incluses(seat)메서드로 배열에 seat가 포함되어있는지 확인
                // 만약 seat가 배열에 포함되어 있다면, 사용자가 이미 해당 좌석을 선택한 상태라는 의미
                this.selectedSeats = this.selectedSeats.filter(s => s !== seat); // s : 배열의 각 요소, s !== seat는 현재요소 s가 seat와 같지 않을 경우에만 true 반환
                // 따라서 filter 메서드는 seat와 같은 요소를 제외한 새로운 배열을 반환 => 선택 해제하려는 좌석을 배열에서 제거하는 역할
            } else {
                this.selectedSeats.push(seat); // seat가 this.selectedSeats 배열에 포함되어 있지 않은 경우에 실행
                // push 메서드는 배열의 끝에 새로운 요소를 추가 => 사용자가 해당 좌석을 선택했음을 나타냄
            }
        },
        previousStep() {
            // 이전 단계로 돌아가기
            this.currentStep--;
        },
    }
}
</script>

<style scoped>
.seats {
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
</style>