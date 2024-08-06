<template>
    <div class="movie">
        <div class="movie_wrap">
            <div class="movie_title">
                <h1 class="title"> 쿠폰 등록 </h1>
            </div>
        <form>
            <div class="movie_content">
                <div class="movie_list_right">
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                           <div class="title_wrap">
                            <span>쿠폰 이름 : <input type="text" v-model="coupon_title"></span>
                            <span id="notice_date">쿠폰 시작일 : <input type="date" v-model="coupon_startdate"></span>
                            <span id="notice_date">쿠폰 마감일 : <input type="date" v-model="coupon_enddate"></span>
                           </div>
                           <!-- <select v-model="sc_movie_no">
                              <option v-for="(movie, i) in movielist" :key="i" :value="movie.movie_no">{{movie.movie_title}}</option>
                           </select> -->
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                            <div class="movie_detail_title">
                                <span>할인율 : <input type="number" v-model="coupon_sale"></span>
                            </div>
                            <div class="movie_detail_title">
                                <span>사용 여부 : <input type="radio" v-model="coupon_able" name="1" value="0">사용 불가<input type="radio" v-model="coupon_able" name="1" value="1">사용 가능</span>
                            </div>
                           <div class="content_wrap"><span>상세 내용</span></div>
                           <textarea rows="3" id="notice_comment" v-model="coupon_comment"></textarea>
                               <!-- <select v-model="sc_cinema_no">
                              <option v-for="(cinema, i) in cinemalist" :key="i" :value="cinema.cinema_no">{{cinema.cinema_name}}</option>
                           </select> -->
                        </div>
                    </div>
                    <div class="coupon_img">
                        쿠폰 이미지 :
                        <input type="file" accept="image/*" @change="uploadFile($event.target.files, 0)">
                    </div>
                </div>
            </div>
            <div class="button_wrap">
                <button type="button" class="insertbtn" @click="insertCoupon">쿠폰 등록</button>
                <button type="button" class="exit" @click="exit">취소</button>
            </div>
        </form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {

    data() {
        return {
            coupon_title:'',
            coupon_comment: '',
            coupon_sale: '',
            coupon_startdate:'',
            coupon_enddate:'',
            coupon_able:'',
            coupon_img1:'', 
        };
    },

    methods:{
        async uploadFile(file, type){
            let name = "";

            if(file){
                name = file[0].name;
                console.log("name",name);
            } else{
                return;
            }

            const formData = new FormData(); //FormData가 키-값 쌍으로 multipart/form-data 형식 서버에 전송

            formData.append('img',file[0]);

            for(let key of formData.keys()){
                console.log(key,':',formData.get(key));
            }
            try{
                const res = await axios.post('http://localhost:3000/admin/upload_img', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if(res.data.message === 'success'){
                    this.$swal('이미지 등록 성공');
                    if(type === 0){
                        this.coupon_img1 = name;
                        console.log('coupon_img1', this.coupon_img1);
                    }
                } else {
                    throw new Error('이미지 업로드 실패');
                }
            }catch(error){
                console.log('error',error);
                this.$swal('이미지 등록 실패');
            }

        },
        async insertCoupon(){
            try{
                if(!this.coupon_title){
                    this.$swal('쿠폰 제목을 작성해주세요.');
                    return;
                } else if(!this.coupon_startdate){
                    this.$swal('쿠폰 시작일을 등록해주세요.');
                    return;
                } else if(!this.coupon_enddate){
                    this.$swal('쿠폰 종료일 등록해주세요.');
                    return;
                } else if(!this.coupon_sale){
                    this.$swal('쿠폰 할인율 등록해주세요.');
                    return;
                } else if(!this.coupon_able){
                    this.$swal('사용 여부를 선택해주세요.');
                    return;
                } else if(!this.coupon_comment){
                    this.$swal('상세 내용을 작성해주세요.');
                    return;
                } 
                
                const response = await axios.post(`http://localhost:3000/admin/createcoupon`,{
                    coupon_title : this.coupon_title,
                    coupon_sale : this.coupon_sale,
                    coupon_startdate : this.coupon_startdate,
                    coupon_enddate : this.coupon_enddate,
                    coupon_comment : this.coupon_comment,
                    coupon_able : this.coupon_able,
                    coupon_img1 : this.coupon_img1
                });
                const data = response.data;
                console.log("data잘가나확인용",data);
                console.log('data.message======:',data.message);
                if(data.message === 'success'){
                    Swal.fire({
                        title:'쿠폰이 등록 되었습니다.',
                        icon:'success',
                        confirmButtonText: '확인'
                    }).then(()=>{
                        this.$router.push(`/admin/coupon`);
                    });
                }else{
                    this.$swal('쿠폰 등록 실패함');
                }
            }
            catch(error){
                this.$swal('쿠폰 등록에 실패했습니다.'); 
                console.error('쿠폰 등록 실패',error);
            }
        },
        exit(){
            this.$router.push(`/admin/coupon`);
        },
        //제대로 값 받는지 확인용
        submit() {
            alert('시작'+this.coupon_enddate+'종료'+this.coupon_startdate+'이미지'+this.coupon_img1+'제목'+this.coupon_title+'내용'+this.coupon_comment+'할인'+this.coupon_sale);
            console.log("Selected movie number:", this.sc_movie_no);
        },

    }

}
</script>
<style scoped>
*{
    color:#4b4b4b;
}
.movie{
    width:100%;
    height: 100%;
    margin: 0 auto;
    margin-top: 100px;
}
.movie_wrap{
    padding-bottom: 70px;
    padding-top:70px;
}
.movie .movie_wrap{
    width: 70%;
    min-width: 1000px;
    height: 80%;
    margin:0 auto;
    border: 1px solid #ccc;
    border-radius: 10px 
}
.movie_wrap .title{
    width:80%;
    /* padding-top: 70px; */
    margin: 0 auto;
    /* background-color: bisque; */
}
.movie_wrap .movie_content{
    display: flex;
}
.movie_title .title{
    text-align: center;
    font-size:65px;
    border-bottom: 1px solid #ccc;
}
/*movie_content*/ 
.movie_detail_title{
    font-size: 20px;
    padding-bottom: 5px;
}
.movie_detail_title input[type="number"]{
    width: 100px;
}
.movie_detail_title input[type="radio"]{
    margin-left:10px;
}
.movie_list_right {
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  /* padding-left:50px;
  padding-right:50px;
  padding-top: 20px; */
}
.movie_detail {
    font-size:20px;
    padding-bottom: 15px;
}
.title_wrap{
    width:100%;
    display: flex;
    padding-top:10px;
    padding-bottom:10px;
    /* border-bottom: 1px solid #ccc; */
}
.title_wrap input[type="text"]{ 
    width:300px;
    margin-left:10px;
    padding-left:5px;
}

.movie_detail_title input[type="number"]{
    margin-left:10px;
}

.title_wrap #notice_date{
    display: block;
    margin-left:auto;
}

