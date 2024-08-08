<template>
    <div style="display: flex;">
    <AdminpageSidebar />
        <div class="notice-main">
            <h1>쿠폰 관리</h1>
            <div class="notice-list" style="width: 100%; display: flex; flex-direction: column;">
                <table>
                    <thead>
                        <tr class="notice-title">
                            <th class="user-number">쿠폰 번호</th>
                            <th class="user-gender">쿠폰 제목</th>
                            <th class="user-gender">쿠폰 시작일</th>
                            <th class="user-gender">쿠폰 마감일</th>
                            <th class="user-gender">삭 제</th>
                        </tr>
                    </thead>
                    <tbody v-if="couponList.length > 0">
                        <tr class="user-all-list" v-for="(coupon, i) in pagingData" :key="i">
                            <th class="user-number value">{{ i + 1 + (currentPage - 1) * itemsPerPage}}</th>
                            <th class="user-gender value">{{ coupon.coupon_title }}</th>
                            <th class="user-gender value">{{ new Date(coupon.coupon_startdate).toISOString().split('T')[0] }}</th>
                            <th class="user-gender value">{{ new Date(coupon.coupon_enddate).toISOString().split('T')[0] }}</th>
                            <th><button class="update" @click="deletecoupon(coupon.coupon_no)">삭 제</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br>
            <div class="pagination">
                <ul class="number_box">
                    <li @click="prevPageGroup" :class="{disabled: currentPageGroup === 1}"><img src="../images/prev.png"/></li>
                    <li v-for="page in currentGroupPages" :key="page" @click="changePage(page)" :class="{active: page === currentPage}">
                    {{ page }}</li>
                    <li @click="nextPageGroup" :class="{disabled: currentPageGroup === pageGroups.length}"><img src="../images/next.png"/></li>
                </ul>
            </div>
            <div class="btn_container">
                <button class="insertbtn" @click="insertCoupon">쿠폰 등록</button>
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
            couponList:[],
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
            return this.couponList.slice(start,end);
        },
        totalPages(){
            return Math.ceil(this.couponList.length / this.itemsPerPage);
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
                url: `http://localhost:3000/admin/couponlist`,
                method: "post",
            }).then((results) => {
                // console.log(results);
                this.couponList = results.data;
            });
        },

        insertCoupon(){
            this.$router.push('/admin/createcoupon');
        },

        //쿠폰 삭제
        async deletecoupon(coupon_no){
            const result = await this.$swal({
                    title: '쿠폰을 삭제하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: '확인',
                    cancelButtonText: '취소'
            })
            if(result.isConfirmed){axios({
                url: `http://localhost:3000/admin/deletecoupon`,
                method: 'post',
                data: {coupon_no : coupon_no}
            })
            .then((result) => {
                this.coupon_no = result.data;
                this.$router.go(0);
            })
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
    background-color: #ff2323b2;
    border-radius: 5px;
    cursor: pointer;
    /* margin-right: 10px; */
}
.update:hover{
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: #ffffff;
    background-color: #000000;
    border-radius: 5px;
    cursor: pointer;
    /* margin-right: 10px; */
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