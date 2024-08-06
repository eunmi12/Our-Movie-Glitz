<template>
    <div class="eventwrap">
        <div class="eventtitle">
            EVENT
        </div>
        <div class="eventcontent">
            <div class="eventimg">
                이미지<img style="width:256px height:170px;" src="../images/mainpage/events/1-0.png">
                <div>
                    내용
                </div>
            </div>
            <div class="eventimg">
                <img style="width:256px height:170px;" src="../images/mainpage/events/이벤트3.jpg">
                <div>
                    내용
                </div>
            </div>
            

        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.eventwrap{
    width:80%;
    margin: 0 auto;
}
.eventtitle{
    font-size:36px;
    margin-left:3%;
    margin-top:100px;
    padding-bottom: 45px;
    border-bottom: 4px solid #ccc;
}
.eventcontent{
    width:100%;
    display: flex;
    flex-wrap: wrap;
}
</style>