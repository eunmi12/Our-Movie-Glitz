<template>
    <div style="display: flex;">
    <AdminpageSidebar />
        <div class="notice-main">
            <h1>공지사항 관리</h1>
            <div class="notice-list" style="width: 100%; display: flex; flex-direction: column;">
                <table>
                    <thead>
                        <tr class="notice-title">
                            <th class="user-number">공지 번호</th>
                            <th class="user-gender">공지 제목</th>
                            <th class="user-gender">공지 작성일</th>
                            <th class="user-gender">공지 조회수</th>
                        </tr>
                    </thead>
                    <tbody v-if="noticeList.length > 0">
                        <tr class="user-all-list" v-for="(notice, i) in noticeList" :key="i">
                            <th class="user-number value">{{ notice.notice_no }}</th>
                            <th class="user-gender value">{{ notice.notice_title }}</th>
                            <th class="user-gender value">{{ new Date(notice.notice_date).toISOString().split('T')[0] }}</th>
                            <th class="user-gender value">{{ notice.notice_cnt }}</th>
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
            noticeList:[],
        };
    },

    mounted() {
        this.AllSelectUser();
    },

    methods: {
        AllSelectUser() {
            axios({
                url: `http://localhost:3000/admin/noticelist`,
                method: "get",
            }).then((results) => {
                // console.log(results);
                this.noticeList = results.data;
            });
        },

    }

}
</script>

<style scoped>
.notice-main {
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

.notice-main h1 {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 30px;
}

.notice-title {
    border-bottom: 1px solid #d4cdcd;
    height: 57px;
    font-size: large;
    color: #292828;
    text-align: center;
    background-color: #ffffff;
    padding-bottom: 30px; /* 추가 */
}

.user-number {
    width: 10%;
}

.user-gender {
    width: 10%;
}

.user-name {
    width: 10%;
}

.user-age {
    width: 15%;
}

.user-grade {
    width: 15%;
}

.user-point {
    width: 15%;
}

.user-grade-update {
    width: 15%;
}

/* .user-delete {
    width: 10%;
} */

.user-all-list {
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
</style>