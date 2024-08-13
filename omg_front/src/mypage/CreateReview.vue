<template>
    <div class="review">
        <h6>관람평</h6>
        <br><br>
        <div class="review-cont">
            <div class="review-title">
                <div class="review-type">
                    <button class="dropdown-toggle" type="button" @click="toggleType">{{ selectedTypeText }}</button>
                    <ul class="dropdown-menu" :class="{ show: isDropdownOpen }">
                        <li v-for="(type, i) in typelist" :key="i">
                            <a class="dropdown-item" href="#" @click.prevent="selectType(i)">{{ type }}</a>
                        </li>
                    </ul>
                </div>
                <div class="title-value">
                    <div class="movie-title">{{ movie.movie_title }}</div>
                    <div class="ticket-details">
                        <span class="ticket-date">날짜: {{ movie.ticket_date }}</span>
                        <span class="ticket-time">시간: {{ movie.ticket_time }}</span>
                        <span class="cinema-no">상영관 번호: {{ movie.ti_se_cinema_no }}관</span>
                    </div>
                </div>
            </div>
            <div class="review-comt">
                <textarea class="comt-value" type="text" v-model="review_comment" placeholder="내용을 입력해 주세요."></textarea>
            </div>
            <div class="review-btn">
                <button class="regist" @click="registt()">등록</button>
                <button class="cancel" @click="cancel()">취소</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            isDropdownOpen: false,
            typelist: ['★', '★★', '★★★', '★★★★', '★★★★★'],
            selectedType: null,
            review_comment: "",
            movie: {
                movie_title: '',
                movie_no: '',
            },
            ticket: {
                ticket_no: '',
                ticket_re: ''
            }
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        re_user_no() {
            return this.user ? this.user.user_no : null;
        },
        selectedTypeText() {
            return this.selectedType !== null ? this.typelist[this.selectedType] : '평점';
        }
    },
    methods: {
        toggleType() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        selectType(index) {
            this.selectedType = index;
            this.isDropdownOpen = false;
        },
        async movietitle() {
            const ticket_no = this.$route.params.ticket_no;
            const user_no = this.re_user_no;
            console.log(ticket_no, user_no);

            try {
                console.log("Sending ticket_no:", ticket_no);
                const response = await axios.post(`http://localhost:3000/user/reviewtitle`, { ticket_no, user_no });
                this.movie = response.data[0];
                console.log("movie title:", this.movie.movie_title);
            } catch (error) {
                console.error("영화제목 불러오기 에러 발생", error);
            }
        },
        async ticketno() {
            const user_no = this.re_user_no;
            try {
                const response = await axios.post(`http://localhost:3000/user/reviewticketno`, { user_no });
                if (response.data.length > 0) {
                    this.ticket.ticket_no = response.data[0].ticket_no;
                    this.ticket.ticket_re = response.data[0].ticket_re;
                    this.movietitle();
                } else {
                    this.$swal('해당 유저의 예매내역이 없습니다.');
                }
            } catch (error) {
                console.error("영화제목 불러오기 에러 발생", error);
            }
        },
        async registt() {
            console.log("review_user_no:", this.re_user_no);
            console.log("review_movie_no:", this.movie.movie_no);
            console.log("ticket_no:", this.$route.params.ticket_no);
            console.log("ticket_re:", this.ticket.ticket_re);

            try {
                if (!this.review_comment) {
                    this.$swal('내용을 입력하세요.');
                    return;
                } else if (this.selectedType === null) {
                    this.$swal('평점이 없습니다.');
                    return;
                }

                const response = await axios.post(`http://localhost:3000/user/crereview`, {
                    review_rate: this.selectedType + 1,
                    review_comment: this.review_comment,
                    movie_no: this.movie.movie_no,
                    user_no: this.re_user_no,
                    ticket_no: this.$route.params.ticket_no,
                    ticket_re: this.ticket.ticket_re
                });

                if (response.data) {
                    this.$swal('리뷰가 성공적으로 등록되었습니다.');
                    this.$router.push(`/mypagemain/${this.re_user_no}`);
                }
            } catch (error) {
                console.error("리뷰 등록 오류:", error);
                this.$swal('리뷰 등록 중 오류가 발생했습니다.');
            }
        },
        cancel() {
            this.$router.push(`/mypagemain/${this.user.user_no}`);
        },
    },
    mounted() {
        this.movietitle();
        this.ticketno();
    }
}
</script>

<style scoped>
h6 {
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid lightgray;
  padding-bottom: 15px;
  width: 95%;
  margin: auto;
}
.review {
    width: 80%;
    margin-left: 175px;
}
.review-cont {
    margin: auto;
    width: 80%;
    border: 1px solid lightgray;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.review-title {
    margin: auto;
    display: flex;
    padding: 20px 30px 15px 30px;
    border-bottom: 1px solid lightgray;
}

.review-type {
    flex: 1;
    margin-right: 10px;
    position: relative;
}

.dropdown-toggle {
    display: inline-block;
    cursor: pointer;
    width: 150px;
    height: 35px;
    border-radius: 5px;
    background-color: ivory;
    box-sizing: border-box;
    padding: 0 10px;
    position: relative;
    color: red; /* 별 색상 */
    font-size: 20px; /* 별 크기 */
}

.dropdown-menu {
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  background-color: ivory;
  width: 150px; /* 버튼과 같은 너비로 설정 */
  box-sizing: border-box;
  position: absolute;
  left: 0; /* 버튼의 왼쪽에 맞추기 */
  z-index: 1000; /* 다른 요소 위로 표시 */
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  text-align: left;
  color: red; /* 별 색상 */
  font-size: 20px; /* 별 크기 */
}

.dropdown-item:hover {
  background-color: lightgray;
}

.title-value {
    flex: 8;
    height: auto;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
}

.movie-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}

.ticket-details {
    font-size: 16px;
    color: #555;
    text-align: right;

}

.ticket-date, .ticket-time, .cinema-no {
    display: block;
    margin: 5px 0;
}

.review-comt {
    padding-top: 4%;
    padding-bottom: 40px;
    height: 400px;
}

.comt-value {
    border: none;
    margin-left: 30px;
    width: 90%;
    height: 360px;
    resize: none;
}

.comt-value:focus {
    outline: none;
}

.review-btn {
    margin: 15px;
    display: flex;
    justify-content: center;
}

.regist {
    border: 1px solid black;
    margin-right: 10px;
    border-radius: 5px;
    width: 50px;
    height: 30px;
    background-color: ivory;
}

.cancel {
    border: 1px solid black;
    margin-left: 10px;
    border-radius: 5px;
    width: 50px;
    height: 30px;
}

.typelist {
    color: gold; /* 별 색상 */
    font-size: 20px; /* 별 크기 */
}
</style>
