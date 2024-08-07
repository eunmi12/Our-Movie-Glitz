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
                        <li>예매자 이름 : {{ this.ticket.user_name }}</li>
                        <li>휴대폰 번호 : {{ this.ticket.user_phone }}</li>
                        <li>영화 제목 : {{ this.ticket.movie_title }}</li>
                        <li>상영 날짜 : {{ formattedDate }}</li>
                        <li>상영 시간 : {{ this.ticket.ticket_time }}</li>
                        <li>상영관 : {{ this.ticket.ti_se_cinema_no }}관</li>
                        <li>인원 수 : {{ this.ticket.ticket_cnt }}</li>
                        <li>좌석번호 : {{ this.ticket.ticket_seat }}</li>
                        <li>티켓 금액 : {{ formattedTotalPrice }}원</li>
                    </ul>
                </div>
                <div class="discount">
                    <h3>할인쿠폰</h3>
                    <span class="discount-coupon">할인쿠폰 적용</span>
                    <select id="select-coupon" v-model="selectedCoupon" @change="applyCoupon">
                        <option v-for="coupon in coupons" :key="coupon" :value="coupon.uc_coupon_no" >{{ getCouponLabel(coupon.uc_coupon_no) }}</option>
                        <!-- 반복문에서 coupons에 있는 것을 coupon으로 받았으므로 coupon.~~ 맞음 -->
                    </select>
                </div>
                <div class="price">
                    <h3>최종 결제금액</h3>
                    <!-- {{ this.finalPrice }}원 -->
                      {{ formattedFinalPrice }}원
                </div>
                <div class="select-pay">
                    <h3>결제수단 선택</h3>
                    <div>
                        <input id="payment-by-card" name="how" type="radio" value="card" v-model="how" />
                        <label for="how-card" @click="requestPay">신용카드</label>
                    </div>
                    <div>
                        <input id="payment-by-cash" name="how" type="radio" value="cash" v-model="how" @change="handleCashPayment" />
                        <label for="how-cash">무통장입금</label>
                    </div>
                    <div class="account-info">
                        계좌번호: (이젠은행)111-2222-33333
                    </div>
                </div>
                <div>
                    <button class="payment-btn" @click="requestPay()">결제하기</button>
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
            user_no: this.$store.state.user.user_no,
            how: null,
            movie_title: {},
            ticket : {
                ticket_date: {},
                ticket_total_price: {}, // 전체 결제금액 (할인쿠폰이 있다면 사용하기 전)
                uc_coupon_no: [],
            },
            coupons: [],
            selectedCoupon: null,
            finalPrice: 0,
        };
    },

    created() {
        this.getTicket();
        // this.getTitle();
        this.fetchCoupons(); // 컴포넌트 생성 시 쿠폰 데이터 가져오기
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
        },
        formattedFinalPrice() {
            const finalPriceString = this.finalPrice.toString();
            return finalPriceString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

        async fetchCoupons() {
            try {
                // this.ticket.uc_coupon_no를 사용해 쿠폰 목록을 요청
                const response = await axios.post(`http://localhost:3000/movie/getCoupons`, {
                    couponIds: this.$store.state.user.user_no,
                });
                this.coupons = response.data; // 쿠폰 데이터를 저장
                console.log('쿠폰뭐잇냐', response);
            } catch (error) {
                console.error('쿠폰 정보 불러오기 오류:', error);
            }
        },
        applyCoupon() {
            // 선택된 쿠폰 ID를 확인
            console.log('선택된 쿠폰:', this.selectedCoupon);
            this.applySelectedCoupon();
        },
        async applySelectedCoupon() {
            try {
                // 선택된 쿠폰에 따른 할인 금액 계산
                const discount = this.calculateDiscount(this.selectedCoupon);
                // 전체 결제 금액에서 할인 금액 차감
                this.finalPrice = this.ticket.ticket_total_price - discount;
                console.log(this.finalPrice);

                const response = await axios.post(`http://localhost:3000/movie/applyCoupon`, {
                    couponId: this.selectedCoupon,
                    ticketId: this.ticket.ticket_user_no,
                    finalPrice: this.finalPrice // 할인 적용된 최종 금액
                });

                if(response.status === 200) {
                    alert('쿠폰이 적용되었습니다.');
                } else {
                    alert('쿠폰 적용에 실패했습니다.');
                }
            } catch (error) {
                console.error('쿠폰 적용 오류', error);
                alert('쿠폰 적용 중 오류 발생');
            }
        },
        calculateDiscount(couponNo) {
            // 쿠폰 번호에 따른 할인 금액을 반환하는 메서드
            const couponDiscounts = {
                1: 5000, // 신규가입 쿠폰 할인 금액
                2: 15000 // 등업 쿠폰 할인 금액
            };
            return couponDiscounts[couponNo] || '알 수 없는 쿠폰';
        },

        getCouponLabel(couponNo) {
            // 쿠폰 번호에 따른 라벨을 반환하는 메서드
            const couponLabels = {
                1: '신규가입 쿠폰',
                2: '등업 쿠폰'
            };
            return couponLabels[couponNo] || '알 수 없는 쿠폰';
        },
        // async requestPay() {
        //     if (!this.how) {
        //         alert('결제 수단을 선택해주세요.');
        //         return;
        //     } 
        //     try {
        //         const response = await axios.post(`http://localhost:3000/movie/initiatePayment`, {
        //             // 필요한 결제 정보를 서버로 전송
        //             ticket_no: this.ticket.ticket_no,
        //             movie_title: this.ticket.movie_title,
        //             ticket_cnt: this.ticket.ticket_cnt,
        //             ticket_total_price: this.ticket.ticket_total_price,
        //             how: this.how,
        //         });

        //         const paymentData = response.data;
        //         // 이니시스 결제 페이지로 리다이렉트
        //         window.location.href = paymentData.paymentUrl; // paymentUrl : 서버에서 받은 결제 페이지 URL
        //     } catch (error) {
        //         console.error('결제 요청 오류:', error);
        //     }
        // }
        requestPay() {
            // if (!this.validationCheck()) {
            //     return;
            // } else if (!this.how) {  
            //     alert('결제 수단을 선택해주세요.');
            //     return;
            // } else if (this.how === 'card') {
            //     return true;
            // }
                // this.getTicket();

            let amount;
            let name;
            // let count;

            amount = this.ticket.ticket_total_price
            // console.log(amount);
            name = this.ticket.movie_title
            // console.log(name);
            // count = this.ticket.ticket_cnt

            // 결제데모를 사용 시 실제로 결제가 되기 때문에 앞쪽으로 빼놓음 (?)
            axios({
                url: "http://localhost:3000/movie/orderPay",
                method: "POST",
                data: {
                    // 필요한 결제 정보를 전송
                    // ticket_no: this.ticket.ticket_no,
                    order_nm: this.ticket.movie_title,
                    order_cnt: this.ticket.ticket_cnt,
                    order_price: this.ticket.ticket_total_price,
                    // how: this.how,
                    // user_name: this.ticket.user_name,
                    order_phone: this.ticket.user_phone,
                    // order_coupon: this.user_coupon,
                    user_no: this.$store.state.user.user_no,
                }
            })
            .then(() => {
                alert('영화예약이 완료되었습니다.');
            })

            const IMP = window.IMP;
            // window.INP = window.IMP || {};
            IMP.init("imp17750140"); // 준혁님 이니시스 api 키

            IMP.request_pay({ // 아임포트에서 지정된 키 (request_pay : 내가 지정한게 아님. 공식임)
                pg: "html5_inicis",
                pay_method: "card",
                name: name,
                amount: amount,
                buyer_name: this.ticket.user_name,
                buyer_tel: this.ticket.user_phone,
                // buyer_addr: '',
                // buyer_postcode: '',
            },
        (rsp) => {

            if (rsp.success) {
                console.log(rsp);
                axios ({
                    url: "http://localhost:3000/movie/orderPay",
                    method: "POST",
                    data: {
                        // ticket_no: this.ticket.ticket_no,
                        order_nm: this.ticket.movie_title,
                        order_cnt: this.ticket.ticket_cnt,
                        order_price: this.ticket.ticket_total_price,
                        // how: this.how,
                        // user_name: this.ticket.user_name,
                        order_phone: this.ticket.user_phone,
                        // order_coupon: this.user_coupon,
                        user_no: this.$store.state.user.user_no,
                    }
                })
                .then(() => {
                    alert('영화예매가 완료되었습니다');
                    window.location.href = "http://localhost:8081/";
                })
            }
        })

        },

        async handleCashPayment() {
            if (this.how === 'cash') {
                const confirmMessage = '무통장입금 결제하시겠습니까?';
                if (window.confirm(confirmMessage)) {
                    try {
                        // 결제 정보를 db로 전송
                        const results = await axios.post(`http://localhost:3000/movie/orderPay`, {
                            // 결제 정보 객체 구성
                            payment_type: 0,
                            // ticket_no: this.ticket.ticket_no,
                            order_nm: this.ticket.movie_title,
                            order_cnt: this.ticket.ticket_cnt,
                            order_price: this.ticket.ticket_total_price,
                            // how: this.how,
                            // user_name: this.ticket.user_name,
                            order_phone: this.ticket.user_phone,
                            // order_coupon: this.user_coupon,
                            user_no: this.$store.state.user.user_no
                        });
                        
                        // console.log('결과요결과', results);
                        if (results.status === 200) {
                            // 결제 정보 전송 성공하면 메인페이지로 이동
                            alert ('예매완료. 30분 이내에 입금하지 않을시 예매 취소됨.');
                            this.$router.push({ name: 'MainPage' });
                        } else {
                            alert('다시 시도해주세요.');
                        }
                    } catch (error) {
                        console.error('결제 정보 전송 오류:', error);
                        alert('다시 시도해주세요.');
                    }
                    // 확인 클릭하면 메인 페이지로 이동
                    // alert ('30분 이내에 결제해주세요.');
                    // this.$router.push({ name: 'MainPage' });
                } else {
                    // 취소 클릭하면 현재 페이지에 머무름
                    this.how = null;
                }
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

.price {
    margin-bottom: 70px;
    margin-left: 30px;
}

.price h3 {
    text-shadow: 2px 2px 5px rgba(224, 138, 33, 0.6);
}

.select-pay {
    margin-bottom: 170px;
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
    bottom: -200px; /* 하단에서의 거리 */
    left: 50%;
    transform: translateX(-50%); /* 가로 방향 중앙 정렬 */
}

.account-info {
    font-size: x-small;
    color: rgb(149, 147, 147);
}
</style>