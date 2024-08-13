<template>
    <div class="moviedetail">
        <div class="moviecontainer">
            <div class="moviedetail_title">
                <img style="width:200px;" :src="getImagePath(movielist.movie_img0)" alt="영화이미지">
                <div class="moviedetail_content_title">
                    <div class="detail_title">{{movielist.movie_title}}</div>
                    <div class="detail_director">영화 감독 : {{movielist.movie_director}}</div>
                    <div class="detail_actor"> 출연 배우: {{movielist.movie_actor}}</div>
                    <div class="detail_genre"> 장르 : {{movielist.movie_tag}} </div>
                    <div class="detail_age"> 연령 등급: {{movie_age}}</div>
                    <div class="detail_startdate"> 개봉일 : {{movielist.movie_startdate}} </div> 
                <button class="reservebtn" @click="gotoreserve">예매하기</button>
                <button class="wishbtn" @click="addwishlist(movielist.movie_no)">♥</button>
                </div>
            </div>
            <div class="movie_title">
                <h1>상세 설명</h1>
            </div>
            <div class="moviedetail_content">
                {{movielist.movie_comment}}
            </div>
            <div class="movie_img">
                <h1>스틸컷</h1>
            </div>
            <div class="moviedetail_content">
                <div class="slider">
                    <div class="slides" :style="{ transform: `translateX(-${currentIndex * 250}px)` }">
                        <div class="slide" v-for="(img, index) in filteredSlides" :key="index">
                <img :src="getMovieImg(img)" alt="영화 이미지">
            </div>
                    </div>
                    <button class="prev" @click="prevSlide">❮</button>
                    <button class="next" @click="nextSlide">❯</button>
                    </div>
            </div>
            <div class="moviedetail_review">
                <h2>관람후기</h2>
                <div class="review_content" v-for="(review,i) in reviewList" :key="i">
                    <div class="reivew_content" v-if="review.review_report <= 3">
                        <ul class="review_container">
                            <li class="review_comment">
                                <div class="review_profile">
                                    <!-- <img style="width:100px" src="../images/mypageicon.png"> -->
                                    <img style="width:60px" src="../images/profile.png">
                                    <span></span>
                                </div>
                                <div class="review_detail">
                                    <ul class="writer_info">
                                        <li class="writer_name">
                                            {{naming(review.user_name)}}
                                        </li>
                                        <li class="writer_report">
                                            <span>
                                            신고<a @click="openReportModal(review)"><img style="width:30px" src="../images/report.png"></a>
                                            </span>
                                        </li>
                                        <li class="writer_rate">
                                            <div class="star-rating">
                                                <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= review.review_rate }">&#9733;</span>
                                            </div>
                                            <!-- {{review.review_rate}} -->
                                        </li>
                                        <li class="writer_date">
                                            <span>{{review.review_date}} |</span>
                                        </li>
                                        <li class="writer_like"> <!--내리뷰엔 좋아요 못누르게 하고싶어서 re_user_no까지 전달-->
                                            <span @click="incrementreview(review.review_no,review.re_user_no)">
                                                <a src="../images/like.png"><img style="width:18px" src="../images/like.png"></a> {{review.review_like}}
                                            </span>
                                        </li>
                                        <li class="comment">
                                            <p>{{review.review_comment}}</p>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="review_content">
                        <ul class="review_container">
                            <li class="review_comment">
                                <div class="review_profile">
                                    <!-- <img style="width:100px" src="../images/mypageicon.png"> -->
                                    <img style="width:60px" src="../images/profile.png">
                                    <span></span>
                                </div>
                                <div class="review_detail">
                                    <ul class="writer_info">
                                        <li class="writer_name">
                                            {{naming(review.user_name)}}
                                        </li>
                                        <li class="writer_report">
                                            <span>
                                            신고<a @click="openReportModal(review)"><img style="width:30px" src="../images/report.png"></a>
                                            </span>
                                        </li>
                                        <li class="writer_rate">
                                            <div class="star-rating">
                                                <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= review.review_rate }">&#9733;</span>
                                            </div>
                                            <!-- {{review.review_rate}} -->
                                        </li>
                                        <li class="writer_date">
                                            <span>{{review.review_date}} |</span>
                                        </li>
                                        <li class="writer_like"> <!--내리뷰엔 좋아요 못누르게 하고싶어서 re_user_no까지 전달-->
                                            <span @click="incrementreview(review.review_no,review.re_user_no)">
                                                <a src="../images/like.png"><img style="width:18px" src="../images/like.png"></a> {{review.review_like}}
                                            </span>
                                        </li>
                                        <li class="comment">
                                            <p>신고된 리뷰입니다.</p>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <ReportModal :isOpen="isReportOpen" :banData="banData" @close="closeReportModal" />

            </div>
        </div>
    </div>    
