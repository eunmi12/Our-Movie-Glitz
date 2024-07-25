<template>
    <div class="container">
        <MypageTop />
        <div class="mypagemain">
            <MypageSideBar />
            <div class="mypagebox">
                <div class="rev_box">
                    <div class="text1">비밀번호 확인</div>
                    <div class="text2">고객님의 개인정보 보호를 위한 절차이오니, OMG 로그인 시 사용하는 비밀번호를 입력해 주세요.</div>
                    <div class="id_check">
                        <div class="id"> ghlckd1999</div>
                        <div class="pw"> zzz</div>
                    </div>
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
    padding-left: 30px;
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
    margin: 20px auto;
    font-weight: bold;
    border-bottom: 1px solid rgb(179, 177, 177);
}
.text2 {
    text-align: left;
    margin: auto;
    font-weight: bold;
    border-bottom: 1px solid rgb(179, 177, 177);
}
</style>