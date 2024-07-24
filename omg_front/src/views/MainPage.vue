<template>
    <div>
    <div class="carousel"> 
         <!-- 슬라이드 이미지들을 담는 컨테이너 -->
      <div class="slides" :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }">
        <div class="slide" v-for="(images, index) in images" :key="index">
            <!-- 메인 이미지 요소 -->
          <img :src="require(`../images/mainpage/${images}`)" :alt="'Slide ' + (index + 1)">
        </div>
      </div>
      <button style="color: black; font-size: 50px;"  class="prev" @click="changeSlide(-1)">◀</button>
      <button style="color: black; font-size: 50px;" class="next" @click="changeSlide(1)">▶</button>
    </div>
    <div class="list">
        <div class="movie">
        <div class="menu_list1">
                <a href="">액션1</a>
                <p>액션 영화 1 제목입니다</p>
                <a href="">액션2</a>
                <a href="">액션3</a>
        </div>
            <div class="menu_list2">
                <a href="">코미디1</a>
                <a href="">코미디2</a>
                <a href="">코미디3</a>
            </div>
            <div class="menu_list3">
                <a href="">가족1</a>
                <a href="">가족2</a>
                <a href="">가족3</a>
            </div>
    </div>
    </div>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        currentIndex: 0,
        slideWidth: 1000,
        slideInterval: 5000,
        images: ['영화1.png', '영화2.png', '영화3.png', '영화4.png' ,'영화5.png'], // 이미지 파일명 배열
      };
    },
    mounted() {
      setInterval(() => {
        this.changeSlide(1);
      }, this.slideInterval);
    },
    methods: {
      changeSlide(direction) {
        const slideCount = this.images.length;
        this.currentIndex = (this.currentIndex + direction + slideCount) % slideCount;
      }
    }
  };
</script>
  
<style scoped>
 /* 전체 캐러셀 컨테이너 스타일 */
.carousel {
  width: 1000px; /* 캐러셀 전체 너비 */
  margin: auto; /* 가운데 정렬을 위한 마진 설정 */
  margin-top: 50px; /* 위쪽 마진 설정 */
  overflow: hidden; /* 넘치는 부분 숨김 처리 */
  position: relative; /* 상대적 위치 지정 */
}

/* 슬라이드 그룹 컨테이너 스타일 */
.slides {
  display: flex; /* 플렉스 박스 사용하여 슬라이드 정렬 */
  transition: transform 0.5s ease-in-out;  /* 슬라이드 전환 속도 설정 */
  width: 3000px; /* 슬라이드 전체 너비: 1000px * 3 (슬라이드 개수) */
}

/* 각 슬라이드 요소 스타일 */
.slide {
  min-width: 1000px; /* 각 슬라이드 최소 너비 지정 */
  box-sizing: border-box; /* 박스 크기 계산을 경계와 패딩 포함하여 설정 */
}

/* 슬라이드 이미지 스타일 */
.slide img {
  width: 1000px; /* 이미지 너비 고정 */
  height: 500px; /* 이미지 높이 설정 */
  object-fit: fill; /* 이미지 비율 유지 및 크기 조정 */
  border-radius: none; /* 이미지 모서리 둥글게 설정 */
}

/* 이전 버튼 스타일 */
.prev, .next {
  position: absolute; /* 절대적 위치 지정 */
  top: 50%; /* 상단에서 50% 위치 */
  transform: translateY(-50%); /* Y축 기준으로 가운데 정렬 */
  background-color: rgba(0, 0, 0, 0); /* 배경색 투명 설정 */
  color: white; /* 텍스트 색상 흰색 설정 */
  border: none; /* 테두리 없음 */
  padding: 10px; /* 패딩 설정 */
  cursor: pointer; /* 마우스 커서 포인터로 변경 */
}

/* 이전 버튼 위치 왼쪽으로 설정 */
.prev {
  left: 0;
}

/* 다음 버튼 위치 오른쪽으로 설정 */
.next {
  right: 0;
}
.movie{
    display:flex;
    justify-content: center;
}

.list .menu_list1{
    width: 100%;
    flex-wrap: wrap;
    line-height: 50px;
    text-align: center;
    flex-direction: column;
    display:flex;
}
.list .menu_list2{
    width: 100%;
    flex-wrap: wrap;
    line-height: 50px;
    text-align: center;
    flex-direction: column;
    display:flex;
}
.list .menu_list3{
    width: 100%;
    flex-wrap: wrap;
    line-height: 50px;
    text-align: center;
    flex-direction: column;
    display:flex;
}
.list .menu_list li{
    width: 25%;
    
}
.list .menu_list:nth-child(2){
    width: 280px;
    display: flex;
    padding-left: 0;
}

</style>
  