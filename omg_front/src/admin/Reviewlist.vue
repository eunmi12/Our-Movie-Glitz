<template>
    <div style="display: flex;">
    <AdminpageSidebar />
        <div class="review-management">
            <h1>관람평 관리</h1>
            <div class="review-sort">
                <select class="sort-dropdown" v-model="sortorder" @change="sortreview">
                    <option class="sort-option" value="recent">최신순</option>
                    <option class="sort-option" value="oldest">오래된순</option>
                    <option class="sort-option" value="highestrate">평점 높은순</option>
                    <option class="sort-option" value="lowestrate">평점 낮은순</option>
                </select>
            </div>
            <div class="review-list" style="width: 100%; display: flex; flex-direction: column;">
                <div class="review-none" v-if="review.length === 0">작성된 관람평이 없습니다.</div>
      <div v-else>
          <div class="review-title">
          <span class="title">영화 제목</span>
          <span class="rate">평점</span>
          <span class="user">작성자</span>
          <span class="date">작성일</span>
          <span class="del">삭제</span>
        </div>
        <div v-for="(review, i) in pagingData" :key="i">
          <div class="review-value" @click="togglereview(review.review_no)">
            <span class="title-value">{{ review.movie_title }}</span>
            <span class="rate-value">{{ review.review_rate }} / 5</span>
            <span class="user-value">{{ review.user_name }}</span>
            <span class="date-value">{{ new Date(review.review_date).toISOString().split('T')[0] }}</span>
            <span class="del-value"><button class="delete" @click.stop="gotodelete(review.review_no)">삭제</button></span>
        </div>
          <div :class="['review_comt_container', 'review_comt_container'+review.review_no, showreview ? 'show' : '']">
            <div class="comt-value"><span>{{ review.review_comment }}</span></div>
          </div>
          </div>
    </div>
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
            showreview: false,
            review:[],
            currentPage:1,
            itemsPerPage:10,
            currentPageGroup: 1,
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
            return this.sortedreview.slice(start,end);
        },
        totalPages(){
            return Math.ceil(this.sortedreview.length / this.itemsPerPage);
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
        sortedreview() {
            return this.review.slice().sort((a, b) => {
                if (this.sortorder === 'recent') {
                    return new Date(b.review_date) - new Date(a.review_date);
                } else if (this.sortorder === 'oldest') {
                    return new Date(a.review_date) - new Date(b.review_date);
                } else if (this.sortorder === 'highestrate') {
                    return b.review_rate - a.review_rate;
                } else if (this.sortorder === 'lowestrate') {
                    return a.review_rate - b.review_rate;
                }
                return 0;
            });
        }
    },
    mounted() {
        this.getreview();
    },
    methods: {
        getreview() {
            axios({
                url: `http://localhost:3000/admin/review`,
                method: "POST",
            }).then((results) => {
                this.review = results.data;
            });
        },

        gotodelete(review_no) {
            this.$swal({
                title: `정말 삭제하시겠습니까?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
                reverseButtons: true,
            }).then(result => {
                if (result.value) {
                    axios({
                        url: `http://localhost:3000/admin/deletereview`,
                        method: "POST",
                        data: {
                            review_no: review_no
                        },
                    }).then(() => {
                            this.$swal("삭제되었습니다.");
                            this.getreview();
                    })
                }
            });
        },
        sortreview() {
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
        togglereview(review_no) {
            const temp = this.$el.querySelector(".review_comt_container"+review_no);

            if (temp.classList.contains('show')) {
                temp.classList.remove('show');
            } else {
                temp.classList.add('show');
            }
        }
    }

}
</script>

<style scoped>

.review-management {
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

.review-management h1 {
    text-align: left;
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 30px;
}

.review-title {
    display: flex;
    border-bottom: 1px solid #d4cdcd;
    height: 57px;
    font-size: large;
    color: #292828;
    text-align: center;
    background-color: #ffffff;
    padding-bottom: 30px;
    padding-top: 10px;
}

.review-value {  
    cursor: pointer;
    display: flex;
  font-weight: bold;
    border-bottom: 1px solid #d4cdcd;
    height: 70px;
    font-size: medium;
    color: #5d5b5b;
    text-align: center;
    padding-top: 25px;
    padding-bottom: 20px;
}

.comt-value {
  width: 100%;
    border-bottom: 1px solid #d4cdcd;
    height: auto;
    font-size: medium;
    color: #5d5b5b;
    text-align: center;
    background-color: #ffffff;
    padding: 30px 0px 30px 60px;
    overflow-wrap: break-word;
    word-wrap: break-word; 
}

.review_comt_container { 
    display: none;
}

.review_comt_container.show {
    display: block;
}

.title {
    flex: 1.5;
}

.rate {
    flex: 1;
}

.user {
    flex: 1;
}

.date {
    flex: 1;
}

.del {
    flex: 1;
}

.title-value {
    flex: 1.5;
}

.rate-value {
    flex: 1;
}

.user-value {
    flex: 1;
}

.date-value {
    flex: 1;
}

.del-value {
    flex: 1;
}

.review-sort {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    margin-top: 20px;
}

.sort-dropdown {
    border-radius: 10px;
    height: 35px;
    text-align: center;
    background-color: ivory;
}

.delete{
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: white;
    background-color: red;
    border-radius: 5px;
    cursor: pointer;
}

.delete:hover{
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: #292828;
    background-color: #ffffff;
    border-radius: 5px;
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