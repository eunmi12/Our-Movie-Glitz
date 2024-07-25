<template>
    <div>
    <div class="carousel"> 
          <!-- <video src="../videos/영화1.mp4" autoplay muted loop><a href=""></a></video> -->
          <img src="../images/mainpage/영화1.png">
          <strong class="main_name">파일럿</strong>
          <span class="main_sname">파일럿의 서브 내용입니다ddddddddddddddd</span>
    </div>
    <div class="list">
        <div class="movie">
        <div class="menu_list">
                <a href="" class="link"><img class="img" src="../images/mainpage/영화1.png" alt="">
                    <p class="chart"><span>액션 영화 1 제목입니다</span></p>
                </a>
                <a href="" class="link"><img class="img" src="../images/mainpage/영화1.png" alt="">
                    <p class="chart"><span>액션 영화 2 제목입니다</span></p>
                </a>
                <a href="" class="link"><img class="img" src="../images/mainpage/영화1.png" alt="">
                    <p class="chart"><span>액션 영화 3 제목입니다</span></p>
                </a>
        </div>
            <div class="menu_list">
                <a href="" class="link"><img class="img" src="../images/mainpage/영화2.png" alt="">
                    <p class="chart"><span>코미디 영화 1 제목입니다</span></p>
                </a>
                <a href="" class="link"><img class="img" src="../images/mainpage/영화2.png" alt="">
                    <p class="chart"><span>코미디 영화 2 제목입니다</span></p>
                </a>
                <a href="" class="link"><img class="img" src="../images/mainpage/영화2.png" alt="">
                    <p class="chart"><span>코미디 영화 2 제목입니다</span></p>
                </a>
            </div>
            <div class="menu_list">
                <a href="" class="link"><img class="img" src="../images/mainpage/영화3.png" alt="">
                    <p class="chart"><span>가족 영화 1 제목입니다</span></p>
                </a>
                <a href="" class="link"><img class="img" src="../images/mainpage/영화3.png" alt="">
                    <p class="chart"><span>가족 영화 2 제목입니다</span></p>
                </a>
                <a href="" class="link"><img class="img" src="../images/mainpage/영화3.png" alt="">
                    <p class="chart"><span>가족 영화 3 제목입니다</span></p>
                </a>
            </div>
    </div>
    </div>
    </div>
  </template>
  
<script>
  export default {
   
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
      height: 500px; /* 또는 원하는 높이 */
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
    white-space: nowrap;
    overflow: hidden; /* 넘치는 콘텐츠를 숨깁니다 */
    position: absolute; /* 위치를 절대적으로 설정하여 부모 요소를 기준으로 위치 지정 */
    top: 239px; /* 상단에서 239px 떨어진 위치에 배치 */
    left: 200px; /* 좌측에서 0px 떨어진 위치에 배치 */
    max-width: 100px; /* 최대 너비를 100%로 설정하여 부모 요소의 너비에 맞게 확장 */
    font-size: 20px; /* 글씨 크기를 20px로 설정 */
    color: #fff; /* 글씨 색상을 흰색으로 설정 */
    line-height: 1.450em; /* 줄 높이를 글씨 크기의 1.45배로 설정하여 텍스트 줄 간격 조정 */
    text-overflow: ellipsis; /* 넘치는 텍스트를 '...'으로 표시 */
    z-index: 3; /* z-축에서 요소의 우선순위를 설정하여 다른 요소 위에 표시되도록 설정 */
    pointer-events: none; /* 포인터 이벤트를 무시하여 클릭이 다른 요소로 전달되도록 설정 */
    height: 80px;
}
.carousel .move_movie{
    pointer-events: painted;
}
.movie{
    padding: 0px 300px;
    display:flex;
    justify-content: center;
}
.movie .link {
    width: 100px;

    margin: 100px;
    padding: 5px;
}
.movie .img{
    width: 100px;
    height: 150px;
    object-fit: fill; /* 이미지 비율 유지 및 크기 조정 */
}
.movie .menu_list{
    margin: 10px;
    padding: 20px 19px 30px;;
    border: 2px solid #e4e4e4;;
    border-radius: 10px;
    width: 100%;
    line-height: 50px;
    text-align: center;
    flex-direction: column;

}

/* .movie .menu_list2{
    width: 100%;
    flex-wrap: wrap;
    line-height: 50px;
    text-align: center;
    flex-direction: column;
    display:flex;
}
.movie .menu_list3{
    width: 100%;
    flex-wrap: wrap;
    line-height: 50px;
    text-align: center;
    flex-direction: column;
    display:flex;
} */

</style>
  