</template>
<script>
import axios from 'axios';
import { mapActions, mapState} from 'vuex';
import ReportModal from '../views/ReviewReport.vue'

export default {
    components:{
        ReportModal,
    },
    data(){
        return {
            movielist:[],
            reviewList:[],
            currentIndex: 0,
            // slidesCount:5
            // 신고용 모달 데이터
            isReportOpen: false,
            banData:{
                review_no : '',
                review_comment : '',
                re_movie_no : '',
                re_user_no : '',
                review_date : '',
                user_name:'',
                movie_title:'',
            },

        }
    },
    computed:{
        //리뷰 좋아요용,store.js에 persistedtate에 저장되고있는지 확인ㅇㅇ
        ...mapState(['re_like']),

      user(){
        return this.$store.state.user;
      },  
      movie_age(){
        const age = {
            1 : '전체이용가',
            12 : '12+',
            15 : '15+',
            19 : '청소년 관람 불가'
        }
        return age[this.movielist.movie_age];
      },
       filteredSlides() {
    if (!this.movielist || Object.keys(this.movielist).length === 0) {
      return [];
    }
    return Object.keys(this.movielist)
      .filter(key => key.startsWith('movie_img') && key !== 'movie_img0' && this.movielist[key])
      .map(key => this.movielist[key]);
  },
    maxIndex() {
      // 최대 슬라이드 인덱스는 필터링된 슬라이드의 총 개수에서 3을 뺀 값 (한번에 3개씩 보이므로)
      return Math.max(0, this.filteredSlides.length - 1);
    }
    },
    created() {
        this.getMovieList();
        this.getReviewList();

        console.log("user_no",this.$store.state.user.user_no);
        
    },

    methods:{
        async getMovieList(){
            const movie_no = this.$route.params.movie_no;
            
            try {
                    const response = await axios.post(`http://localhost:3000/movie/movie/${movie_no}`)
                    this.movielist = response.data[0];
                    console.log("movielist",this.movielist);
            } catch(error){
                console.error('영화정보 불러오는 도중 에러 발생');
                
            }
        },
        getImagePath(image){
            return (`https://image.tmdb.org/t/p/w500/${image}`);
        },
        getMovieImg(movie_no){
            return require(`../../../omg_back/uploads/movies/${movie_no}`); 
        },
        async getReviewList(){
            const movie_no = this.$route.params.movie_no;
            console.log("movie_no 받았나",movie_no);
            
            try{
                const response = await axios.post(`http://localhost:3000/movie/getmoviereview`,{movie_no : movie_no})
                this.reviewList = response.data;
                console.log("reviewList", this.reviewList);
                
            } catch(error){
                console.error('영화 리뷰 불러오는 도중 에러 발생');
                
            }
        },
        gotoreserve(){
            this.$router.push(`/moviebooking`);
        },

        //리뷰 좋아요 증가
        ...mapActions(['updateReLike']),
        async incrementreview(review_no, re_user_no) {
        const user_no = this.$store.state.user.user_no;
        // const re_like = this.$store.state.re_like;
        // console.log('좋아요누를떄 re_like', re_like);
        
        try {
            if(!user_no){
                this.$swal('로그인이 필요한 서비스입니다.');
                return setTimeout(() => this.$router.push('/login'), 1000);
            }

            if(user_no !== re_user_no && this.$store.state.re_like) {
                const result = await this.$swal({
                    title: '좋아요를 누르시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: '확인',
                    cancelButtonText: '취소'
                });
                if (result.isConfirmed) {
                    await axios.post(`http://localhost:3000/movie/incrementreviewlike`, { review_no: review_no });
                    // this.re_like = false;
                    this.updateReLike(false); //updateReLike 소환해서 상태변환
                    this.$router.go(0);
                    
                    // console.log('좋아요 후 re_like', this.re_like);
                }
            } else if(user_no !== re_user_no && !this.$store.state.re_like) {
                const cancelResult = await this.$swal({
                    title: '좋아요를 취소하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: '확인',
                    cancelButtonText: '취소'
                });
                if(cancelResult.isConfirmed) {
                    await axios.post(`http://localhost:3000/movie/decrementreviewlike`, { review_no: review_no });
                    // this.re_like = true;
                    this.updateReLike(true); //updateReLike 소환해서 상태변환
                    this.$router.go(0);
                    console.log('좋아요 취소 후 re_like', this.re_like);
                }
            } else {
                this.$swal('회원님의 리뷰입니다.')
            }

            } catch (error) {
                console.error('Error incrementing review like:', error);
            }
        },
        //위시리스트 추가
        async addwishlist(movie_no){
            const user_no = this.$store.state.user.user_no;
            console.log("wish====>",user_no);
            try{
                if(!user_no){
                    this.$swal('로그인이 필요한 서비스입니다.');
                    // return setTimeout(() => window.location.href="/login", 1000);
                    return setTimeout(() => this.$router.push('/login'), 1000);
                } 
                    const result = await this.$swal({
                    title: '위시리스트에 추가하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: '확인',
                    cancelButtonText: '취소'
                });
                    if(result.isConfirmed){
                        const response = await axios.post(`http://localhost:3000/movie/insertwish`,
                        {
                            wish_movie_no : movie_no,
                            wish_user_no : user_no     
                        })
                        console.log("wishdata",response.data);
                        await this.$swal(response.data.message);
                }
            }catch(error){
                console.error('위시리스트 추가 중 에러 발생');
            }

        },
        //신고용
        openReportModal(review){
            console.log('review_no', review.review_no);
            console.log('모달 열기 호출됨');
            this.banData = {
                review_no : review.review_no,
                review_comment : review.review_comment,
                re_movie_no : this.$route.params.movie_no,
                re_user_no : review.re_user_no,
                review_date : review.review_date,
                user_name : review.user_name,
                movie_title : review.movie_title
            };
            console.log("banData", this.banData);
            this.isReportOpen = true;
            // 버튼 숨기기
            document.querySelector('.prev').style.display = 'none';
            document.querySelector('.next').style.display = 'none';
        },

        closeReportModal(){
            console.log('모달 닫기 호출됨');
            this.$router.go(0);
            this.isReportOpen = false;
            // 버튼 다시 보이기
            document.querySelector('.prev').style.display = 'block';
            document.querySelector('.next').style.display = 'block';

        },

        //이름 마스킹용
        naming(username){
            if(!username){
                return '';
            }
            const making = username.slice(0,1) + '**' + username.slice(3,5);
            return making;
        },


        //슬라이드
        nextSlide() {
            if (this.currentIndex < this.maxIndex) {
                this.currentIndex++;
            }
        },
        prevSlide() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        }
    }
}
</script>

