<template>
    <div class="good">
      <div class="carousel">
        <img src="../images/mainpage/movie/액션1.png" alt="">
        <!-- <video src="../videos/영화1.mp4" autoplay muted loop><a href=""></a></video> -->
        <!-- <video src="../videos/영화1.mp4"><a href=""></a></video> -->
        <strong class="main_name">파일럿</strong>
        <span class="main_sname">파일럿의 상세내용 입니다.<br>asdsadsadasdsadsa</span>
        <div class="main_select"><a href="" id="select">상세보기</a></div>
      </div>
  
      <div class="list">
        <div class="contents">
          <h3>MOVIE</h3>
          <ul class="menu_list">
            <li v-for="(tag, index) in tags" :key="index">
              <dl class="type">
                <dt>
                  <span>{{ tag }}</span>
                  <a href="" class="btn_more">더보기</a>
                </dt>
                <dd v-for="movie in movielists[index]" :key="movie.movie_no">
                  
                  <a href="">
                    <div class="img_wrap" data-scale="false">
                      <img :src="getImagePath(movie.movie_img0)" alt="영화 이미지">
                    </div>
                    <div class="img_wrapinfo">
                      <span>{{ movie.movie_title }}</span>
                      <strong >{{ movie.review_rate ? movie.review_rate +'점': '평점 정보 없음' }}</strong>
                    </div>
                  </a>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
  
      <div class="events">
        <div class="contents">
          <div class="event_name">
            <h3>EVENTS</h3>
            <a href="" class="event_all">더보기</a>
          </div>
          <div class="event_title">
            <div  v-for="event in limitedEventlists" :key="event.event_no"  class="event_box1" >

              <div class="event_box2">
                <div class="event_box3">
                    <a href="">
                        <div class="img_wrap1">
                            <img :src="getImagePath2(event.event_img1)" alt="이벤트 이미지당">
                            <!-- <img :src="require(`../images/mainpage/${event.event_img1}`)" > -->
                        </div>
                        <div class="event_info">
                        <strong>{{event.event_title}}</strong>
                        <span>{{ event.event_startdate }} ~ {{ event.event_enddate }}</span>
                        </div>
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tags: ['액션', '가족', '로맨스', '공포', '코미디'], // 태그 배열
        movielists: [[], [], [], [], []], // 태그별 영화 목록 배열
        eventlists: [],
      };
    },
    created() {
      this.tags.forEach((tag, index) => {
        this.fetchMovielist(tag, index);
      }),
      this.fechEventlist();
    },
    computed: {
    limitedEventlists() {
      return this.eventlists.slice(0, 4); // 최대 4개의 요소만 반환
    }
  },
    methods: {
      fetchMovielist(tag, index) {
        axios.get(`http://localhost:3000/movie/movielist/${tag}`)
          .then(response => {
            console.log(`Movies fetched for tag ${tag}:`, response.data);
            this.movielists[index] = response.data; // movielists 배열에 데이터 설정
          })
          .catch(error => {
            console.error(`Error fetching movielist for tag ${tag}:`, error);
          });
      },
      fechEventlist() {
        axios.get(`http://localhost:3000/user/eventlist`)
        .then(response => {
          console.log('Events feched forasdas:', response.data);
          this.eventlists = response.data;
        })
        .catch(error => {
            console.error('Error fetching movielist for tag :', error);
          });
      },
      getImagePath(imageName) {
        return(`https://image.tmdb.org/t/p/w500/${imageName}`);
      },
      getImagePath2(imageName) {
        return require(`../images/mainpage/events/${imageName}`);
      },
    },
  };
  </script>
  
<style scoped>
 /* 전체 캐러셀 컨테이너 스타일 */
 .carousel {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: auto; /* 또는 원하는 높이 */
    }

    .carousel video {
      width: 100%; /* 또는 원하는 너비 */
      height: 650px; /* 또는 원하는 높이 */
      object-fit: cover; /* 동영상이 컨테이너를 채우도록 설정 */
    }
