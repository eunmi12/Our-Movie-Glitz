<template>
    <div class="movie">
        <div class="movie_wrap">
            <div class="movie_title">
                <h1 class="title"> 영 화 등 록 </h1>
            </div>
        <form>
            <div class="movie_content">
                <div class="movie_list_left">
                    <div class="movie_img0">
                        <img :src="fullImgUrl" v-if="fullImgUrl" alt="영화 메인이미지"/>
                        <!-- <img src="../images/mainpage/영화1.png" v-else-if="!fullImgUrl" alt="영화 메인이미지"/> -->
                        <!-- <img src="../images/mainpage/영화1.png" alt="영화 메인이미지"/> -->
                        <!-- <img :src="imgData.img_path ? require(`../../../bodytrue_back/uploads/user/${imgData.img_path}`) : '/goodsempty2.jpg'" alt="Profile Picture"> -->
                        
                        <input type="file" />
                    </div>
                </div>
                <div class="movie_list_right">
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                           <div class="title_wrap"><span>영화 제목:</span></div>
                                <input type="text" id="movie_title" v-model="title" placeholder="제목을 입력하세요">
                                <button type="button" class="searchbtn" @click="InsertInfo()">검색</button>
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                           <div class="title_wrap"><span>영화 장르:</span></div>
                                <input type="text" id="movie_tag" v-model="genre">
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                            <div class="title_wrap"><span>영화 감독:</span></div>
                                <input type="text" id="movie_director" v-model="director">                      
                        </div>
                    </div>  
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                            <div class="date_wrap"><span>영화 개봉시작:</span></div>
                                <input type="date" id="movie_startdate" v-model="startdate">
                                 <br>
                                <div class="date_wrap"><span>영화 개봉마감:</span></div>
                                <input type="date" id="movie_enddate" v-model="enddate">          
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                            <div class="title_wrap" ><span>연령 등급:</span></div>
                                <input type="radio" name="age" value="1" v-model="age">전체이용가
                                <input type="radio" name="age" value="12" v-model="age">12+                 
                                <input type="radio" name="age" value="15" v-model="age">15+
                                <input type="radio" name="age" value="19" v-model="age">19+
                        </div>
                    </div>  
                    <div class="movie_detail">
                        <div class="comment_title"><span>상세 설명</span></div>
                        <textarea rows="8" id="movie_comment" v-model="detail"></textarea>
                    </div>
                    <div class="movie_detail">
                        <div class="comment_title"><span>스틸컷</span></div>
                        <input multiple type="file" id="movie_img2" @click="uploads()">
                    </div>
                </div>
            </div>
            <div class="button_wrap">
                <button type="button" class="insertbtn" @click="CreateMovie()">등록</button>
                <button type="button" class="exit" @click="exit">취소</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import LoginVue from '../views/Login.vue';
import axios from 'axios';

const Base_Img_Url = 'https://image.tmdb.org/t/p/w500';

export default {
    data(){
        return{
            title:"",
            poster:"",
            detail:"",
            poster:"",
            genre:"",
            director:"",
            startdate:"",
            enddate:"",
            age:"",
            
        }
    },
    computed:{
        fullImgUrl(){
            return this.poster ? `${Base_Img_Url}${this.poster}` : `../images/mainpage/noimg.jpg`;
        }
    },
    
    methods:{
        InsertInfo(){
            const fetch = require('node-fetch');
            // var i;

            // console.log('this.mv_title : ', this.mv_title);
            // console.log('fetch : ' ,fetch);
            // console.log('movie_title : ' ,movie_title);
            // console.log('mv_title : ',mv_title);
            
            const mv_title = this.title;

            const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=1&query=${mv_title}`;
            const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmQ3ZjFmOWNjZmVhNzU4Mjk1OTQxMWQwNTIwMzUwMSIsIm5iZiI6MTcyMjMwMTc0My40NTIwODIsInN1YiI6IjY2YTA1YmY0MDczOTIzYWQ0OTE4YWQyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Behdy8UdYhkjJ1hNplKHvKllW-nP9beg6Oh9lwG-btw'
            },
            data:{
                
            }
            };
            
            fetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log(json)

                // 이름이 같은거만 가져오고싶다...
                // for(i = 0;i <results.length();i++){
                //     if(json.results[i].title == document.getElementById(movie_title)){
                //         this.title = json.results[i].title;
                //         this.poster = json.results[i].poster_path;
                //         this.detail = json.results[i].overview;
                //             }
                // }

                this.title = json.results[0].title;
                this.poster = json.results[0].poster_path;
                this.detail = json.results[0].overview;

                // console.log('title : ' , title);
                // console.log('poster : ' , poster);
                // console.log('detail : ' , detail);


        })
            .catch(err => console.error('error:' + err))

            // console.log('밖 title : ' ,title);

            
        },
        async CreateMovie(){
            try{
                if(!this.title){
                    this.$swal('제목은 자동입력일텐데... 혹시 지우셨나요?');
                    return;
                } else if(!this.genre){
                    this.$swal('장르를 입력해주세요.');
                    return;
                }else if(!this.director){
                    this.$swal('감독님의 이름을 입력해주세요.');
                    return;
                }else if(!this.startdate){
                    this.$swal('시작일을 지정해 주세요.');
                    return;
                }
                else if(!this.enddate){
                    this.$swal('종료일을 지정해 주세요.');
                    return;
                }else if(!this.age){
                    this.$swal('연령 등급을 까먹으시면 섭하죠!');
                    return;
                }else if(!this.detail){
                    this.$swal('상세설명 지우기도 힘드셨을텐데...다시!');
                    return;
                }
                const response = await axios.post(`http://localhost:3000/movie/createMovie`,
                    {
                        title : this.title,
                        poster:this.poster,
                        detail:this.detail,
                        poster:this.poster,
                        genre:this.genre,
                        director:this.director,
                        startdate:this.startdate,
                        enddate:this.enddate,
                        age:this.age
                    });
                    const data = response.data;
                    console.log("정보삽입중?",data);
                this.$swal('영화 등록 성공.');
                this.$router.push(`/`);
            }
            catch(error){
                console.error("영화 등록 실패");
            }
        },
        exit(){
            this.$router.push(`/admin`);
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
}

/*movie_content*/ 
.movie_list_left {
    width:30%;
    flex-direction: column;
    align-items: center;
    padding:10px;
    border-right: 1px solid #ccc;
}
.movie_list_left .movie_img0{
    display: flex;
    align-items: center;
    flex-direction: column;
}
.movie_list_left input[type="file"]{
    margin: 0 auto;
    margin-left:50px;
    margin-top:10px;
}
.movie_list_left img{
    width:150px;
    height: auto;
    border:1px solid #ccc;
    border-radius: 10px;
}

.movie_detail_title{
    font-size: 20px;
    padding-bottom: 5px;
}
.movie_list_right {
  width: 70%;
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
    width:100px;
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
    width:140px;
    display: inline-block;
}
#movie_startdate{
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