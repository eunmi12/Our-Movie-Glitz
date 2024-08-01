<template>
    <div class="movie-booking">
        <h1>영화 예매</h1>
        <div class="steps">
        <!-- Step 1: 영화 선택 -->
        <div class="step">
            <h2>영화 선택</h2>
            <div class="movie-list-container" @scroll="handleScroll">
                <ul>
                    <li v-for="(movie, i) in movies" :key="i" @click="selectMovie(movie)" :class="{ selected: selectedMovie && selectedMovie.movie_no === movie.movie_no }" style="display: flex;">
                        <!-- &nbsp; : 띄어쓰기 -->
                        <span class="movie-title">{{ movie.movie_title }}</span>&nbsp;&nbsp;
                        <span class="movie-age">{{ movie.movie_age }}</span>
                    </li>
                </ul>
            </div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- Step 2: 상영관 선택 -->
        <div class="step">
            <h2>상영관 선택</h2>
            <div class="select-screen" >
                <ul>
                    <li v-for="(cinema, i) in cinemas" :key="i" @click="selectCinema(cinema)" :class="{ selected: selectedCinema && selectedCinema.cinema_no === cinema.cinema_no }">{{ cinema.cinema_name }}</li>
                </ul>
            </div>
         </div>
         &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- Step 3: 날짜 선택 -->
         <div class="step">
            <h2>날짜 선택</h2>
            <div class="movie-list-container date" @scroll="handleScroll">
                <ul>
                    <!-- date를 시작일과 종료일로 계산해서 넣어야 됨 -->
                    <!-- dates 배열에 각 날짜에 대한 리스트 아이템을 생성 -->
                    <li v-for="date in availableDates" :key="date" @click="selectDate(date)" :class="{ selected: selectedDate === date }">{{ date.screen_date.toString().split('T')[0] }}</li>
                </ul>
            </div>
         </div>
         &nbsp;&nbsp;&nbsp;&nbsp;
         <!-- Step 4: 시간 선택 -->
         <div class="step">
            <h2>시간 선택</h2>
            <div class="select-time" >
                <ul>
                    <li v-for="time in times" :key="time" @click="selectTime(time)" :class="{ selected: selectedTime === time }">{{ time }}</li>
                </ul>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <!-- Confirm booking -->
           <div class="confirm-booking">
            <button @click="goToSeatSelection" :disabled="!selectedMovie || !selectedDate || !selectedTime">좌석 선택으로 이동</button>
             <!-- <button @click="goToSeatSelection()">좌석 선택으로 이동</button> -->
           </div>
          
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
        return {
            // activeStep: 1, // 현재 활성화된 단계 (1: 영화, 2: 날짜, 3: 상영관, 4: 시간, 5: 좌석)
            movie_no: null,
            limit: 10,
            offset: 0,
            loading: false,
            movies: [], // 영화 목록
            cinemas: [], // 상영관 목록
            availableDates: '', // 상영가능 날짜 목록
            times: [], // 상영가능 시간 목록
            // seats: [], // 좌석 목록
            selectedMovie: null, // 선택된 영화
            selectedCinema: null, // 선택된 상영관
            selectedDate: null, // 선택된 날짜
            selectedTime: null, // 선택된 시간
            // selectedSeats: [], // 선택된 좌석 목록
            // today: new Date().toISOString().split('T')[0],
            // tomorrow: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
            // currentHour: new Date().getHours(), // 현재 시간 (24시간제)
        };
    },
  
    created() {
        this.fetchMovies();
        // 컴포넌트가 생성될 때 movie_no 값을 설정
        this.movie_no = this.$route.params.movie_no || null;
  
        //movie_no가 설정되면 fetchAvailableDates 함수 호출
        if(this.movie_no) {
            this.fetchAvailableDates();
        }
    },
  
    computed: {
        // dates() {
        //     return this.availableDates.filter(date => new Date(date) >= new Date(this.tomorrow));
        // },
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
            if (this.loading) return;
            this.loading = true;
            axios.get(`http://localhost:3000/movie/movies/page`, {
                params: {
                    limit: this.limit,
                    offset: this.offset,
                }
            })
            .then(results => {
                this.movies = [...this.movies, ...results.data];
                this.offset += this.limit;
                this.loading = false;
            }).catch(error => {
                console.error('영화를 불러오는 중 오류가 발생했습니다.', error);
                this.loading = false;
            });
        },
        handleScroll(event) {
            if (!this.selectedMovie) {
                console.error('선택된 영화가 없습니다.');
                return;
            }
            if (!this.movie_no) {
                console.error('무비넘버가 스크롤 될 때 찾을 수 없음');
                return;
            }
            const container = event.target;
            if (container.scrollHeight - container.scrollTop <= container.clientHeight + 10) {
                this.fetchMovies();
                this.fetchAvailableDates();
            }
        },
        selectMovie(movie) {
            this.selectedMovie = movie;
            this.movie_no = movie.movie_no;
            this.fetchCinemas();
            this.selectedCinema = null; // 영화 선택 시 상영관 초기화
            this.selectedDate = null;
            this.selectedTime = null;
            // this.currentStep = 2;
            },
        fetchCinemas() {
            axios.post(`http://localhost:3000/movie/cinemas`, {
                movie_no: this.selectedMovie.movie_no
            }) 
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
            // this.currentStep = 3;
        },
        fetchAvailableDates() {
            if(!this.selectedMovie || !this.selectedCinema) {
                console.error('선택된 영화 또는 상영관이 없습니다.');
                return;
            }
            const movieNo = this.movie_no;
            if (!movieNo) {
                console.error('무비넘버 언디파인드');
                return;
            }
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
            this.fetchAvailableTimes();
        },
        fetchAvailableTimes() {
            console.log(this.selectedDate);

            let dateValue;
                if (typeof this.selectedDate === 'object' && this.selectedDate !== null) {
                    // this.selectedDate가 객체일 경우, 해당 객체의 날짜 속성을 추출합니다.
                    dateValue = this.selectedDate.screen_date ? this.selectedDate.screen_date.split('T')[0] : null;
                } else {
                    // this.selectedDate가 객체가 아닐 경우, 문자열로 처리합니다.
                    dateValue = this.selectedDate.toString().split('T')[0];
                }
                console.log("dateValue:--------->",dateValue);
            axios.post(`http://localhost:3000/movie/availableTimes`, {
                movie_no: this.selectedMovie.movie_no,
                cinema_no: this.selectedCinema.cinema_no,
                date: dateValue //this.selectedDate.date로 date 속성을 직접 전달하는 것이 아니라 selectedDate에서 가져와야 됨
            }).then(results => {
                console.log('rerererer', results);
                this.times = results.data;
                // console.log('rerererere', results.data);
                if (this.times.length === 0) {
                    alert('해당 영화의 상영 일정이 없습니다.');
                    this.currentStep = 3;
                } else {
                    this.currentStep = 4;
                }
            }).catch(error => {
                console.error('상영 시간을 불러오는 중 오류가 발생했습니다.', error);
                alert('상영 시간을 불러오는 중 오류가 발생했습니다.');
            });
        },
        selectTime(time) {
            // 시간 저장, 다음 단계 이동
            this.selectedTime = time;
            // this.fetchSeats();
            // this.currentStep = 5;
        },
  
        goToSeatSelection() {
            if (this.selectedMovie && this.selectedCinema && this.selectedDate && this.selectedTime) {
                axios({
                    url: `http://localhost:3000/movie/saveinfo`,
                    method: "POST",
                    data: {
                        movie_no: this.selectedMovie.movie_no,
                        cinema_no: this.selectedCinema.cinema_no,
                        date: this.selectedDate.screen_date ? this.selectedDate.screen_date.split('T')[0] : this.selectedDate.toString().split('T')[0],
                        time: this.selectedTime,
                        user_no: this.$store.state.user.user_no,
                    }
                }).then(results => {
                    console.log('예매 정보 저장 완료');
                })
            }
            // axios({
            //     url: `http://localhost:3000/movie/seats`,
            //     method: "POST",
            //     data: {
            //         movie_no: this.selectedMovie.movie_no,
            //         cinema_no: this.selectedCinema.cinema_no,
            //         date: this.selectedDate.toString().split('T')[0],
            //         time: this.selectedTime,
            //     }
            // });
            const movie_data = {
                movie_no: this.selectedMovie.movie_no,
                cinema_no: this.selectedCinema.cinema_no,
                date: this.selectedDate.screen_date ? this.selectedDate.screen_date.split('T')[0] : this.selectedDate.toString().split('T')[0],
                time: this.selectedTime,
            };
            this.$store.commit('setMovie_r', movie_data);
            this.$router.push({
                name: 'SeatSelection',
                // params: {
                //     movie_no: this.selectedMovie.movie_no,
                //     cinema_no: this.selectedCinema.cinema_no,
                //     date: this.selectedDate.toString().split('T')[0],
                //     time: this.selectedTime,
                // },
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
        
        // bookTickets() {
        //     const bookingDetails = {
        //         movie_no: this.selectedMovie.movie_no,
        //         cinema_no: this.selectedCinema.cinema_no,
        //         date: this.selectedDate.toString().split('T')[0],
        //         user_no: this.$store.state.user.user_no,
        //         time: this.selectedTime,
        //         // seate: this.selectedSeats.map(seat => seat.seat_no),
        //         total_price: this.selectedMovie.movie_price * this.selectedSeats.length,
        //     };
  
        //     axios.post(`http://localhost:3000/movie/book`, bookingDetails).then((results) => {
        //         alert(results.data.message);
        //     }).catch(() => {
        //         alert('예매 중 오류가 발생했습니다.');
        //     });
        // },
    },
  };
  </script>
  
  <style scoped>
  .movie-booking {
  width: 80%;
  margin: 0 auto;
  font-size: medium;;
  }
  
  .movie-booking h1 {
    text-align: left;
    padding: 3%;
    border-bottom: 1px solid #ccc;
    overflow-y: auto;
  }
  
  .steps {
    display: flex;
    justify-content: space-between;
  }
  
  .step {
    width: 25%;
    border: 1px solid #312b2b
  }
  
  .step h2 {
    text-align: center;
    /* margin-top: 5%; */
    padding-top: 5%;
    padding-bottom: 5%;
    color: rgb(74, 73, 73);;
    border-bottom: 1px solid #4c4847;
    font-size: x-large;
    background-color: #ccc;
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
    text-align: center;
    font-size: small;
  }
  
  .select-screen {
    text-align: center;
  }
  
  .select-time {
    text-align: center;
  }
  
  ul {
    list-style: none;
    padding: 0;
    /* border: 1px solid #312b2b */
  }
  
  li {
    padding: 10px;
    cursor: pointer;
  }
  
  .confirm-booking {
    text-align: center;
    /* margin-top: 20px; */
  }
  
  .confirm-booking button {
    padding-top: 10px;
    background-color: #e5ab2d;
    color: white;
    /* border: none; */
    cursor: pointer;
    font-size: 19px;
    width: 30px;
    height: 250px;
    display: flex;
    justify-content: center;
  }
  
  .confirm-booking button:disabled {
    padding-top: 10px;
    background-color: #ccc;
    cursor: not-allowed;
    width: 30px;
    height: 250px;
    font-size: 19px;
    display: flex;
    justify-content: center;
  }
  
  .movie-list-container {
    max-height: 400px; /* Adjust as needed to ensure scrolling */
    overflow-y: scroll; /* 스크롤이 항상 표시되도록 */
  }
  
  .date { /* 클래스명 사이에 띄어쓰기로 그룹에서 또 다른 종류로 구분했을 경우, 뒤에 있는 클래스를 쓰면 됨 */
    text-align: center;
  }
  
  /* Always show scrollbar */
  .movie-list-container::-webkit-scrollbar {
    width: 12px;
  }
  
  .movie-list-container::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .movie-list-container::-webkit-scrollbar-thumb {
    background: #888;
  }
  
  .movie-list-container::-webkit-scrollbar-thumb:hover {
    background: #555;
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