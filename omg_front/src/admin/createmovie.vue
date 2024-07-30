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
                        <img src="../images/mainpage/영화1.png" alt="영화 메인이미지"/>
                        <input type="file" />
                    </div>
                </div>
                <div class="movie_list_right">
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                           <div class="title_wrap"><span>영화 제목:</span></div>
                                <input type="text" id="movie_title" placeholder="제목을 입력하세요">
                                <button class="searchbtn">검색</button>
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                           <div class="title_wrap"><span>영화 장르:</span></div>
                                <input type="text" id="movie_tag">
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                            <div class="title_wrap"><span>영화 감독:</span></div>
                                <input type="text" id="movie_director">                      
                        </div>
                    </div>  
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                            <div class="date_wrap"><span>영화 개봉시작:</span></div>
                                <input type="date" id="movie_startdate">
                                <div class="date_wrap"><span>영화 개봉마감:</span></div>
                                <input type="date" id="movie_enddate">          
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                            <div class="date_wrap"><span>영화 개봉시작:</span></div>
                                <input type="date" id="movie_startdate">
                                <div class="date_wrap"><span>영화 개봉마감:</span></div>
                                <input type="date" id="movie_enddate">          
                        </div>
                    </div>
                    <div class="movie_detail">
                        <div class="movie_detail_title">
                            <div class="title_wrap"><span>연령 등급:</span></div>
                                <input type="radio" name="age" value="1">전체이용가
                                <input type="radio" name="age" value="12">12+                 
                                <input type="radio" name="age" value="15">15+
                                <input type="radio" name="age" value="19">19+
                        </div>
                    </div>  
                    <div class="movie_detail">
                        <div class="comment_title"><span>상세 설명</span></div>
                        <textarea rows="8" id="movie_comment"></textarea>
                    </div>
                    <div class="movie_detail">
                        <div class="comment_title"><span>스틸컷</span></div>
                        <input type="file" id="movie_img2">
                    </div>
                </div>
            </div>
            <div class="button_wrap">
                <button class="insertbtn">등록</button>
                <button class="exit">취소</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        
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