<template>
    <div style="display: flex;">
    <AdminpageSidebar />
        <div class="user-management">
            <h1>회원관리</h1>
            <div class="user-list" style="width: 100%; display: flex; flex-direction: column;">
                <table>
                    <thead>
                        <tr class="userlist-title">
                            <th class="user-number">회원번호</th>
                            <th class="user-gender">성별</th>
                            <th class="user-name">회원이름</th>
                            <th class="user-age">생년월일</th>
                            <th class="user-grade">회원등급</th>
                            <th class="user-point">포인트</th>
                            <th class="user-grade-update">등급수정</th>
                            <th class="user-delete">삭제</th>
                        </tr>
                    </thead>
                    <tbody v-if="selectUser.length > 0">
                        <tr class="user-all-list" v-for="(user, i) in pagingData" :key="i">
                            <!-- <th class="user-number value">{{ user.user_no }}</th> -->
                            <th class="user-number value">{{ i + 1 + (currentPage - 1) * itemsPerPage }}</th>
                            <th class="user-gender value">{{ user.user_gender }}</th>
                            <th class="user-name value">{{ user.user_name }}</th>
                            <th class="user-age value">{{ new Date(user.user_age).toISOString().split('T')[0] }}</th>
                            <th class="user-grade value">{{ getUserGrade(user.user_grade) }}</th>
                            <th class="user-address value">{{ user.user_point }}포인트</th>
                            <th><select class="user-grade-update-btn btn" @change="updateUserGrade(user.user_no, $event)">
                                <option disabled selected>변경</option>
                                <option value = 1>브론즈</option>
                                <option value = 2>실버</option>
                                <option value = 3>골드</option>
                                <option value = 4>플래티넘</option>
                            </select></th>
                            <th><button type="button" class="user-delete-btn btn" @click="goToDelete(user.user_no)">삭제</button></th>
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
            selectUser: [],
            updateUser: [],
            deleteUser: [],

            // 페이징
            currentPage:1,
            itemsPerPage:10,
            currentPageGroup: 1,
        };
    },
    computed: {
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        pagingData(){
            const start = (this.currentPage -1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.selectUser.slice(start, end);
        },
        totalPages(){
            return Math.ceil(this.selectUser.length / this.itemsPerPage);
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
        },
    },
    mounted() {
        this.AllSelectUser();
    },

    methods: {
        AllSelectUser() {
            axios({
                url: `http://localhost:3000/admin/selectUser`,
                method: "POST",
            }).then((results) => {
                // console.log(results);
                this.selectUser = results.data;
            });
        },
        updateUserGrade(user_n, event) {
            const newGrade = event.target.value;
            if (confirm('정말 등급을 변경하시겠습니까?')) {
                axios({
                    url: `http://localhost:3000/admin/updateUser`,
                    method: "POST",
                    data: {
                        user_no: user_n,
                        user_grade: newGrade,
                    }
                }).then((results) => {
                    console.log(results);
                    this.updateUser = results.data;
                    this.AllSelectUser(); // 등급 업데이트 후 목록을 갱신
                    //mounted로 목록을 갱신하기때문에 windowlocation으로 페이지를 reload 해주지않아도 됨
                    // window.location.href = `http://localhost:8081/admin/userlist`;
                })
                .catch(() => {
                    console.error('error'); 
                });
            } else {
                window.location.href = `http://localhost:8081/admin/userlist`;
            }
        },

        //유저 삭제 메소드 치혁작성 - swal알림창 사용 삭제할때 취소 삭제 선택가능

        // goToDelete(user_n) {
        //     this.$swal({
        //         title: `정말 삭제하시겠습니까?`,
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonText: '삭제',
        //         cancelButtonText: '취소',
        //         reverseButtons: true,
        //     }).then(result => {
        //         if (result.value) {
        //             axios({
        //                 url: `http://localhost:3000/admin/deleteUser`,
        //                 method: "POST",
        //                 data: {
        //                     user_no: user_n
        //                 },
        //             }).then(res => {
        //                 if (res.data.message == '삭제') {
        //                     this.$swal("삭제되었습니다.");
        //                     this.AllSelectUser();
        //                 }
        //             }).catch(() => {
        //                 this.$swal("오류 발생");
        //             });
        //         }
        //     });
        // },

        goToDelete(user_n) {
            if (confirm('정말 삭제하시겠습니까?')) {
                axios({
                    url: `http://localhost:3000/admin/deleteUser`,
                    method: "POST",
                    data: {
                        user_no: user_n,
                    }
                }).then((results) => {
                    // console.log(results);
                    this.deleteUser = results.data;
                    this.AllSelectUser();
                    //mounted로 목록을 갱신하기때문에 windowlocation으로 페이지를 reload 해주지않아도 됨

                    // window.location.href = `http://localhost:8081/admin/userlist`;
                })
                .catch(() => {
                    console.error('error');
                });
            }
        },
        getUserGrade(grade) {
            const grades = {
                1: '브론즈',
                2: '실버',
                3: '골드',
                4: '플래티넘'
            };
            return grades[grade] || 'Unknown'; // grades[grade]가 유효하면 그 값을 반환, 아니면 Unknown을 반환
        },
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
        }
    }

}
</script>

<style scoped>

.user-management {
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

.user-management h1 {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 30px;
}

.userlist-title {
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

.user-delete-btn {
    background-color: red;
}

.user-grade-update-btn {
    background-color: lightgray;
}

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
    border: solid 1px rgb(178, 180, 181);
    border-radius: 5px;
    /* background-color: rgb(162, 170, 178); */
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: bold;
    font-size: medium;
    height: 40px;
}

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

/* .user-grade-update-btn {
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