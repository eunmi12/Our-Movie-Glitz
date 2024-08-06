<template>
    <div class="notice">
    <h6>공지사항</h6>
    <div class="notice-list">
        <div class="notice-sort">
                <select class="sort-dropdown" v-model="sortorder" @change="sortnoticelist">
                    <option class="sort-option" value="recent">최신순</option>
                    <option class="sort-option" value="oldest">오래된순</option>
                </select>
            </div>
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
            <tr class="notice-value" v-for="(notice, i) in pagingData" :key="i">
                <th class="no-value">{{ i + 1 }}</th>
                <th class="nm-value"><span @click="gotonotice(notice.notice_no)">{{ notice.notice_title }}</span></th>
                <th class="date-value">{{ new Date(notice.notice_date).toISOString().split('T')[0] }}</th>
                <th class="view-value">{{ notice.notice_cnt }}</th>
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
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            currentPage:1,
            itemsPerPage:10,
            currentPageGroup: 1,
            noticelist: [],
            sortorder: 'recent'
        };
    },
    computed:{
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        pagingData(){
            const start = (this.currentPage -1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.sortednoticelist.slice(start, end);
        },
        totalPages(){
            return Math.ceil(this.sortednoticelist.length / this.itemsPerPage);
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
        sortednoticelist() {
            return this.noticelist.slice().sort((a, b) => {
                if (this.sortorder === 'recent') {
                    return new Date(b.notice_date) - new Date(a.notice_date);
                } else if (this.sortorder === 'oldest') {
                    return new Date(a.notice_date) - new Date(b.notice_date);
                }
                return 0;
            });
        }
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
        },
        gotonotice(notice_no) {
        axios({
            url: "http://localhost:3000/admin/incrementnoticecnt",
            method: "POST",
            data: {
                notice_no: notice_no
            },
            }).then(() => {
                this.$router.push(`/help/notice/${notice_no}`);
            })
        },
        sortnoticelist() {
            this.currentPage = 1;
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
        },
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

.sort-dropdown {
    border-radius: 5px;
  padding: 5px;
  font-size: 14px;
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
    height: 50px;
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    color: #5d5b5b;
    text-align: center;
    font-weight: 50px;
}

span {
    cursor: pointer;
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