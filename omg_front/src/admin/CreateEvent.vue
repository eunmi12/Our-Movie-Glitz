<template>
    <div class="event">
        <div class="event_wrap">
            <div class="event_title">
                <h1 class="title"> 이 벤 트 등 록 </h1>
            </div>
        <form>
            <div class="event_content">
                <div class="event_list_right">
                    <div class="event_detail">
                        <div class="event_detail_title">
                           <div class="title_wrap"><span>이벤트 제목:</span></div>
                           <select v-model="event_event_no">
                              <option v-for="(event, i) in eventlist" :key="i" :value="event.event_no">{{event.event_title}}</option>
                           </select>
                        </div>
                    </div>
                    <div class="event_detail">
                        <div class="event_detail_title">
                           <div class="title_wrap"><span>:</span></div>
                               <select v-model="event_event_no">
                              <option v-for="(event, i) in eventlist" :key="i" :value="event.event_no">{{event.event_name}}</option>
                           </select>
                        </div>
                    </div>
                    
                    <div class="event_detail">
                        <div class="event_detail_title">
                            <div class="date_wrap"><span>이벤트 시작 날짜:</span></div>
                                <input type="time" id="event_startdate" v-model="event_starttime">
                                <div class="date_wrap"><span>이벤트 종료 날짜:</span></div>
                                <input type="time" id="event_enddate" v-model="event_endtime">          
                        </div>
                    </div>
                    <!-- <div class="event_detail">
                        <div class="comment_title"><span>상세 설명</span></div>
                        <textarea rows="8" id="event_comment"></textarea>
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
}
</script>

<style scoped>
*{
    color:#4b4b4b;
}
.event{
    width:100%;
    height: 100%;
    margin: 0 auto;
    margin-top: 100px;
}
.event_wrap{
    padding-bottom: 70px;
    padding-top:70px;
}
.event .event_wrap{
    width: 70%;
    min-width: 1000px;
    height: 80%;
    margin:0 auto;
    border: 1px solid #ccc;
    border-radius: 10px 
}
.event_wrap .title{
    width:80%;
    /* padding-top: 70px; */
    margin: 0 auto;
    /* background-color: bisque; */
}
.event_wrap .event_content{
    display: flex;
}
.event_title .title{
    text-align: center;
    font-size:65px;
}
/*event_content*/ 
.event_detail_title{
    font-size: 20px;
    padding-bottom: 5px;
}
.event_list_right {
  width: 100%;
  padding: 10px;
  padding-left:50px;
  padding-right:50px;
  padding-top: 20px;
}
.event_detail {
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
#event_startdate{
    margin-right: 10px;
}
#event_starttime{
    margin-right: 10px;
}
/*event_comment*/
.comment_title{
    border-top:1px solid #ccc;
    padding-top:15px;
}
.event_detail textarea{
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