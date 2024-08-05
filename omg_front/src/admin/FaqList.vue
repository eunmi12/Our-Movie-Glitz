<template>
    <div class="adminfaq">
        <adminpage-sidebar/>
        <div class="faq">
            <h1>FAQ 관리</h1>
            <div class="faq-section">
                <div class="faq-none" v-if="faqlist.length === 0">준비중입니다.</div>
                <div v-else>
                    <div v-for="(faq, i) in pagingData" :key="i">
                        <div class="faq-list">
                            <div class="faq-content">
                                <img class="question-mark" src="../images/faq.png">
                                <span v-if="!faq.edit">{{ faq.faq_q }}</span>
                                <input v-else v-model="faq.faq_q" @blur="updateFQ(faq, i)">
                            </div>
                            <div class="actions">
                                <button class="updatefq" @click="editFq(i)">수정</button>
                                <button class="deletefaq" @click="deleteFAQ(faq,i)">삭제</button>
                                <img @click="toggleAnswer(faq.faq_no, i)" class="toggle-btn" src="../images/down.png" v-if="!faq.show">
                                <img @click="toggleAnswer(faq.faq_no, i)" class="toggle-btn" src="../images/up.png" v-else>
                            </div>
                        </div>
                        <div :class="['faq_answer_container', 'faq_answer_container' + faq.faq_no, faq.show ? 'show' : '']">
                            <div colspan="2" class="faq-answer">
                                <span v-if="!faq.editA">▶ {{faq.faq_a === null ? '답변 준비중입니다.' : faq.faq_a}} </span>
                                <textarea :ref="'textarea-' + i" v-else v-model="faq.faq_a" @blur="updateFA(faq, i)" maxlength="1000" @input="autoResize($event)"></textarea>
                                <!-- <textarea ref="textarea" v-else v-model="faq.faq_a" @blur="updateFA(faq, i)" maxlength="1000" @input="autoResize($event)"></textarea> -->
                                <!-- <input v-else v-model="faq.faq_a" @blur="updateFA(faq, i)"> -->
                                <button class="updatefa" @click="editFa(i)">수정</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagination">
                <ul class="number_box">
                    <li @click="prevPageGroup" :class="{disabled: currentPageGroup === 1}"><img src="../images/prev.png"/></li>
                    <li v-for="page in currentGroupPages" :key="page" @click="changePage(page)" :class="{active: page === currentPage}">
                    {{ page }}</li>
                    <li @click="nextPageGroup" :class="{disabled: currentPageGroup === pageGroups.length}"><img src="../images/next.png"/></li>
                </ul>
            </div>
            <div class="create">
                <button class="insertFaq" @click="goToCreateFaq">새로운 FAQ 작성하기</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import AdminpageSidebar from "../layouts/AdminpageSidebar.vue";
