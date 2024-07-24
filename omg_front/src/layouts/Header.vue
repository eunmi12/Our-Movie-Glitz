<template>
    <header>
        <div class="wrap">
            <div class="logo" >
                <h1>
                    <a href="">
                        <img class="img1" src="../images/logo5.png" alt="">
                    </a>
                </h1>
                <span>Our Movie Glitz</span>
            </div>
            <div class="category">
                <ul>
                    <li><a href="">로그아웃</a></li>
                    <li><a href="">My Page</a></li>
                    <li><a href="">고객센터</a></li>
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
                <input  id="search" type="text" placeholder="검색">
                <button type="button" class="search_btn"><img src="../images/search.png" alt=""></button>
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
<style>
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
    width: 300px;
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
    width: 33.3%;
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
    /* background-color: aqua; */
    width: 80%;
    height: 50px;
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
    line-height: 50px;
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

#search{
    width: 200px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding-left: 10px;
}
.menu  .search_btn{
    width: 50px;
    height: 50px;
    border: 0;
    margin-left: 10px;
    border-radius: 5px;
}
.menu ul:nth-child(2) img{
    width: 40px;
    height: 40px;
    margin: 0  auto;
}
</style>