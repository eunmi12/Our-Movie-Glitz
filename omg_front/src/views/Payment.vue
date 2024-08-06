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
                        <li>영화 제목 : {{ this.ticket.movie_title }}</li>
                        <li>상영 날짜 : {{ formattedDate }}</li>
                        <li>상영 시간 : {{ this.ticket.ticket_time }}</li>
                        <li>상영관 : {{ this.ticket.ti_se_cinema_no }}관</li>
                        <li>인원 수 : {{ this.ticket.ticket_cnt }}</li>
                        <li>좌석번호 : {{ this.ticket.ticket_seat }}</li>
                        <li>결제 금액 : {{ formattedTotalPrice }}원</li>
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
                        <label for="how-card" @click="requestPay">신용카드</label>
                    </div>
                    <div>
                        <input id="payment-by-cash" name="how" type="radio" value="cash" v-model="how" />
                        <label for="how-cash">무통장입금</label>
                    </div>
                    <div class="account-info">
                        계좌번호: (이젠은행)111-2222-33333
                    </div>
                </div>
                <div>
                    <button class="payment-btn" @click="goToPayment">결제하기</button>
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
            ticket : {
                ticket_date: {},
                ticket_total_price: {},
            }
        };
    },

    created() {
        this.getTicket();
        // this.getTitle();
    },

    computed: {
        formattedDate() {
            // ticket_date를 문자열로 변환 후 'T'로 분리
            const dateString = String(this.ticket.ticket_date);

            // 날짜부분만 추출
            if (dateString) {
            return dateString.split('T')[0];
        } else {
            return console.error('error');
        }
        },
        formattedTotalPrice() {
            // 금액을 문자열로 변환
            const priceString = this.ticket.ticket_total_price.toString();

            // 정규 표현식을 사용하여 쉼표 추가
            return priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    },

    methods: {
        async getTicket() {
            try {
                const ticket_no = this.$route.params.ticket_no; // 여기서 사용할 떄, 보내준 곳이 있어야 됨
                console.log('티켓넘버 보냄?', ticket_no);
                const response = await axios.get(`http://localhost:3000/movie/payment/${ticket_no}`);
                console.log('티켓데이터 보냄?', response.data);
                this.ticket = response.data[0];
                console.log('response.data:', response.data[0]);

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

        async requestPay() {
            if (!this.how) {
                alert('결제 수단을 선택해주세요.');
                return;
            } 
            try {
                const response = await axios.post(`http://localhost:3000/movie/initiatePayment`, {
                    // 필요한 결제 정보를 서버로 전송
                    ticket_no: this.ticket.ticket_no,
                    movie_title: this.ticket.movie_title,
                    ticket_cnt: this.ticket.ticket_cnt,
                    ticket_total_price: this.ticket.ticket_total_price,
                    how: this.how,
                });

                const paymentData = response.data;
                // 이니시스 결제 페이지로 리다이렉트
                window.location.href = paymentData.paymentUrl; // paymentUrl : 서버에서 받은 결제 페이지 URL
            } catch (error) {
                console.error('결제 요청 오류:', error);
            }
        }
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
    margin-bottom: 150px;
    margin-left: 30px;
}

.select-pay h3 {
    text-shadow: 2px 2px 5px rgba(224, 138, 33, 0.6);
}

.payment-btn{
    padding: 10px 20px;
    background-color: #e9ec8d;
    border: none;
    cursor: pointer;
    margin-top: 70px;
    position: absolute;
    bottom: 0px; /* 하단에서의 거리 */
    left: 50%;
    transform: translateX(-50%); /* 가로 방향 중앙 정렬 */
}

.account-info {
    font-size: x-small;
    color: rgb(149, 147, 147);
}
</style>