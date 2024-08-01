<template>
    <div style="display: flex;">
    <AdminpageSidebar />
        <div class="event-management">
            <h1>이벤트관리</h1>
            <div class="event-list" style="width: 100%; display: flex; flex-direction: column;">
                <table>
                    <thead>
                        <tr class="eventlist-title">
                            <th class="event-number">번호</th>
                            <th class="event-name">제목</th>
                            <th class="event-age">시작날짜</th>
                            <th class="event-grade">마감날짜</th>
                            <th class="event-point">조회수</th>
                            <th class="event-delete">삭제</th>
                        </tr>
                    </thead>
                    <tbody v-if="selectevent.length > 0">
                        <tr class="event-all-list" v-for="(event, i) in pageSelectevent" :key="i">
                            <th class="event-number value">{{ event.event_title }}</th>
                            <!-- <th class="event-gender value">{{ event.event_gender }}</th>
                            <th class="event-name value">{{ event.event_name }}</th>
                            <th class="event-age value">{{ new Date(event.event_age).toISOString().split('T')[0] }}</th>
                            <th class="event-grade value">{{ geteventGrade(event.event_grade) }}</th> -->
                            <th><button type="button" class="event-delete btn" @click="goToDelete(event.event_no)">삭제</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import AdminpageSidebar from "../layouts/AdminpageSidebar.vue";

export default {
    components: {
        AdminpageSidebar
    },

    data() {
        return {
            selectevent: [],
            updateevent: [],
            deleteevent: [],

            // 페이징
            pageSelectevent: [], // 한 페이지에 보여줄 유저리스트를 잘라 담을 새 리스트
            pageNum: 0,
            pageCnt: 0,
            onePageCnt: 10,
        };
    },

    mounted() {
        this.AllSelectevent();
    },

    methods: {
        AllSelectevent() {
            axios({
                url: `http://localhost:3000/user/eventlist`,
                method: "POST",
            }).then((results) => {
                // console.log(results);
                this.selectevent = results.data;
                this.pageCnt = Math.ceil(this.selectevent.length / this.onePageCnt)
                this.setPage(1)
            });
        },

        setPage(page) {
            this.pageNum = page - 1;
            this.sliceList();
        },

        sliceList() {
            const start = 0 + this.pageNum * this.onePageCnt;
            this.pageSelectevent = this.selectevent.slice(start, start + this.onePageCnt);
        },
        goToDelete(event_no) {
            if (confirm('정말 삭제하시겠습니까?')) {
                axios({
                    url: `http://localhost:3000/user/eventlist`,
                    method: "POST",
                    data: {
                        event_no: event_no,
                    }
                }).then((results) => {
                    // console.log(results);
                    this.deleteevent = results.data;
                    this.AllSelectevent();
                    window.location.href = `http://localhost:8081/admin/eventlist`;
                })
                .catch(() => {
                    console.error('error');
                });
            } else {
                window.location.href = `http://localhost:8081/admin/eventlist`;
            }
        },

        geteventGrade(grade) {
            const grades = {
                1: '브론즈',
                2: '실버',
                3: '골드',
                4: '플래티넘'
            };
            return grades[grade] || 'Unknown'; // grades[grade]가 유효하면 그 값을 반환, 아니면 Unknown을 반환
        }

    }

}
</script>

<style scoped>
.event-management {
    width: 80%;
    min-width: 80%;
    margin-top: 100px;
    padding: 0 10% 0 5%;
    display: inline-block;
    vertical-align: top;
    overflow-x: auto;
    flex-wrap: nowrap;
    box-sizing: border-box;
}

.event-management h1 {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 30px;
}

.eventlist-title {
    border-bottom: 1px solid #d4cdcd;
    height: 57px;
    font-size: large;
    color: #292828;
    text-align: center;
    background-color: #ffffff;
    padding-bottom: 30px; /* 추가 */
}

.event-number {
    width: 10%;
}

.event-gender {
    width: 10%;
}

.event-name {
    width: 10%;
}

.event-age {
    width: 15%;
}

.event-grade {
    width: 15%;
}

.event-point {
    width: 15%;
}

.event-grade-update {
    width: 15%;
}

/* .event-delete {
    width: 10%;
} */

.event-all-list {
    border-bottom: 1px solid #d4cdcd;
    height: 57px;
    font-size: medium;
    color: #5d5b5b;
    text-align: center;
}

.btn {
    border: none;
    width: 80px;
    border: solid 2px rgb(178, 180, 181);
    border-radius: 5px;
    background-color: rgb(162, 170, 178);
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
    font-size: medium;
}

/* .event-grade-update-btn {
    border: none;
    width: 25%;
    border: solid 2px rgb(178, 180, 181);
    border-radius: 5px;
    background-color: rgb(178, 180, 181);
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
} */
</style>