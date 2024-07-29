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
                        <tr class="user-all-list" v-for="(user, i) in pageSelectUser" :key="i">
                            <th class="user-number value">{{ user.user_no }}</th>
                            <th class="user-gender value">{{ user.user_gender }}</th>
                            <th class="user-name value">{{ user.user_name }}</th>
                            <th class="user-age value">{{ new Date(user.user_age).toISOString().split('T')[0] }}</th>
                            <th class="user-grade value">{{ getUserGrade(user.user_grade) }}</th>
                            <th class="user-address value">{{ user.user_point }}포인트</th>
                            <th><select class="user-grade-update btn" @change="updateUserGrade(user.user_no, $event)">
                                <option disabled selected>변경</option>
                                <option value = 1>브론즈</option>
                                <option value = 2>실버</option>
                                <option value = 3>골드</option>
                                <option value = 4>플래티넘</option>
                            </select></th>
                            <th><button type="button" class="user-delete btn" @click="goToDelete(user.user_no)">삭제</button></th>
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
            selectUser: [],
            updateUser: [],
            deleteUser: [],

            // 페이징
            pageSelectUser: [], // 한 페이지에 보여줄 유저리스트를 잘라 담을 새 리스트
            pageNum: 0,
            pageCnt: 0,
            onePageCnt: 10,
        };
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
                this.pageCnt = Math.ceil(this.selectUser.length / this.onePageCnt)
                this.setPage(1)
            });
        },

        setPage(page) {
            this.pageNum = page - 1;
            this.sliceList();
        },

        sliceList() {
            const start = 0 + this.pageNum * this.onePageCnt;
            this.pageSelectUser = this.selectUser.slice(start, start + this.onePageCnt);
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
                    window.location.href = `http://localhost:8081/admin/userlist`;
                })
                .catch(() => {
                    console.error('error'); 
                });
            } else {
                window.location.href = `http://localhost:8081/admin/userlist`;
            }
        },

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
                    window.location.href = `http://localhost:8081/admin/userlist`;
                })
                .catch(() => {
                    console.error('error');
                });
            } else {
                window.location.href = `http://localhost:8081/admin/userlist`;
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