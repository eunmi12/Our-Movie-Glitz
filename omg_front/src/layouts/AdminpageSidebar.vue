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
                    <span @click="goToTicket">• 예매 관리</span>
                </li>
                <li>
                    <span @click="goToEvent">• 이벤트 관리</span>
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
        goToTicket() {
            this.$router.push({
                path: '/admin/'
            });
        },
        goToEvent() {
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
  position: relative;
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