export default {
    components: {
        AdminpageSidebar,
    },
    data() {
        return {
            faqlist: [],
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
            return this.faqlist.slice(start,end);
        },
        totalPages(){
            return Math.ceil(this.faqlist.length / this.itemsPerPage);
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
    mounted(){
      this.getfaqlist();
    },
    created() {
        this.getfaqlist();
    },
    methods: {
        getfaqlist() {
            axios({
                url: `http://localhost:3000/admin/faqlist`,
                method: "GET",
            }).then((results) => {
                this.faqlist = results.data.map(faq => ({ ...faq, show: false, edit:false }));
                console.log(results);
            }).catch(error => {
                console.error(error);
            });
        },
        toggleAnswer(faq_no, index) {
            const temp = this.$el.querySelector(".faq_answer_container" + faq_no);
            if (temp.classList.contains('show')) {
                temp.classList.remove('show');
                this.faqlist[index].show = false;
            } else {
                temp.classList.add('show');
                this.faqlist[index].show = true;
            }
        },
        //faq 수정하기
        editFq(index){
            this.faqlist[index].edit = true;
        },
        updateFQ(faq, index){
            const faq_q = faq.faq_q;
            const faq_no = faq.faq_no;
            axios.post('http://localhost:3000/admin/qupdate', {
                faq_q: faq_q,
                faq_no: faq_no
            }).then(() => {
                this.faqlist[index].edit = false;
                this.$swal('질문이 성공적으로 수정되었습니다.');
                console.log(`Saved FAQ ${faq.faq_no}: ${faq.faq_q}`);
            }).catch(error => {
                console.error("FAQ 수정 중 오류 발생:", error);
            });
        },
        editFa(index) {
        this.faqlist[index].editA = true;
        this.$nextTick(() => {
            const textarea = this.$refs['textarea-' + index][0];
            if (textarea) {
                this.autoResize({ target: textarea });
            }
        });
    },
        updateFA(faq, index){
            const faq_a = faq.faq_a;
            const faq_no = faq.faq_no;
            axios.post('http://localhost:3000/admin/aupdate', {
                faq_a: faq_a,
                faq_no: faq_no
            }).then(() => {
                this.faqlist[index].editA = false;
                this.$swal('답변이 성공적으로 수정되었습니다.');
                console.log(`Saved FAQ ${faq.faq_no}: ${faq.faq_a}`);
            }).catch(error => {
                console.error("FAQ 수정 중 오류 발생:", error);
            });     
        },
        //FAQ 삭제하기
        deleteFAQ(faq,index){
            const faq_no = faq.faq_no;
            axios.post('http://localhost:3000/admin/deletefaq', {
                faq_no: faq_no
            }).then(() => {
                this.faqlist.splice(index, 1); // 목록에서 항목 제거
                this.$swal('질문이 성공적으로 삭제되었습니다.');
                console.log(`Saved FAQ ${faq.faq_no}: ${faq.faq_a}`);
            }).catch(error => {
                console.error("FAQ 수정 중 오류 발생:", error);
            });
        },
        //FAQ 작성하기
        goToCreateFaq(){
            this.$router.push(`/admin/CreateFaq`);
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
        autoResize(event) {
            const textarea = event.target;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }

    }
}
</script><style scoped>
.adminfaq {
    width:95%;
    display: flex;
    align-items: center;
}

.faq {
    flex: 4;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center; /* 중앙 정렬 */
}

.faq-section {
    width: 95%;
    margin: auto;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.faq-list {
    text-align: left;
    border-bottom: 1px solid #d4cdcd;
    height: 70px;
    font-size: large;
    color: #292828;
    background-color: #ffffff;
    padding: 18px 0px 0px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.faq-content {
    display: flex;
    align-items: center;
}

.actions {
    display: flex;
    align-items: center;
}

.updatefq {
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: white;
    background-color: #aaaaaa;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}

.updatefq:hover {
    color: #aaaaaa;
    background-color: rgb(193, 192, 192);
}

.updatefa {
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: white;
    background-color: #aaaaaa;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    margin-left: 10px;
}

.updatefa:hover {
    color: #aaaaaa;
    background-color: rgb(193, 192, 192);
}

.deletefaq {
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

.deletefaq:hover {
    color: #db1919;
    background-color: #ffeeee;
}

.create {
    display: flex;
    justify-content: center; /* 중앙 정렬 */
    margin-top: 20px;
}

.insertFaq {
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 10px;
    background-color: #f0eeda;
    color: black;
    border: 1px solid #f0eeda;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

.insertFaq:hover {
    background-color: #ffffff;
    color: #32851e;
    box-shadow: 0 4px 8px rgba(23, 88, 42, 0.5);
}

img {
    height: 30px;
}

span {
    margin-left: 15px;
}

textarea {
    margin-left: 15px;
    font-size: large;
    border: none;
    border-bottom: 1px solid #d4cdcd;
    resize: none;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    min-height: 50px; /* 기본 최소 높이 */
}

.faq_answer_container {
    display: none;
}

.faq_answer_container.show {
    display: block;
    width: 1250px;
}

.toggle-btn {
    margin-right: 10px;
}

.toggle-btn:hover {
    cursor: pointer;
}

.faq-answer {
    white-space: pre;
    overflow: auto;   
    text-align: left;
    border-bottom: 1px solid #d4cdcd;
    height: auto;
    font-size: large;
    color: #292828;
    background-color: #ffffff;
    padding: 30px 0px 30px 60px;
    overflow-wrap: break-word;
    word-wrap: break-word; 
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
