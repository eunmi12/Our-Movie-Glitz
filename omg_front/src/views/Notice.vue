<template>
  <div class="notice">
    <h6>공지사항</h6>
    <div class="notice-box">
    <div class="notice-value">
        <div class="notice-title">
            <h4>{{ notice.notice_title }}</h4>
        </div>
        <div class="notice-datenview">
            <!-- <span>작성일 : {{ new Date(notice.notice_date).toISOString().split('T')[0] }}</span><span>조회수 : {{ notice.notice_cnt }}</span> -->
        </div>
        <div class="notice-cont">
            <span>{{ notice.notice_coment }}</span>
        </div>
    </div>
    <div class="btn">
        <button class="back" @click="gotoback">목록</button><button class="top">▲Top</button>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            notice: {}
        }
    },
    created() {
        this.getnotice();
    },
    methods: {
        getnotice() {
            const notice_no = this.$route.params.notice_no;
            axios({
                url: `http://localhost:3000/admin/notice/${notice_no}`,
                method: "GET",
            }).then((res) => {
                if (res.data.data && res.data.data.length > 0) {
                    this.notice = res.data.data[0];
                }
                console.log(this.notice);
            }).catch((error) => {
                console.error(error);
            });
        },
        gotoback() {
            this.$router.push(`/help/notice`)
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

.notice-box {
    width: 80%;
    margin: auto;
}

.notice-title {
    text-align: left;
}

.notice-datenview {
    text-align: right;
}

.notice-cont {
    text-align: center;
}

.btn {
    float: right;
}

</style>