<template>
    <div class="movie-booking">
        <h1>영화 예매</h1>
        <!-- Step 1: 영화 선택 -->
        <div v-if="currentStep === 1">
            <h2>영화 선택</h2>
            <ul>
                <li v-for="movie in movies" :key="movie.id" @click="selectMovie(movie)">{{ movie_title }}</li>
            </ul>
        </div>
        <!-- Step 2: 날짜 선택 -->
         <div v-if="currentStep === 2">
            <h2>날짜 선택</h2>
            <ul>
                <!-- date를 시작일과 종료일로 계산해서 넣어야 됨 -->
                <li v-for="date in dates" :key="date" @click="selectDate(date)">{{ date }}</li>
            </ul>
         </div>
         <!-- Step 3: 시간 선택 -->
          <div v-if="currentStep === 3">
            <h2>시간 선택</h2>
            <ul>
                <li v-for="time in times" :key="time" @click="selectTime(time)">{{  }}</li>
            </ul>
          </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        };
    }
}
</script>