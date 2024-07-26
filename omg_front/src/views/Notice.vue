<template>
    <div class="notice">
    <h6>공지사항</h6>
    <div class="notice-list">
      <div class="notice-none" v-if="noticelist.length === 0">공지사항이 없습니다.</div>
      <table v-else>
        <thead>
            <tr class="notice-title">
                <th class="notice-no">글 번호</th>
                <th class="notice-nm">글 제목</th>
                <th class="notice-date">작성일</th>
                <th class="notice-view">조회수</th>
            </tr>
        </thead>
        <tbody>
            <tr class="notice-value" v-for="(notice, i) in noticelist" :key="i">
                <th class="no-value">{{ i + 1 }}</th>
                <th class="nm-value">{{ notice.notice_title }}</th>
                <th class="date-value">{{ new Date(notice.notice_date).toISOString().split('T')[0] }}</th>
                <th class="view-value">{{ notice.notice_cnt }}</th>
            </tr>
        </tbody>
      </table>
    </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            noticelist: []
        };
    },
    created() {
        this.getnoticelist();
    },
    methods: {
        getnoticelist() {
            axios({
                url: `http://localhost:3000/admin/noticelist`,
                method: "GET",
            }).then((results) => {
                this.noticelist = results.data;
                console.log(results);
            }).catch(error => {
                console.error(error);
            });
        }
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

.notice-list {
    width: 95%;
    margin: auto;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
}

.notice-title {
    border-bottom: 1px solid #d4cdcd;
    height: 57px;
    font-size: large;
    color: #292828;
    text-align: center;
    background-color: #ffffff;
    padding-bottom: 30px;
}

.notice-no {
    width: 15%;
}

.notice-nm {
    width: 50%;
}

.notice-date {
    width: 25%;
}

.notice-view {
    width: 15%;
}

.notice-value {
    height: 30px;
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    color: #5d5b5b;
    text-align: center;
    font-weight: 50px;
}

</style>