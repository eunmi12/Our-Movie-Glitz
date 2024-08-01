<template>
  <div class="faq">
    <h6>질문</h6>
    <div class="faq-section">
      <div class="faq-none" v-if="faqlist.length === 0">준비중입니다.</div>
      <div v-else>
          <div v-for="(faq, i) in faqlist" :key="i">
          <div class="faq-list"><img class="question-mark" src="../images/faq.png"><span class="text">{{ faq.faq_q }}</span><img @click="toggleAnswer(faq.faq_no)" class="toggle-btn" src="../images/down.png"></div>
            <!-- <div class="faq-toggle"><img @click="toggleAnswer(faq.faq_no)" class="toggle-btn" src="../images/down.png"></div> -->
          <div :class="['faq_answer_container', 'faq_answer_container'+faq.faq_no, showAnswer ? 'show' : '']">
            <div colspan="2" class="faq-answer" v-if="faq.faq_a == null"><span class="text">▶ 답변 준비중입니다.</span></div>
            <div colspan="2" class="faq-answer" v-else><span class="text">▶ {{ faq.faq_a }}</span></div>
          </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
        return {
            faqlist: [],
            showAnswer: false,
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
                this.faqlist = results.data;
                console.log(results);
            }).catch(error => {
                console.error(error);
            });
        },
        toggleAnswer(faq_no) {
            const temp = this.$el.querySelector(".faq_answer_container"+faq_no);

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

h6 {
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid lightgray;
  padding-bottom: 15px;
  width: 95%;
  margin: auto;
}

.faq-section {
    width: 95%;
    margin: auto;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.faq-list {  
  width: 1250px;
  font-weight: bold;
  text-align: left;
    border-bottom: 1px solid #d4cdcd;
    height: 70px;
    font-size: large;
    color: #292828;
    background-color: #ffffff;
    padding: 18px 0px 0px 50px;
}

.faq-toggle {
  width: 20%;
  text-align: right;
}

img {
  height: 30px;
}

.text { 
  margin-left: 15px;
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  vertical-align: middle;
}

.faq_answer_container { 
    display: none;
}
.faq_answer_container.show {
    display: block;
    width: 1250px;
}

.toggle-btn {
  float: right;
  margin-right: 30px;
}

.toggle-btn:hover {
  cursor: pointer;
}

.faq-answer {
  width: 100%;
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

</style>