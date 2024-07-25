<template>
    <div class="container">
        <MypageTop />
        <div class="mypagemain">
            <MypageSideBar />
            <div class="mypagebox">
                <div class="rev_box">
                    <p class="text1">MY 쿠폰</p>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import MypageSideBar from '../layouts/MypageSideBar.vue';
import MypageTop from '../layouts/MypageTop.vue';

export default {
    components: {
        MypageTop,
        MypageSideBar,
    }, 

}
</script>

<style scoped>
.container {
    width: 80%;

}
.mypagemain {
    display:flex;
}
.mypagebox{
    width: 100%;
    margin-left: 100px;
    margin-top: 20px;
}
.rev_box {
    border: 1px solid black;
    margin-bottom: 30px;
}
.qna_box {
    border: 1px solid black;
    margin-bottom: 30px;
}
.rev_box {
    border: 1px solid black;
}
.text1 {
    text-align: left;
    margin: 30px 500px 10px 30px;
    font-weight: bold;
    border-bottom: 1px solid rgb(179, 177, 177);
}
</style>