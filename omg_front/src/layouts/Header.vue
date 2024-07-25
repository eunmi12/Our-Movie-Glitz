<template>
    <header>
        <div class="wrap">
            <div class="logo" >
                <h1>
                    <a href="http://localhost:8081/">
                        <img class="img1" src="../images/logo5.png" alt="">
                    </a>
                </h1>
                <span>Our Movie Glitz</span>
            </div>
            <div class="category">
                <ul>
                    <li><a href="http://localhost:8081/join">회원가입</a></li>
                    <li><a href="">로그아웃</a></li>
                    <li><a href="">My Page</a></li>
                    <li><a href="http://localhost:8081/help">고객센터</a></li>
                </ul>
            </div>
        </div>
        <div class="menu">
            <ul class="menu_list">
                <li><a href="">영화</a></li>
                <li><a href="">예매</a></li>
                <li><a href="">이벤트</a></li>
            </ul>
            <ul>
                <div class="total_search">
                    <input  id="search" type="text" placeholder="검색">
                    <button type="button" class="search_btn"><img src="../images/search.png" alt=""></button>
                </div>
            </ul>
        </div>
    </header>
    
</template>
<script>
export default {
    data() {
        return {
            sampleData: ''
        };
    }
}
</script>
<style scoped>
header{
    width: 100%;
    margin-top: 20px;
    margin: 0 auto;
    background-color: #f0eeda;
}
header .wrap{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
}
header .wrap .logo{
    width: 500px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    display: flex;
}
header .wrap .logo .img1{
    width: 200px;
    margin-top: 12px;
}
header .wrap .logo h1{
    width: 200px;
    font-size: 32px;
}
header .wrap .logo span{
    font-size: 28px;
    font-style: italic;
    padding-top: 25px;
    color: #c5be98;
}

header .wrap .category{
    width: 400px;
    height: 100px;
    /* display: flex; */
}
.category ul{
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    height: 100px;
    line-height: 50px;
}
.category ul li{
    width: 25%;
}
.category ul li a{
    color: #5b5a53;
    font-weight: bold;
    font-size: 16px;
}
.category ul li a:hover{
    color: #2f2e2e;
}
header .menu{
    width: 80%;
    height: 40px;
    position: absolute;
    top: 110px;
    left: 165px;
    display: flex;
    justify-content: space-between;
}
.menu .menu_list{
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    line-height: 40px;
    text-align: center;
}
.menu .menu_list li{
    width: 25%;
    
}
.menu .menu_list:nth-child(2){
    width: 280px;
    display: flex;
    padding-left: 0;
}

.menu .total_search{
    width: 300px;
    height: 40px;
    /* border: 1px solid black; */
}

#search{
    width: 200px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding-left: 10px;
    margin-top: 1px;
}
.menu  .search_btn{
    width: 30px;
    height: 30px;
    border: 0;
    margin-left: 10px;
    border-radius: 5px;
    background: white;
}
.menu ul:nth-child(2) img{
    width: 30px;
    height: 30px;
    margin: 0  auto;
}
</style>