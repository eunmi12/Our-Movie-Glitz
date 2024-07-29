<template>
    <div class="adminfaq">
        <adminpage-sidebar/>
        <div class="faq">
            <h6>질문</h6>
            <div class="faq-section">
                <div class="faq-none" v-if="faqlist.length === 0">준비중입니다.</div>
                <div v-else>
                    <div v-for="(faq, i) in faqlist" :key="i">
                        <div class="faq-list">
                            <div class="faq-content">
                                <img class="question-mark" src="../images/faq.png">
                                <span v-if="!faq.edit">{{ faq.faq_q }}</span>
                                <input v-else v-model="faq.faq_q" @blur="updateFAQ(faq, i)">
                            </div>
                            <div class="actions">
                                <button class="updatefaq" @click="editFaq(i)">수정</button>
                                <button class="deletefaq">삭제</button>
                                <img @click="toggleAnswer(faq.faq_no, i)" class="toggle-btn" src="../images/down.png" v-if="!faq.show">
                                <img @click="toggleAnswer(faq.faq_no, i)" class="toggle-btn" src="../images/up.png" v-else>
                            </div>
                        </div>
                        <div :class="['faq_answer_container', 'faq_answer_container' + faq.faq_no, faq.show ? 'show' : '']">
                            <div colspan="2" class="faq-answer" v-if="faq.faq_a == null">▶ 답변 준비중입니다.</div>
                            <div colspan="2" class="faq-answer" v-else>▶ {{ faq.faq_a }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <button>새로운 FAQ 작성하기</button>
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
        };
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
        editFaq(index){
            this.faqlist[index].edit = true;
        },
        updateFAQ(faq, index){
            const faq_q = faq.faq_q;
            const faq_no = faq.faq_no;
            axios.post('http://localhost:3000/admin/faqupdate', {
                faq_q: faq_q,
                faq_no: faq_no
            }).then(() => {
                this.faqlist[index].edit = false;
                console.log(`Saved FAQ ${faq.faq_no}: ${faq.faq_q}`);
            }).catch(error => {
                console.error("FAQ 수정 중 오류 발생:", error);
            });
        }
    }
}
</script>
<style scoped>
.adminfaq{
    display: flex;
    align-items: center;
}

h6 {
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
    width: 95%;
    margin: auto;
}
.faq {
    width: 1650px;
    margin: 0;
}
.faq-section {
    width: 95%;
    margin: auto;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.faq-list {
    font-weight: bold;
    text-align: left;
    border-bottom: 1px solid #d4cdcd;
    height: 70px;
    font-size: large;
    color: #292828;
    background-color: #ffffff;
    padding: 18px 0px 0px 50px;
    display: flex;
    justify-content: space-between; /* 추가된 부분 */
    align-items: center; /* 추가된 부분 */
}

.faq-content {
    display: flex;
    align-items: center;
}

.actions {
    display: flex;
    align-items: center;
}

.updatefaq {
    font-size: 16px;
    width: 60px;
    border: none;
    color: white;
    background-color: #777777;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px; /* 추가된 부분 */
}

.updatefaq:hover {
    font-size: 16px;
    width: 60px;
    border: none;
    color: #777777;
    background-color: rgb(193, 192, 192);
    border-radius: 5px;
    cursor: pointer;
}

.deletefaq {
    font-size: 16px;
    width: 60px;
    border: none;
    color: white;
    background-color: #777777;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px; /* 추가된 부분 */
}

.deletefaq:hover {
    color: #777777;
    background-color: rgb(193, 192, 192);
}

img {
    height: 30px;
}

span {
    margin-left: 15px;
}

input {
    margin-left: 15px;
    font-size: large;
    border: none;
    border-bottom: 1px solid #d4cdcd;
}

.faq_answer_container {
    display: none;
}

.faq_answer_container.show {
    display: block;
}

.toggle-btn {
    margin-right: 10px; /* 추가된 부분 */
}

.toggle-btn:hover {
    cursor: pointer;
}

.faq-answer {
    text-align: left;
    border-bottom: 1px solid #d4cdcd;
    height: 50px;
    font-size: large;
    color: #292828;
    background-color: #ffffff;
    padding: 10px 0px 30px 60px;
}
</style>