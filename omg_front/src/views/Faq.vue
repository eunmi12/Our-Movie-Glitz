<template>
  <div class="faq">
    <h6>질문</h6>
    <div class="faq-section">
      <!-- <div class="faq-none" v-if="faq.length === 0">준비중입니다.</div> -->
      <table>
          <!-- <tr class="faq-list" v-for="(faq, i) in faqlist" :key="i"> -->
            <tr class="faq-list">
            <td class="faq-title"><img class="question-mark" src="../images/faq.png"><span>질문</span></td>
            <td class="faq-toggle" @click="toggleVisibility"><img class="toggle-btn" src="../images/down.png"></td>
          </tr>
          <tr v-if="isVisible" class="set">
            <td class="faq-answer">ㄴ 답변</td>
          </tr>
        </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
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

.faq-section {
    width: 95%;
    margin: auto;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.set {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
    height: 50px;
    color: #292828;
    background-color: #ffffff;
    padding-bottom: 30px;
}

.faq-list {  
  text-align: left;
    border-bottom: 1px solid #d4cdcd;
    height: 70px;
    font-size: large;
    color: #292828;
    background-color: #ffffff;
    padding-bottom: 50px;
}

.faq-title {
  width: 80%;
  padding-left: 50px;
}

.faq-answer {
  padding-left: 80px;
}

.faq-toggle {
  width: 20%;
  text-align: right;
}

img {
  height: 30px;
}

span {
  margin-left: 15px;
}

</style>