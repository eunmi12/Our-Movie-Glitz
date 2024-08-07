<template>
    <div class="qna">
        <h1>1:1 문의 관리</h1>
        <br>
        <div class="qna-cont">
                <div class="qna-info">
                    <p class="info-value">문의유형 : {{ getqnatype(qna.qna_type) }}</p>
                    <p class="info-value">제목 : {{ qna.qna_title }}</p>
                    <p class="info-value">작성자 : {{ qna.user_name }}</p>
                    <p class="info-value">작성일 : {{ formattedDate }}</p>
                </div>
                <div class="qna-comt">
                    <span class="comt-value">{{ qna.qna_comment }}</span>
                </div>
                    <div class="qna-answer">
                        <textarea class="answer-value" type="text" v-model="qna_answer" placeholder="답변을 입력해 주세요."></textarea>
                    </div>
                <div class="qna-btn">
                    <button class="regist" @click="regist()">등록</button>
                    <button class="cancel" @click="cancel()">취소</button>
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            formattedDate: '',
            qna: {},
            qna_answer: ""
        }
    },
    mounted() {
        this.getqna();
    },
    methods: {
        getqna() {
            const qna_no = this.$route.params.qna_no;
            axios({
                url: `http://localhost:3000/admin/qna/${qna_no}`,
                method: "POST",
            }).then((res) => {
                if (res.data.data && res.data.data.length > 0) {
                    this.qna = res.data.data[0];
                    this.formattedDate = new Date(this.qna.qna_date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                }
                console.log(this.qna);
            }).catch((error) => {
                console.error(error);
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

        async regist(){
            console.log("qna_no:", this.qna.qna_no);
            try{
                if(!this.qna_answer){
                    this.$swal('답변을 입력하세요.');
                    return;
                }
                const response = await axios.post(`http://localhost:3000/admin/registqnaanswer`,
                    {
                        qna_answer:this.qna_answer,
                        qna_no:this.qna.qna_no
                    });
                const data = response.data;
                console.log("DATA : ",data);
                this.$swal('문의 답변이 등록되었습니다.');
                this.$router.push(`/admin/qnalist`);
            }
            catch(error){
                console.error("답변 등록 중 오류 발생");
            }
        },
        cancel(){
            this.$router.push(`/admin/qnalist`);
        },
    }
}
</script>

<style scoped>

.qna {
    margin: auto;
    width: 80%;
    min-width: 80%;
    margin-top: 100px;
    padding: 0 10% 0 5%;
    vertical-align: top;
    overflow-x: auto;
    flex-wrap: nowrap;
    box-sizing: border-box;
}

.qna h1 {
  text-align: center;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 30px;
}

.qna-cont {
    margin: auto;
    width: 80%;
    border: 1px solid lightgray;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.qna-info {
    padding-top: 20px;
    border-bottom: 1px solid lightgray;
    line-height: 130%;
}

.info-value {
    margin-left: 30px;
}

.qna-comt {
    padding-top: 40px;
    border-bottom: 1px solid lightgray;
    height: auto;
    min-height: 300px;
}

.comt-value {
    margin-left: 30px;
}

.qna-answer {
    padding-top: 40px;
    padding-bottom: 40px;
    height: 300px;
}

.answer-value {
    border: none;
    margin-left: 30px;
    width: 90%;
    height: 300px;
    resize: none;
}

.answer-value:focus {
    outline: none;
}

.qna-btn {
    margin: 15px;
    display: flex;
    justify-content: center;
}

.regist {
    border: 1px solid black;
    margin-right: 10px;
    border-radius: 5px;
    width: 50px;
    height: 30px;
    background-color: ivory;
}

.cancel {
    border: 1px solid black;
    margin-left: 10px;
    border-radius: 5px;
    width: 50px;
    height: 30px;
}

</style>