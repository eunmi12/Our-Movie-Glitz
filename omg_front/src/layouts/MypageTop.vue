<template>
    <div class="container1">
        <div class="user">
            <img class="img1" src="../images/search.png">
            <span>홍길동님은</span>
            <span> 일반 고객 입니다.</span>
        </div>
        <div class="container2">
            <div class="coupon">
                <div class="text3">MY COUPON</div><br/>
                <div class="text4">할인쿠폰 개</div>
            </div>
            <div class="point">
                <div class="text5">VIP 점수</div>
                <div class="text6">VIP 누적 점수</div>
            </div>
            <div class="wish">
                <img class="text7" src="../images/heart.png">
                <div class="text8">관심 영화</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container1 {
    width: 40%;
    height: 300px;
    margin: 100px auto;
    border: 1px solid black;
}
.img1 {
    width: 50px;
    height: 50px;
    margin: 50px 50px 50px 0px;
}
.container2 {
    border-top: 1px solid black;
    display: flex;
}
.text3 {
    margin: 15px 35px 15px 35px;
    font-size: 20px;
    font-weight: bold;
}
.text5 {
    margin: 15px 35px 15px 35px;
    font-size: 20px;
    font-weight: bold;
}
.text6 {
    margin-top: 30px;
}
.text7 {
    margin: 15px auto;
}
.text8 {
    font-weight: bold;
}
.coupon{
    flex: 1;
    border-right: 1px solid black;
}
.point {
    flex: 1;

}
.wish {
    flex: 1;
    border-left: 1px solid black;
}
</style>