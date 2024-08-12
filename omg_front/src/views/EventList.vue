<template>
    <div class="eventwrap">
        <div class="eventtitle">
            EVENT
        </div>
        <div class="eventcontent">
            <div class="content_wrap">
                <div class="content_detail">
                    <div class="sort">
                        <select id="sort" @change="sortoption">
                            <option id="listing" value="eventlisting">진행 중인 이벤트</option>
                            <option id="listend" value="eventlistend">종료된 이벤트</option>
                        </select>
                    </div>
                    <div class="ul_content">
                        <ul class="event_content">
                            <li v-for="(event, i) in event" :key="i">
                                <a :href="'http://localhost:8081/EventDetail/' + event.event_no" @click="upeventcnt(event.event_no)">
                                    <div class="event_img">
                                        <img :src="getImagePath2(event.event_img1)" alt="이벤트 이미지당">
                                    </div>
                                    <div class="event_text">
                                        <p class="text1">
                                            {{event.event_title}}
                                        </p>
                                        <p class="text2">
                                            {{event.event_startdate}} ~ {{event.event_enddate}}
                                        </p>
                                    </div>
                                </a>
                            </li>
                        </ul>
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
            event: [],
        };
    },
    created() {
        this.getEventList('eventlisting');
    },
    methods: {
        async getEventList(endpoint) {
            try {
                const response = await axios.post(`http://localhost:3000/user/${endpoint}`);
                const data = response.data;
                this.event = data;
                console.log('eventlist', this.event);
            } catch (error) {
                console.error('이벤트 리스트 불러오는 도중 에러 발생', error);
            }
        },
        sortoption(event) {
            const selectedValue = event.target.value;
            this.getEventList(selectedValue);
        },
        getImagePath2(imageName) {
        return require(`../../../omg_back/uploads/event/${imageName}`);
        // D:\이젠\OMG\Our-Moive-Glitz\omg_back\uploads\event
        },
        upeventcnt(event_no){
            console.log('event확인',event_no);
                try {
                     axios.post(`http://localhost:3000/user/maineventcnt`,{event_no :event_no});
                    console.log(`이벤트 번호 ${event_no}의 조회수가 증가했습니다.`);
                } catch (error) {
                    console.error(`이벤트 번호 ${event_no}의 조회수 증가 중 오류 발생:`, error);
                }
        },
    },
};
</script>

<style scoped>
.eventwrap{
    width:80%;
    margin: 0 auto;
}
.eventtitle{
    font-size:36px;
    /* margin-left:3%; */
    margin-top:100px;
    padding-bottom: 45px;
    border-bottom: 4px solid #ccc;
}
.eventcontent{
    width:100%;
}
.content_detail{
    display: flex;
    flex-direction: column;
}
.sort{
    padding-top:30px;
    text-align: right;
}
#sort{
    width: 150px;
    height: 35px;
    border: 1px solid #000;
    border-radius: 5px;
    
}
#listing #listend{
    width:30px;
    height: 40px;
    border: 1px solid #000;
    
}
.event_content{
    margin-top:20px;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    justify-content: flex-start;
    padding-left:0;
}
.event_content li:nth-child(5n+1){
    margin: 10px 0 13px 0;

}
.event_img img{
    width:256px;
    height:170px;
}

.event_content li a{
    display: block;
    width:100%;
    height:100%;
}
.event_content li{
    margin: 10px 0 13px 60px;
    background: #fff;
}
.event_text{
    min-height: 90px;
    padding-bottom: 17px;
    border: 1px solid #dddfe2;
    border-top: 0;
}
.text1{
    padding: 18px 11px 0 11px;
    height: 38px;
    vertical-align: top;
    font-size: 16px;
    text-decoration: none;
    color: #000;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
    letter-spacing: -1px;
}
.text2{
    color: #6a6f77;
    font-size: 13px;
    padding: 17px 11px 0 11px;
    letter-spacing: -0.5px;
}
</style>