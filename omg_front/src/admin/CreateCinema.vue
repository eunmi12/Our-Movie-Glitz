<template>
    <div class="movie">
        <div class="movie_wrap">
            <div class="movie_title">
                <h1 class="title"> 상 영 등 록 </h1>
            </div>
        <form>
            <div class="movie_content">
                <div class="movie_list_right">
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                           <div class="title_wrap"><span>상영할 영화 제목:</span></div>
                           <select v-model="sc_movie_no">
                              <option v-for="(movie, i) in movielist" :key="i" :value="movie.movie_no">{{movie.movie_title}}</option>
                           </select>
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                           <div class="title_wrap"><span>상영할 상영관:</span></div>
                               <select v-model="sc_cinema_no">
                              <option v-for="(cinema, i) in cinemalist" :key="i" :value="cinema.cinema_no">{{cinema.cinema_name}}</option>
                           </select>
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                            <div class="date_wrap"><span>영화 상영 시작 날짜:</span></div>
                                <input type="date" id="movie_startdate" value="screen_date"  v-model="screen_date">         
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                            <div class="date_wrap"><span>영화 상영 시작 시간:</span></div>
                                <input type="time" id="movie_starttime" v-model="screen_starttime">
                                <div class="date_wrap"><span>영화 상영 종료 시간:</span></div>
                                <input type="time" id="movie_endtime" v-model="screen_endtime">          
                        </div>
                    </div>
                    <!-- <div class="movie_detail">
                        <div class="comment_title"><span>상세 설명</span></div>
                        <textarea rows="8" id="movie_comment"></textarea>
                    </div> -->
                </div>
            </div>
            <div class="button_wrap">
                <button type="button" class="insertbtn" @click="insertScreen">상영 등록</button>
                <button type="button" class="exit" @click="exit">취소</button>
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
            movielist:[],
            cinemalist:[],
            sc_movie_no:null,
            sc_cinema_no:null,
            screen_date:'',
            screen_starttime:'',
            screen_endtime:'',
       }
    },
    created(){
        this.getMovieList();
        this.getCinemaList();
    },
    methods: {
        async getMovieList(){
            const response = await axios.post(`http://localhost:3000/admin/scmovielist`)
            const data = response.data;
            this.movielist = data;
            console.log("movielist",this.movielist);
        },
        async getCinemaList(){
            const response = await axios.post(`http://localhost:3000/admin/sccinemalist`)
            const data = response.data;
            this.cinemalist = data;
            console.log("cinemalist", this.cinemalist);
        },
        async insertScreen(){
            try{
                if(!this.sc_movie_no){
                    this.$swal('영화 제목을 안넣으셨어요');
                    return;
                } else if(!this.sc_cinema_no){
                    this.$swal('상영관을 안넣으셨어요');
                    return;
                } else if(!this.screen_date){
                    this.$swal('상영 시작 날짜를 안넣으셨어요.');
                    return;
                } else if(!this.screen_starttime){
                    this.$swal('상영 시작 시간을 안넣으셨어요.');
                    return;
                } else if(!this.screen_endtime){
                    this.$swal('상영 종료 시간을 안넣으셨어요.');
                    return;
                }
                const response = await axios.post(`http://localhost:3000/admin/insertscreen`,
                    {
                        screen_starttime : this.screen_starttime,
                        screen_endtime : this.screen_endtime,
                        sc_movie_no : this.sc_movie_no,
                        sc_cinema_no : this.sc_cinema_no,
                        screen_date: this.screen_date,
                    }
                );
                const data = response.data;
                console.log('상영등록정보',data);
                this.$swal('상영 등록 성공');
                this.$router.push(`/admin/cinema`);
            }
            catch(error){
                console.error('상영 등록 실패');
            }
        },
        //제대로 값 받는지 확인용
        submitSelectedMovie() {
            alert('영화번호'+this.sc_movie_no+'상영관번호'+this.sc_cinema_no+'상영시작'+this.screen_date+'시작시간'+this.screen_starttime+'종료시간'+this.screen_endtime);
            console.log("Selected movie number:", this.sc_movie_no);
        },

        //취소버튼 눌렀을때
        exit(){
            this.$router.push(`/admin/cinema`);
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
}
/*movie_content*/ 
.movie_detail_title{
    font-size: 20px;
    padding-bottom: 5px;
}
.movie_list_right {
  width: 100%;
  padding: 10px;
  padding-left:50px;
  padding-right:50px;
  padding-top: 20px;
}
.movie_detail {
    font-size:20px;
    padding-bottom: 15px;
}
.title_wrap{
    width:160px;
    display: inline-block;
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
    width:130px;
    padding: 5px;
    margin: 5px;
    background-color:#f0eeda;
    border-radius: 5px;
    border: 1px solid #f0eeda;
}
.insertbtn:hover{
    font-size: 28px;
    width:130px;
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