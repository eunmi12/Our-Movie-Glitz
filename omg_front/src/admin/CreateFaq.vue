<template>
    <div class="faqmain">
        <div class="faq_wrap">
            <form @submit.prevent="insertFaq">
                <div class="faq_title">
                    <h1>FAQ 작성</h1>
                    <label>질문 작성하기:</label>
                    <textarea v-model="faq_q"></textarea>
                    <div>
                        <label>답변 작성하기:</label>
                        <textarea type="text" v-model="faq_a"></textarea>
                    </div>
                </div>
                <div class="create_btn">
                    <button type="submit" name="clear" id="clear">FAQ 작성</button>
                    <button type="button" name="exit" id="exit" @click="exit">취소</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            faq_q:"",
            faq_a:"",   
        }
    },
    methods:{
        exit(){
            this.$router.push(`/admin/Faq`);
        },
        async insertFaq(){
            try{
                if(!this.faq_q){
                    this.$swal('질문을 입력하세요.');
                    return;
                } else if(!this.faq_a){
                    this.$swal('답변을 입력하세요.');
                    return;
                }
                const response = await axios.post(`http://localhost:3000/admin/createfaq`,
                    {
                        faq_q:this.faq_q,
                        faq_a:this.faq_a
                    });
                const data = response.data;
                console.log("FAQ DATA : ",data);
                this.$swal('FAQ 작성이 완료되었습니다.');
                this.$router.push(`/admin/Faq`);
            }
            catch(error){
                console.error("FAQ 작성중 오류 발생");
            }
        },
    }
}
</script>

<style scoped>
.faqmain {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 150px;
    padding-bottom: 150px;
    background-color: #f7f7f7;
}

.faq_wrap {
    width: 50%;
    max-width: 600px;
    padding: 30px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
}

.faq_wrap .faq_title {
    margin-bottom: 30px;
}

.faq_wrap .faq_title h1 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}

.faq_wrap .faq_title label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
    text-align: left;
    color: #555;
}

.faq_wrap .faq_title textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
    border: 1px solid #d4cdcd;
    resize: none;
    overflow: hidden;
    box-sizing: border-box;
    min-height: 250px; /* 기본 최소 높이 */
}

.create_btn {
    display: flex;
    justify-content: space-around;
}

.create_btn button {
    width: 120px;
    height: 40px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

#clear {
    background-color: #f0eeda;
    color: black;
    border: 1px solid #f0eeda;
    border-radius: 10px;
}

#clear:hover {
    background-color: #ffffff;
    color: #32851e;
    box-shadow: 0 4px 8px rgba(23, 88, 42, 0.5);
}

#exit {
    background-color: #d0d0d0;
    color: white;
    border-radius: 10px;
}

#exit:hover {
    background-color: #5a4f4f;
    color: rgb(255, 255, 255);
    box-shadow: 0 4px 8px rgba(77, 77, 77, 0.5);
}
</style>