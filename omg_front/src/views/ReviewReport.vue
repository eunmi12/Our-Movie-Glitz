<template>
  <div v-if="isOpen" class="popup">
    <div class="popup-content">
      <header>
        <div>
          <span style="font-size:42px;">리뷰 신고</span>
          <span style="margin-left:20px; margin-top:2%; font-size:18px; ">영화 : {{banData.movie_title}}</span>
          <select class="report_content">
            <option>스포일러</option>
            <option>비방/욕설</option>
          </select>
        </div>
      </header>
      <main class="review-main">
        <div class="review-img">
          <div>
          </div>
          <div class="review-title">
            <!-- <h1>{{ reviewData.pro_name }}</h1> -->
          </div>
        </div>
        <div class="additional-text">
          <label for="review-text"><h3>리뷰 내용</h3></label>
          <span style="float:right;">작성자 : {{naming(banData.user_name)}} 작성일 : {{banData.review_date}}</span>
          <textarea id="review-text" disabled v-model="banData.review_comment" rows="3"></textarea>
        </div>
        <div class="action-buttons">
          <button @click="ReportReview" class="submit-btn">신고</button>
          <button type="button" @click="closeModal" class="cancel-btn">취소</button>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
    props: {
        isOpen: {
        type: Boolean,
        required: true
        },
        banData:{
            type:Object,
            required: true
        }
    },
    data(){
        return{
            review_no: this.banData.review_no,
            review_comment: this.banData.review_comment,
            re_movie_no: this.banData.re_movie_no,
            re_user_no : this.banData.re_user_no,
            review_date: this.banData.review_date,
            user_name:this.banData.user_name,
            movie_title:this.banData.movie_title,
        }
    },
    created(){
        // this.getReviewName();
    },
    methods:{
        //모달 닫기
        closeModal() {
            this.$emit('close');
        },
        // getReviewName(){
        //     try{
        //         console.log('review_no', this.review_no);
    
        //         const response = axios.post(`http://localhost:3000/movie/getreviewname`,{review_no: this.review_no});
        //         console.log('user_name>>>>',response.data);
                
        //         if(response.data && response.data.length > 0 ){
        //             this.user_name = response.data[0].user_name;
        //             console.log('바뀐 후 user_name:', this.user_name);
                    
        //         }else{
        //             console.error('사용자 이름을 찾을 수 없습니다.');
                    
        //         }
        //     } catch(error){
        //         console.error('사용자 이름을 가져오는 중 오류 발생:',error);
                
        //     }
        // },
        async ReportReview(){
            console.log('신고용 review_no',this.review_no);
            const report = {
                ...this.banData
            }
            console.log('신고>>>',report.review_no);
            
            try{
                const result = await this.$swal({
                        title: '신고 하시겠습니까?',
                        showCancelButton: true,
                        confirmButtonText: '확인',
                        cancelButtonText: '취소'
                    })
                if(result.isConfirmed){
                    const response = await axios.post(`http://localhost:3000/movie/incrementreport`, { review_no : report.review_no});
                    this.closeModal();
                }
            } catch(error){
                console.error('리뷰 신고중 오류 발생',error);
                
            }
        },
        naming(username){
            if(!username){
                return '';
            }
            const making = username.slice(0,1) + '**' + username.slice(3,5);
            return making;
        },

    }

}
</script>

<style scoped>
/* 모달 스타일 */
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
}
.report_content{
    /* position: absolute; */
    margin-top: 10px;
    font-size:20px;
    float:right;
    border-radius: 5px;
    padding: 5px;
}
textarea{
    width: 100%;
    font-size: 18px; /* 글꼴 크기 */
    resize: none; 
    padding: 10px;
    border-radius: 5px;
}

.action-buttons{
    margin:0 auto;
}
.submit-btn{
  width: 100px;
  font-size: 18px;
  margin: 0 20px;
  border-radius: 5px;
  cursor: pointer;
  border: 0;
  background-color:#ff4343;
  color:white;
  border-radius: 5px;
  border: 1px solid;
  box-shadow: 1px 1px 5px rgba(255, 156, 156, 0.5);
}
.submit-btn:hover{
  width: 100px;
  font-size: 18px;
  margin: 0 20px;
  border-radius: 5px;
  cursor: pointer;
  border: 0;
  background-color:#ffffff;
  color:#ff4343;
  border-radius: 5px;
  border: 1px solid;
  box-shadow: 1px 1px 5px rgba(255, 156, 156, 0.5);
}
.cancel-btn{
  width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #979797;
    color: rgb(66, 66, 66);
}
.cancel-btn:hover{
  width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    border: 1px solid;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    border: 0;
    background-color: #ffffff;
    color: rgb(0, 0, 0);
}
</style>