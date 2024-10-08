<template>
    <div style="display: flex;">
    <AdminpageSidebar />
        <div class="notice-main">
            <h1>공지사항 관리</h1>
            <div class="notice-list" style="width: 100%; display: flex; flex-direction: column;">
                <table>
                    <thead>
                        <tr class="notice-title" v-if="noticeList.length > 0">
                            <th class="user-number">공지 번호</th>
                            <th class="user-gender">공지 제목</th>
                            <th class="user-gender">공지 작성일</th>
                            <th class="user-gender">공지 조회수</th>
                            <th class="user-gender">수 정</th>
                            <th class="user-gender">삭 제</th>
                        </tr>
                        <tr class="non-notice" v-else> 공지사항을 작성해주세요</tr>
                    </thead>
                    <tbody v-if="noticeList.length > 0">
                        <tr class="user-all-list" v-for="(notice, i) in pagingData" :key="i">
                            <th class="user-number value" @click="gotonotice(notice.notice_no)">{{ i + 1 + (currentPage - 1) * itemsPerPage}}</th>
                            <th class="user-gender value" @click="gotonotice(notice.notice_no)">{{ notice.notice_title }}</th>
                            <th class="user-gender value">{{ new Date(notice.notice_date).toISOString().split('T')[0] }}</th>
                            <th class="user-gender value">{{ notice.notice_cnt }}</th>
                            <th><button class="update" @click="updateNotice(notice.notice_no)">수 정</button></th>
                            <th><button class="delete" @click="deleteNotice(notice.notice_no)">삭 제</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br>
            <div v-if="noticeList.length > 0" class="pagination">
                <ul class="number_box">
                    <li @click="prevPageGroup" :class="{disabled: currentPageGroup === 1}"><img src="../images/prev.png"/></li>
                    <li v-for="page in currentGroupPages" :key="page" @click="changePage(page)" :class="{active: page === currentPage}">
                    {{ page }}</li>
                    <li @click="nextPageGroup" :class="{disabled: currentPageGroup === pageGroups.length}"><img src="../images/next.png"/></li>
                </ul>
            </div>
            <div class="btn_container">
                <button class="insertbtn" @click="insertNotice">공지사항 작성</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import AdminpageSidebar from "../layouts/AdminpageSidebar.vue";
import Swal from "sweetalert2";

export default {
    components: {
        AdminpageSidebar
    },

    data() {
        return {
            noticeList:[],
            //페이징용
            currentPage:1,
            itemsPerPage:5,
            currentPageGroup: 1,
        };
    },
    computed:{
        //페이징
        pagingData(){
            const start = (this.currentPage -1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.noticeList.slice(start,end);
        },
        totalPages(){
            return Math.ceil(this.noticeList.length / this.itemsPerPage);
        },
        pageGroups(){
            const groups = [];
            for (let i = 1; i<=this.totalPages; i +=10){
                groups.push({
                    start: i,
                    end: Math.min(i+9, this.totalPages),
                });
            }
            return groups;
        },
        currentGroupPages(){
            const group = this.pageGroups[this.currentPageGroup - 1];
            if(group){
                return Array.from({ length: group.end - group.start + 1}, (_, i) => group.start + i);
            }
            return[];
        }
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
        insertNotice(){
            this.$router.push('/admin/createnotice');
        },
        updateNotice(notice_no){
            axios({
                url: `http://localhost:3000/admin/notice/${notice_no}`,
                method: 'post',
                data: {notice_no : notice_no}
            }).then((result) => {
                this.notice_no = result.data;
            })
            this.$router.push(`/admin/notice/${notice_no}`);
        },
        gotonotice(notice_no){
            this.$router.push(`/help/notice/${notice_no}`)
        },
        async deleteNotice(notice_no){
            console.log("notice_no", notice_no);
            try {
        // 사용자가 삭제를 확인하는 Swal 팝업을 표시
        const result = await Swal.fire({
            title: '정말 삭제하시겠습니까?',
            text: "이 작업은 취소할 수 없습니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
        });

        // 사용자가 확인 버튼을 클릭한 경우
        if (result.isConfirmed) {
            const response = await axios.post(`http://localhost:3000/admin/deletenotice`,{notice_no : notice_no});
            console.log("공지사항 삭제 성공", response.data);
            await Swal.fire('삭제 완료', '공지사항이 삭제되었습니다.', 'success');
            window.location.reload(); // Swal 닫히면 reload 실행하기 위해 then으로 promise 씀
        } else {
            // 사용자가 취소 버튼을 클릭한 경우
            await Swal.fire('취소됨', '공지사항 삭제가 취소되었습니다.', 'info');
        }
    } catch (error) {
        console.error('삭제 도중 에러 발생', error);
        await Swal.fire('오류', '공지사항 삭제 중 문제가 발생했습니다.', 'error');
    }
},
        //페이징
        changePage(page){
            if(page > 0 && page <= this.totalPages){
                this.currentPage = page;
            }
        },
        prevPage(){
            if(this.currentPage > 1 ){
                this.changePage(this.currentPage - 1);
            }
        },
        nextPage(){
            if(this.currentPage < this.totalPages) {
                this.changePage(this.currentPage + 1);
            }
        },
        prevPageGroup(){
            if(this.currentPageGroup > 1){
                this.currentPageGroup--;
                this.changePage(this.pageGroups[this.currentPageGroup - 1 ].start);
            }
        },
        nextPageGroup(){
            if(this.currentPageGroup < this.pageGroups.length){
                this.currentPageGroup ++;
                this.changePage(this.pageGroups[this.currentPageGroup - 1].start)
            }
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
.non-notice{
    display: block;
    margin-top:70px;
    font-size:36px;
    text-align: center;
    height: 100px;
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
.update{
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: white;
    background-color: #aaaaaa;
    border-radius: 5px;
    cursor: pointer;
    /* margin-right: 10px; */
}
.update:hover{
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: #aaaaaa;
    background-color: rgb(193, 192, 192);
    border-radius: 5px;
    cursor: pointer;
    /* margin-right: 10px; */
}
.delete{
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: white;
    background-color: #db1919;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}
.delete:hover{
    color: #db1919;
    background-color: #ffeeee;
}
.btn_container{
     display: flex;
    justify-content: flex-end;
    padding-top: 20px; /* 추가 */
}
.insertbtn{
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 10px;
    background-color: #f0eeda;
    color: black;
    border: 1px solid #f0eeda;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
    margin-left:auto;
}
.insertbtn:hover{
   background-color: #ffffff;
    color: #32851e;
    box-shadow: 0 4px 8px rgba(23, 88, 42, 0.5);
    margin-left:auto;
}

/*페이징 */
.pagination {
    width: 100%;
    text-align: center;
    padding-top: 10px;
    display: flex;
    justify-content: center;
}

.pagination .number_box {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
}

.number_box li {
    width: 25px;
    height: 25px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.number_box li.active {
    background-color: #f0eeda;
    border-radius: 5px;
    color: black;
}

.number_box img {
    width: 15px;
    padding-bottom: 5px;
}
</style>