<style scoped>
h2{
    margin-bottom: 50px;
    text-align: left;
}
.moviedetail{
    width: 100%;
    min-height: 100vh; /* 뷰포트 전체 높이 */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 콘텐츠와 푸터 사이 공간 분배 */
}
.moviedetail_title{
    width:70%;
    margin:0 auto;
    margin-top:30px;
    padding-bottom: 50px;
    display: flex;
    /* border-bottom:1px solid #ccc; */
}
.moviedetail_content_title{
    width:70%;
    margin-left: 70px;
    margin-top: 20px;
    font-size:20px;

}
.movie_title{
    width:50%;
    display: block;
    margin: 0 auto;
}
h1{
    /* width:56%; */
    margin-left:10px;
    text-align: left;
}
.movie_img{
    width:50%;
    display: block;
    margin: 0 auto;
    margin-top:50px;
}

.detail_title{
    width:100%;
    font-size:36px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
}
.detail_director{
    margin-top:35px;
}

.moviedetail_content{
    display: flex;
    font-size:24px;
    width:50%;
    margin: 0 auto;
    margin-top: 30px;
    padding: 10px;
    padding-bottom:30px;
    height: 100%;
    border-bottom: 1px solid #ccc;
    /* margin-left:1050px; */
    
}

.moviedetail_content img{
    width:250px;
    height: auto;
    margin: 0 auto;
    /* margin-right: 5px; */
    margin-bottom: 20px;
}
.slider {
  position: relative;
  width: 250px; /* 3개의 이미지(250px * 3) */
  overflow: hidden;
  margin: 0 auto; /* 가운데 정렬 */
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
   /* justify-content: center; */
}

