<template>
    <div class="movie_wrap">
        <div class="movie_title">
            <h1 class="title">MOVIE</h1>
        </div>
        <div class="movie_content">
            <div class="content_wrap">
                <div class="content_detail">
                    <div class="sort">
                        <select name="sort_movie" id="sort_movie" @change="sortoption">
                            <!-- <option id="reservation" value="reservation">예매순</option> -->
                            <option id="enddate" value="enddate">개봉마감순</option>
                            <option id="ranking" value="ranking">평점순</option>
                        </select>
                    </div>
                    <div class="ul_content">
                        <ul class="movie_content_ul">
                            <li class="movie_content_li" v-for="(movie, i) in pagingData" :key="i">
                                <a :href="`/MovieDetail/${movie.movie_no}`">
                                    <div class="movie_img">
                                        <img :src="getImagePath(movie.movie_img0)" alt="">
                                    </div>
                                    <div class="movie_text">
                                        <p class="title_movie">{{ movie.movie_title }}</p>
                                        <p v-if="movie.review_rate !== null" class="score_movie">평점 : {{ movie.review_rate }}/5</p>
                                        <p v-else class="score_movie">평점 : 0/5</p>
                                        <p class="info_movie">개봉일 : {{ movie.movie_startdate.toString().split('T')[0] }}</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <br>
            <div class="pagination">
                <ul class="number_box">
                    <li @click="prevPageGroup" :class="{disabled: currentPageGroup === 1}"><img src="../images/prev.png"/></li>
                    <li v-for="page in currentGroupPages" :key="page" @click="changePage(page)" :class="{active: page === currentPage}">
                    {{ page }}</li>
                    <li @click="nextPageGroup" :class="{disabled: currentPageGroup === pageGroups.length}"><img src="../images/next.png"/></li>
                </ul>
            </div>
            <div class="top" >
                <button @click="gototop">top</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';


export default {
    data() {
        return {
            movie: [],
            currentPage:1,
            itemsPerPage:12,
            currentPageGroup: 1,
        };
    },
    created() {
        this.getMovieList('enddate');
    },
    computed:{
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        pagingData(){
            const start = (this.currentPage -1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.movie.slice(start, end);
        },
        totalPages(){
            return Math.ceil(this.movie.length / this.itemsPerPage);
        },
        pageGroups(){
            const groups = [];
            for (let i = 1; i<=this.totalPages; i +=10){
                groups.push({
                    start: i,
                    end: Math.min(i+9, this.totalPages),
                });
            }
            return groups;
        },
        currentGroupPages(){
            const group = this.pageGroups[this.currentPageGroup - 1];
            if(group){
                return Array.from({ length: group.end - group.start + 1}, (_, i) => group.start + i);
            }
            return[];
        },
    },
    methods: {
        //title,movie_startdate, reviw_rate(avg), movie_img0
        async getMovieList(endpoint){
            try{
                const res = await axios.post(`http://localhost:3000/movie/${endpoint}`);
                const data = res.data;
                this.movie = data;
                console.log('movielist:----->',this.movie);
            } catch(err){
                console.error('영화 리스트를 불러오는 도중 에러 발생', err);
                
            }
        },
        getImagePath(imageName) {
            return(`https://image.tmdb.org/t/p/w200/${imageName}`);
        },
        changePage(page){
            if(page > 0 && page <= this.totalPages){
                this.currentPage = page;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
        prevPage(){
            if(this.currentPage > 1 ){
                this.changePage(this.currentPage - 1);
            }
        },
        nextPage(){
            if(this.currentPage < this.totalPages) {
                this.changePage(this.currentPage + 1);
            }
        },
        prevPageGroup(){
            if(this.currentPageGroup > 1){
                this.currentPageGroup--;
                this.changePage(this.pageGroups[this.currentPageGroup - 1 ].start);
            }
        },
        nextPageGroup(){
            if(this.currentPageGroup < this.pageGroups.length){
                this.currentPageGroup ++;
                this.changePage(this.pageGroups[this.currentPageGroup - 1].start)
            }
        },
        sortoption(movie) {
            const selectedValue = movie.target.value;
            this.getMovieList(selectedValue);
        },
        gototop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
}
</script>
<style scoped>
.movie_wrap{
    width: 80%;
    margin: 0 auto;
}
.movie_title{
    margin-top: 100px;
    padding-bottom: 45px;
    border-bottom: 4px solid #ccc;
}
.movie_title .title{
    font-size: 36px;
}

.movie_content{
    width: 100%;
}
/* .content_wrap{

} */
.content_detail{
    display: flex;
    flex-direction: column;
}
.sort{
    padding-top: 30px;
    text-align: right;
}
#sort_movie{
    width: 100px;
    height: 35px;
    border: 1px solid #000;
    border-radius: 5px;
    text-align: center;    
}
#enddate ,#ranking{
    width: 30px;
    height: 40px;
    border: 1px solid #000;
}

.ul_content{
    width: 100%;
    padding-top: 10px;
}
.movie_content_ul{
    margin-top: 20px;
    padding-left: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개의 열을 배치 */
    gap: 20px;                             /* 아이템 간의 간격 */
    padding-left: 0;  
}
.movie_content_li{
    /* margin: 10px 0 13px 80px; */
    width: 200px;
    margin: 0 auto;
    background: #fff;
}

.movie_img img{
    border-radius: 10px;
    height: 285px;
    object-fit: cover;
}
/* .movie_content_li:nth-child(4n+1){
    margin: 10px 0 13px 0;
} */

.title_movie{
    white-space: nowrap;           /* 한 줄로 표시하고 줄 바꿈을 하지 않음 */
    overflow: hidden;              /* 컨테이너를 벗어나는 텍스트를 숨김 */
    text-overflow: ellipsis;       /* 텍스트가 넘칠 경우 ...으로 표시 */
    width: 200px;                   /* 부모 요소에 맞게 너비 설정 */
    display: block;  
    font-size: 16px;
}

p{
    margin-top: 10px;
    margin-bottom: 5px;
}


.pagination {
    width: 100%;
    text-align: center;
    padding-top: 10px;
    display: flex;
    justify-content: center;
}

.pagination .number_box {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
}

.number_box li {
    width: 25px;
    height: 25px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.number_box li.active {
    background-color: #f0eeda;
    border-radius: 5px;
    color: black;
}

.number_box img {
    width: 15px;
    padding-bottom: 5px;
}

.top{
    position: fixed;
    bottom: 30px;
    right: 180px;
    z-index: 999;
}
.top button{    
    width: 60px;
    border-radius: 10px;
}
</style>