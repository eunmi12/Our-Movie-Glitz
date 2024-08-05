<template>
    <div class="payment">
        <div class="cantainer-wrapper">
            <div class="title">
                <h1>결제</h1>
            </div>
            <div class="cantainer">
                <div class="information">
                    <h3>예매정보</h3>
                    <ul>
                        <li>영화 제목: {{ this.movie_title }}</li>
                        <li>상영 날짜 / 시간: {{ this.ticket_date }}</li>
                        <!-- <li>상영 시간: {{ this.screen_starttime }}</li> -->
                        <li>상영관: {{ this.screen_cinema_no }}</li>
                        <li>인원 수: {{ this.ticket_cnt }}</li>
                        <li>좌석번호: {{ this.ticket_seat }}</li>
                    </ul>
                </div>
                <div class="discount">
                    <h3>할인쿠폰</h3>
                    <span class="discount-coupon">할인쿠폰 적용</span>
                    <select id="select-coupon">
                        <option>{{ this.coupon }}</option>
                    </select>
                </div>
                <div class="select-pay">
                    <h3>결제수단 선택</h3>
                    <div>
                        <input id="payment-by-card" name="how" type="radio" value="card" v-model="how" />
                        <label for="how-card">신용카드</label>
                    </div>
                    <div>
                        <input id="payment-by-cash" name="how" type="radio" value="cash" v-model="how" />
                        <label for="how-cash">무통장입금</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            how: null,
            movie_title: {},
        };
    },

    created() {
        this.getTicket();
        // this.getTitle();
    },


    methods: {
        async getTicket() {
            try {
                const ticket_no = this.$route.params.ticket_no;
                console.log('티켓넘버 보냄?', ticket_no);
                const response = await axios.get(`http://localhost:3000/movie/payment/${ticket_no}`);
                console.log('티켓데이터 보냄?', response.data);

                this.ticket = response.data[0].ticket_no;
                console.log('response.data:', response.data[0].ticket_no);

                if (response.data && response.data.length > 0) {
                    this.ticket_no = response.data[0].ticket_no;
                    // 영화 번호도 저장
                    this.movie_no = response.data[0].ticket_movie_no;
                } else {
                    alert ('티켓정보를 불러올 수 없습니다.');
                }
            } catch (error) {
                console.error('티켓 정보 오류:', error);
            }
        },

        async getTitle() {
            try {
                const movie_no = this.$store.state.moive_r.movie_no;

                // 티켓 정보를 통해 moive_no 가져옴
                // const movie_no = this.movie_no;
                console.log('movie_no:', movie_no);
                const response = await axios.get(`http://localhost:3000/movie/getTitle/${movie_no}`);
                console.log('영화이름 데이터 받나?', response.data);

                this.movie_title = response.data[0].movie_title;
                // console.log('response.data:', response.data[0].movie_title);
                console.log('영화제목:', this.movie_title);
            } catch (error) {
                console.error('영화이름 오류:', error);
            }
        },
    },
}
</script>

<style scoped>
.payment {
    width: 50%;
    margin: 0 auto;
    font-size: medium;
}

.title h1{
    text-align: left;
    padding: 2%;
    /* border-bottom: 1px solid #ccc; */
    overflow-y: auto;
}

.cantainer {
    width: 100%;
    border: 1px solid #ccc;
    margin-top: 30px;
}

.information {
    margin-bottom: 70px;
    margin-top: 50px;
}

.information h3 {
    margin-left: 30px;
    text-shadow: 2px 2px 5px rgba(224, 138, 33, 0.6);
}

.discount {
    margin-bottom: 70px;
    margin-left: 30px;
}

.discount h3 {
    text-shadow: 2px 2px 5px rgba(224, 138, 33, 0.6);
}

.select-pay {
    margin-bottom: 50px;
    margin-left: 30px;
}

.select-pay h3 {
    text-shadow: 2px 2px 5px rgba(224, 138, 33, 0.6);
}
</style>