.slide {
  min-width: 250px;
  box-sizing: border-box;
}

.slide img {
  /* width: 100%; */
  height: auto;
}

.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 100;
  font-size: 18px;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.prev.disabled, .next.disabled {
  background-color: rgba(0, 0, 0, 0.2);
  cursor: not-allowed;
  opacity: 0.5;
}

.prev:disabled, .next:disabled {
  pointer-events: none;
}
.moviedetail_review{
    display: flex;
    font-size:24px;
    width:49%;
    margin: 0 auto;
    margin-top: 50px;
    height: 100%;
    /* margin-left:1050px; */
    
}

/*버튼*/
.reservebtn{
    width:200px;
    margin-top:5px;
    margin-right:10px;
    padding: 5px;
    color:white;
    border: 1px solid rgb(255, 150, 150);
    border-radius: 15px;
    background-color: rgb(255, 85, 85);
}
.reservebtn:hover{
    width:200px;
    margin-top:5px;
    margin-right:10px;
    padding: 5px;
    color:rgb(255, 77, 77);
    border: 1px solid rgb(255, 150, 150);
    border-radius: 15px;
    background-color: rgb(255, 220, 220);
}
.wishbtn{
    width:50px;
    margin-top:5px;
    margin-right:10px;
    padding: 5px;
    color:red;
    border: 1px solid rgb(255, 150, 150);
    border-radius: 50px;
    background-color: rgb(255, 255, 255);
}
.wishbtn:hover{
    width:50px;
    margin-top:5px;
    margin-right:10px;
    padding: 5px;
    color:rgb(255, 255, 255);
    border: 1px solid rgb(255, 255, 255);
    border-radius: 50px;
    background-color: rgb(255, 150, 150);
}

/*후기*/
.moviedetail_review{
    display: block;
    margin-bottom: 300px;
}
.review_content{
    position: relative;
}
.review_container{
    position: relative;
    width:100%;
}
.review_comment{
    float: left;
    width:50%;
    border:1px solid #ccc;
    padding: 15px;
}
.review_profile{
    float: left;
    padding: 0 20px;
}
.writer_name{
    float: left;
    font-size:20px;
    padding: 0 10px 0 0;
}
.writer_rate{
    font-size:20px;
}
.writer_date{
    float: left;
    font-size:16px;
    /* background-color: aqua; */
    padding-top:100px;
}
.writer_like{
    float:left;
    padding-top:99px;
    padding-left:5px;
    cursor: pointer;
    font-size:16px;
}
.writer_report{
    float:right;
    font-size:18px;
    cursor: pointer;
    /* background-color: chartreuse; */
}
.comment{
    position:absolute;
    padding-left:70px;
    width:40%;
    height: 25%;
    font-size:18px;
}
/*별점 */
.star-rating {
    display: flex;
    /* direction: rtl; */
    font-size: 20px;
}

.star {
    color: #ccc;
    /* cursor: pointer; */
}

.star.filled {
    color: gold;
}

/* explanation */
</style>