.carousel .main_name{
    position: absolute; /* 위치를 절대적으로 설정하여 부모 요소를 기준으로 위치 지정 */
    top: 170px; /* 상단에서 170px 떨어진 위치에 배치 */
    left: 200px; /* 좌측에서 0px 떨어진 위치에 배치 */
    font-weight: 700; /* 글씨 두께를 굵게 설정 */
    font-size: 40px; /* 글씨 크기를 40px로 설정 */
    color: #fff; /* 글씨 색상을 흰색으로 설정 */
    line-height: 1.450em; /* 줄 높이를 1.45배로 설정하여 텍스트 줄 간격 조정 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.72); /* 텍스트에 그림자를 추가하여 가독성을 높임 (2px의 수평 및 수직 그림자, 4px의 흐림) */
    z-index: 2; /* z-축에서 요소의 우선순위를 높여서 다른 요소 위에 표시되도록 설정 */
    pointer-events: none; /* 포인터 이벤트를 무시하여 클릭이 다른 요소로 전달되도록 설정 */
}
.carousel .main_sname{
    display: -webkit-box;
    overflow: hidden;
    position: absolute;
    top: 239px;
    left: 200px;
    max-width: 100%;
    width: 230px;
    font-size: 20px;
    color: #fff;
    line-height: 1.450em;
    text-overflow: ellipsis;
    z-index: 3;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    pointer-events: none;
}
.carousel .main_select{
    display: inline-flex;
    position: absolute;
    top: 315px;
    left: 200px;
    z-index: 4;
}
#select{
    display: block;
    padding: 5px 30px 5px 18px;
    font-size: 14px;
    color: #343434;
    line-height: 1.429em;
    background: rgba(255, 255, 255, 0.8) calc(100% - 11px) center / 8px 13px scroll no-repeat;
    border-radius: 15px;
}


.list{
    padding: 60px 0 0;
}
#container .contents{
    width: 980px;
    height: 100%;
    margin: 0 auto;
}
.contents h3{
  display: flex;
  justify-content: flex-start;
  margin-left: 160px;
}
.menu_list{
    display: flex;
    justify-content: flex-start;
    margin-top: 50px;
    padding: 0;
    margin-left: 160px;
}
.menu_list li{
    width: 270px;
    padding: 20px 19px 30px;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
}
.menu_list >li~li{
    margin-left: 25px;
}
.type{
    font-family: 'Noto Sans KR', 'CJONLYONENEW', '맑은 고딕', '돋움', Dotum, sans-serif;
    font-size: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    word-break: break-all;
}
.type dt{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    color: #222;
    line-height: 1.450em;
}
.type dt .btn_more{
    padding: 2px 15px 3px;
    font-weight: 400;
    font-size: 12px;
    color: #666;
    line-height: 1.417em;
    border: 1px solid #f4f4f4;
    border-radius: 11px;
    margin-left: 100px;

}
.type dd:first-of-type {
      margin-top: 27px;
    }

    .type dd:not(:first-of-type) {
      margin-top: 20px;
    }
    .type dd a {
  display: flex; /* img_wrap과 img_wrapinfo를 같은 행에 배치 */
  align-items: center; /* 수직으로 가운데 정렬 */
}
.type dd a .img_wrap{
    position: relative;
    width: 75px;
    height: 95px;
    border-radius: 5px;
}
.img_wrap{
    position: relative;
    overflow: hidden;
}
.img_wrap > img{
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: translate(0, -50%);
}
.type dd a .img_wrapinfo{
    display: inline-flex;
    flex-direction: column;
    padding-left: 15px;
}
.type dd a .img_wrapinfo span{
    font-weight: 500;
    font-size: 14px;
    color: #222;
    line-height: 1.429em;
}
.type dd a .img_wrapinfo strong{
    font-weight: 700;
    font-size: 16px;
    color: #222;
    letter-spacing: -0.020em;
    line-height: 1.444em;
}
.events{
    overflow: hidden;
    position: relative;
    padding: 60px 0 100px;
}
.event_name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
}


.event_name .event_all{
    margin-top: 0; /* 추가적인 상단 여백을 제거합니다 */
    float: right;
    margin-top: 4px;
    margin-right: 120px;
    padding: 4px 28px 4px 28px;
    font-size: 14px;
    color: #222;
    line-height: 1.429em;
    background: transparent calc(100% - 7px) center / 8px 13px scroll no-repeat;
    border: 1px solid #e2e2e2;
    border-radius: 15px;
    box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.05);
}
.event_title {
  margin-top: 20px;
  display: flex;
}

.event_box1{
  width: 400px;
  height: 280px;
  display: flex;
  justify-content: flex-start;
  /* margin-top: 50px; */
  /* padding: 0px 20px 0px 20px; */
  margin-left: 160px;
  /* border: 1px solid #000; 테두리 스타일 추가 */
  box-sizing: border-box; /* 테두리 포함 */
  border-radius: 5px;
  
}
.event_box1:not(:first-child) {
  margin-left: 10px; /* 첫 번째 이외의 요소들 */
  /* border: 1px solid #000; 테두리 스타일 추가 */
/* padding: 10px; */
}
.event_box2 {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0px 10px 50px 0px ; 상 우 하 좌 */
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.event_box3 {
  height: 100%;
  border-radius: 10px;
}

.event_box3 a {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  /* padding:0px 30px ; */
}

.img_wrap1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.img_wrap1 img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;

}

.event_info {
  text-align: left;
  margin-top: 10px;
}

.event_info strong {
  display: block;
  font-size: 1.2em;
}

.event_info span {
  display: block;
  margin-top: 5px;
  font-size: 1em;
  color: #666;
}
</style>
  