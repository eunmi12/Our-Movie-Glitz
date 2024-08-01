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
                        <li>영화 제목: </li>
                        <li>상영 날짜: </li>
                        <li>상영 시간: </li>
                        <li>상영관: </li>
                        <li>인원 수: </li>
                        <li>좌석번호: </li>
                    </ul>
                </div>
                <div class="discount">
                    <h3>할인쿠폰</h3>
                    <span class="discount-coupon">할인쿠폰 적용</span>
                    <select id="select-coupon">
                        <option>{{ mycoupon }}</option>
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
        };
    },

    created() {
        this.getTicket();
    },

    methods: {
        async getTicket() {
            try {
                const tiket_no = this.$route.params.ticket_no;
                const results = await axios.get(
                    `http://localhost:3000/movie/payment/${ticket_no}`
                );
                this.ticket = results.data[0];
            } catch (error) {
                console.error(error);
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