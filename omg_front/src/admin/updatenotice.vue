<template>
    <div class="movie">
        <div class="movie_wrap">
            <div class="movie_title">
                <h1 class="title"> 공지사항 수정</h1>
            </div>
        <form>
            <div class="movie_content">
                <div class="movie_list_right">
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                           <div class="title_wrap">
                            <span>제목 : <input type="text" v-model="notice.notice_title"></span>
                            <span id="notice_date">작성 날짜: <input type="date" v-model="notice.notice_date"></span>
                           </div>
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                           <div class="content_wrap"><span>상세 내용</span></div>
                           <textarea rows="10" id="notice_comment" v-model="notice.notice_coment"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button_wrap">
                <button type="button" class="insertbtn" @click="updateNotice">공지사항 수정</button>
                <button type="button" class="delete" @click="deleteNotice">삭제</button>
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
            notice_no: this.$route.params.notice_no,
            notice:{
                notice_title:'',
                notice_coment:'',
                notice_date:'',
            },
        };
    },
    created(){
        this.getnotice();
    },
    methods:{
        async getnotice(){
            console.log("Notcie_no",this.notice_no);
            const notice_no = this.notice_no;
            const response = await axios.post(`http://localhost:3000/admin/notice/${notice_no}`);
            this.notice = response.data[0];
            console.log("notice정보:",this.notice);
        },
        async updateNotice(){
            const notice_title = this.notice_title;
            const notice_date = this.notice_date;
            const notice_comment = this.notice_comment;
            console.log("notice 확인:",notice_title,'__',notice_date,'__',notice_comment);
            try{
                if(!this.notice.notice_title){
                    this.$swal('공지사항 제목을 작성해주세요.');
                    return;
                } else if(!this.notice.notice_date){
                    this.$swal('공지사항 작성일을 등록해주세요.');
                    return;
                } else if(!this.notice.notice_coment){
                    this.$swal('상세 내용을 작성해주세요.');
                    return;
                }
                const response = await axios.post(`http://localhost:3000/admin/updatenotice`,{
                    notice_no : this.notice_no,
                    notice_title : this.notice.notice_title,
                    notice_date : this.notice.notice_date,
                    notice_coment: this.notice.notice_coment
                });
                const data = response.data;
                console.log("data잘가나확인용",data);

                Swal.fire({
                    title:'공지사항이 수정되었습니다.',
                    icon:'success',
                    confirmButtonText: '확인'
                }).then(()=>{
                    this.$router.push(`/admin/notice`);
                })
            }
            catch(error){
                this.$swal('공지사항 수정에 실패했습니다.'); 
                console.error('공지사항 수정 실패');
            }
        },
        async deleteNotice(){
            await axios.post(`http://localhost:3000/admin/deletenotice`,{
                notice_no : this.notice_no
            });
            Swal.fire({
                title:'공지사항이 삭제되었습니다.',
                icon: 'success',
                confirmButtonText:'확인'
            }).then(()=>{
                this.$router.push(`/admin/notice`);
            })
        },
        exit(){
            this.$router.push(`/admin/notice`);
        }
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
    padding:5px;
    padding-top:10px;
    padding-bottom:10px;
    /* border-bottom: 1px solid #ccc; */
}
.title_wrap input[type="text"]{
    width:600px;
    margin-left:10px;
    padding-left:5px;
}

.title_wrap #notice_date{
    display: block;
    margin-left:auto;
}

.content_wrap{
    margin: 0 auto;
    margin: 5px;
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
.delete{
    font-size: 28px;
    width:130px;
    padding: 5px;
    margin: 5px;
    background-color:#ffcaca;
    border-radius: 5px;
    border: 1px solid #f0eeda;
}
.delete:hover{
    font-size: 28px;
    width:130px;
    padding: 5px;
    margin: 5px;
    background-color:#ffffff;
    color: #ff5252;
    border-radius: 5px;
    border: 1px solid #f0eeda;
}
</style>