.content_wrap{
    margin: 0 auto;
    margin-top: 15px;
}

.searchbtn{
    margin-left: 10px;
    border:none;
    background-color: rgba(240, 238, 218, 1);
    width:60px;
    border-radius: 5px;
}
.date_wrap{
    width:190px;
    display: inline-block;
}
#movie_startdate{
    margin-right: 10px;
}
#movie_starttime{
    margin-right: 10px;
}
/*movie_comment*/
.comment_title{
    border-top:1px solid #ccc;
    padding-top:15px;
}
.movie_detail textarea{
    width:100%;
    resize: none;
}
/*button*/
.button_wrap{
    text-align: center;
    margin-top:35px;
}
.insertbtn{
    font-size: 28px;
    width:200px;
    padding: 5px;
    margin: 5px;
    background-color:#f0eeda;
    border-radius: 5px;
    border: 1px solid #f0eeda;
}
.insertbtn:hover{
    font-size: 28px;
    width:200px;
    padding: 5px;
    margin: 5px;
    background-color: #ffffff;
    color: #32851e;
    border-radius: 5px;
    border: 1px solid;
    box-shadow: 0 4px 8px rgba(23, 88, 42, 0.5);
}
.exit{
    font-size: 28px;
    width:130px;
    padding: 5px;
    margin: 5px;
    background-color:#e7e7e7;
    border-radius: 5px;
    border: 1px solid #f0eeda;
}
.exit:hover{
    font-size: 28px;
    width:130px;
    padding: 5px;
    margin: 5px;
    background-color:#ffffff;
    border-radius: 5px;
    color: #ff5252;
    border: 1px solid #f0eeda;
    box-shadow: 0 4px 8px rgba(199, 199, 199, 0.5);
}
</style>