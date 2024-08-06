<template>
    <div style="display: flex;">
    <AdminpageSidebar />
        <div class="qna-management">
            <h1>1:1 문의 관리</h1>
            <div class="qna-list" style="width: 100%; display: flex; flex-direction: column;">
                <div class="qna-sort">
                    <select class="sort-dropdown" v-model="sortorder" @change="sortqnalist">
                        <option value="">전체</option>
                        <option value="none">미답변</option>
                        <option value="clear">답변완료</option>
                    </select>
                    <select class="sort-dropdown" v-model="typefilter" @change="sortqnalist">
                        <option value="">전체</option>
                        <option value="0">예매</option>
                        <option value="1">이벤트</option>
                        <option value="2">멤버십</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr class="qnalist-title">
                            <th class="qna-type">문의유형</th>
                            <th class="qna-title">제목</th>
                            <th class="qna-user">작성자</th>
                            <th class="qna-date">작성일</th>
                            <th class="qna-status">답변상태</th>
                            <th class="qna-control">답변작성/삭제</th>
                        </tr>
                    </thead>
                    <tbody v-if="filteredqnalist.length > 0">
                        <tr class="qnalist-value" v-for="(qna, i) in pagingData" :key="i">
                            <th class="type-value">{{ getqnatype(qna.qna_type) }}</th>
                            <th class="title-value">{{ qna.qna_title }}</th>
                            <th class="user-value">{{ qna.user_name }}</th>
                            <th class="date-value">{{ new Date(qna.qna_date).toISOString().split('T')[0] }}</th>
                            <th class="status-value" v-if="qna.qna_answer == null">미답변</th>
                            <th class="status-value" v-else>답변완료</th>
                            <th class="control-value">
                                <button v-if="qna.qna_answer == null" class="write-btn btn" @click="gotowrite(qna.qna_no)">답변작성</button>
                                <button v-else class="delete-btn btn" @click="gotodelete(qna.qna_no)">답변삭제</button>
                            </th>
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
            currentPage:1,
            itemsPerPage:10,
            currentPageGroup: 1,
            qnalist: [],
            sortorder: '',
            typefilter: ''
        };
    },
    computed:{
        filteredqnalist() {
            let filteredlist = this.qnalist;

            if (this.sortorder) {
                filteredlist = filteredlist.filter(qna => {
                    return this.sortorder === 'none' ? qna.qna_answer === null : qna.qna_answer !== null;
                });
            }

            if (this.typefilter) {
                filteredlist = filteredlist.filter(qna => qna.qna_type === parseInt(this.typefilter));
            }

            return filteredlist;
        },
        pagingData(){
            const start = (this.currentPage -1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredqnalist.slice(start,end);
        },
        totalPages(){
            return Math.ceil(this.filteredqnalist.length / this.itemsPerPage);
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
        this.getqnalist();
    },
    methods: {
        getqnalist() {
            axios({
                url: `http://localhost:3000/admin/qnalist`,
                method: "POST",
            }).then((results) => {
                this.qnalist = results.data;
                });
        },
        getqnatype(type) {
            const type_name = {
                0: '예매',
                1: '이벤트',
                2: '멤버십'
            };
            return type_name[type] || 'Unknown';
        },
        sortqnaList() {
            this.currentPage = 1;
        },
        gotodelete(qna_no){
            axios({
                url: "http://localhost:3000/admin/deleteqna",
                method: "POST",
                data: {
                    qna_no: qna_no
                }
            }).then(() => {
                this.$swal('답변이 삭제되었습니다');
                this.getqnalist();
                window.location.reload();
            })
        },
        gotowrite(qna_no) {
            this.$router.push(`/admin/createqna/${qna_no}`);
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

.qna-management {
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

.qna-management h1 {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 30px;
}

.qna-sort {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    margin-top: 20px;
}

.sort-dropdown {
    margin-right: 10px;
    padding: 5px;
    border-radius: 10px;
    text-align: center;
}

.qnalist-title {
    border-bottom: 1px solid #d4cdcd;
    height: 57px;
    font-size: large;
    color: #292828;
    text-align: center;
    background-color: #ffffff;
    padding-bottom: 30px;
}

.qna-type {
    width: 10%;
}

.qna-title {
    width: 10%;
}

.qna-user {
    width: 10%;
}

.qna-date {
    width: 15%;
}

.qna-status {
    width: 15%;
}

.qna-control {
    width: 15%;
}

.qnalist-value {
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
    color: black;
    padding: 7px 0;
    font-weight: 600;
    font-size: medium;
}

.btn:hover {
    background-color: rgb(162, 170, 178);
    color: black;
}

.write-btn {
    background-color: greenyellow;
}

.delete-btn {
    background-color: red;
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

</style>