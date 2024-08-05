<template>
  <div class="notice">
    <h6>공지사항</h6>
    <br><br>
    <div class="notice-box">
    <div class="notice-value">
        <div class="notice-title">
            <h4>{{ notice.notice_title }}</h4>
        </div>
        <div class="notice-datenview">
            <span>작성일 : {{ formattedDate }} &nbsp;</span>
            <span>&nbsp;조회수 : {{ notice.notice_cnt }}</span>
        </div>
        <div class="notice-cont">
            <span>{{ notice.notice_coment }}</span>
        </div>
    </div>
    <div class="notice-btn">
        <button class="back" @click="gotoback">목록</button>
        <button class="top" @click="gototop">▲Top</button>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            formattedDate: '',
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
                    this.formattedDate = new Date(this.notice.notice_date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                }
                console.log(this.notice);
            }).catch((error) => {
                console.error(error);
            });
        },
        gotoback() {
            this.$router.push(`/help/notice`)
        },
        gototop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
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

.notice-box {
    width: 80%;
    margin: auto;
    border: 1px solid gray;
    padding: 20px;
}

.notice-title {
    text-align: left;
    padding-left: 20px;
}

.notice-datenview {
    text-align: right;
    border-bottom: 1px solid gray;
    padding-right: 20px;
    padding-bottom: 10px;
    color: gray;
}

.notice-cont {
    text-align: center;
    padding: 40px 0px 20px 0px;
}

.notice-btn {
    float: right;
    padding-top: 40px;
    padding-right: 20px;
}

.back {
    margin: 10px;
    width: 70px;
    height: 30px;
    border-radius: 5px;
    background-color: ivory;
}

.top {
    width: 70px;
    height: 30px;
    border-radius: 5px;
    background-color: ivory;
}

</style>