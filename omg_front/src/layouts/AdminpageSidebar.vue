<template>
    <div class="adminpage-bar">
        <h3 class="title_text">관리자 페이지</h3>
        <div class="adminpage_nav">
            <ul>
                <li>
                    <span @click="goToMovie">• 영화 등록</span>
                </li>
                <li>
                    <span @click="goToCinema">• 상영 관리</span>
                </li>
                <li>
                    <span @click="goToUser">• 회원 관리</span>
                </li>
                <li>
                    <span @click="goToCoupon">• 쿠폰 관리</span>
                </li>
                <li>
                    <span @click="gotoreview">• 관람평 관리</span>
                </li>
                <li>
                    <span @click="goToEvent">• 이벤트 관리</span>
                </li>
                <li>
                    <span @click="gotonotice">• 공지사항 관리</span>
                </li>
                <li>
                    <span @click="goToFAQ">• FAQ 관리</span>
                </li>
                <li>
                    <span @click="gotoqna">• 1:1 문의 관리</span>
                </li>
                <li>
                    <span @click="goToStatus">• 예매 현황</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
           
        };
    },
    methods: {
        goToUser() {
            this.$router.push({
                path: '/admin/userlist'
            });
        },
        goToStatus() {
            this.$router.push({
                path: '/admin/statics'
            });
        },
        gotoreview() {
            this.$router.push({
                path: '/admin/reviewlist'
            });
        },
        goToCinema() {
            this.$router.push({
                path: '/admin/cinema'
            })
        },
        goToMovie() {
            this.$router.push({
                path: '/admin/movie'
            })
        },
        gotonotice() {
            this.$router.push({
                path: '/admin/notice'
            })
        },
        goToEvent() {
            this.$router.push({
                path: '/admin/eventList'
            })
        },
        goToCoupon(){
            this.$router.push({
                path: '/admin/coupon'
            });
        },
        goToFAQ() {
            this.$router.push({
                path: '/admin/Faq'
            })
        },
        gotoqna() {
            this.$router.push({
                path: '/admin/qnalist'
            })
        }
    }
}
</script>

<style scoped>
.adminpage-bar {
  height: 100%;
  width: 10%;
  position: sticky;
  top: 30px; /* 스크롤 시 고정될 위치 */
  background-color: rgb(255, 255, 255);
  margin: 80px 2% 0 5%;
  min-height: 250px;
}

.title_text {
  padding: 0 0 14px 10px;
  border-bottom: 1px solid #ececec;
  text-align: left;
}

.adminpage_nav>ul {
  margin: 7px 0 0 0;
}

.adminpage_nav>ul>li {
  text-align: left;
  padding-bottom: 20px;
}

.adminpage_nav>ul>li:nth-child(1) {
  padding-top: 15px;
}

span {
    cursor: pointer;
}

</style>