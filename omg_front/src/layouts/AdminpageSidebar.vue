<template>
    <div class="adminpage-bar">
        <h3 class="title_text">관리자 페이지</h3>
        <div class="adminpage_nav">
            <ul>
                <li>
                    <span @click="goToUser">• 회원관리</span>
                </li>
                <li>
                    <span @click="goToStatus">• 예매현황</span>
                </li>
                <li>
                    <span @click="goToReview">• 관람평 관리</span>
                </li>
                <li>
                    <span @click="goToCinema">• 상영 관리</span>
                </li>
                <li>
                    <span @click="goToMovie">• 영화 관리</span>
                </li>
                <li>
                    <span @click="goToTicket">• 예매 관리</span>
                </li>
                <li>
                    <span @click="goToHelp">• 공지사항 관리</span>
                </li>
                <li>
                    <span @click="goToEvent">• 이벤트 관리</span>
                </li>
                <li>
                    <span @click="goToFAQ">• FAQ 관리</span>
                </li>
                <li>
                    <span @click="goToQNA">• 1:1 문의 사항</span>
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
                path: '/admin/'
            });
        },
        goToReview() {
            this.$router.push({
                path: '/admin/'
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
        goToTicket() {
            this.$router.push({
                path: '/admin/'
            });
        },
        goToHelp() {
            this.$router.push({
                path: '/admin/notice'
            })
        },
        goToEvent() {
            this.$router.push({
                path: '/admin/eventList'
            })
        },
        goToFAQ() {
            this.$router.push({
                path: '/admin/Faq'
            })
        },
        goToQNA() {
            this.$router.push({
                path: '/admin/'
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