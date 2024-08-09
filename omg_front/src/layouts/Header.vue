<template>
    <header>
        <div class="wrap">
            <div class="logo" v-if="this.user.user_auth !== 1 && this.user.user_auth !== 0">
                <h1>
                    <router-link to="/">
                        <img class="img1" src="../images/logo5.png" alt="">
                    </router-link>
                </h1>
                <span>Our Movie Glitz</span>
            </div>
            <div class="logo" v-if="this.user.user_auth === 1">
                <h1>
                    <router-link to="/">
                        <img class="img1" src="../images/logo5.png" alt="">
                    </router-link>
                </h1>
                <span>Our Movie Glitz</span>
            </div>
            <div class="logo" v-if="this.user.user_auth === 0">
                <h1>
                    <router-link to="/admin">
                        <img class="img1" src="../images/logo5.png" alt="">
                    </router-link>
                </h1>
                <span>Our Movie Glitz</span>
            </div>
            <div class="category">

                <!-- // <li><a href="">로그아웃</a></li>
                   // <li><a href="">My Page</a></li>
                   // <li @click="gotohelp()"><a>고객센터</a></li> -->

                    <!-- <li><a href="http://localhost:8081/login">로그인</a></li>
                    <li><a href="http://localhost:8081/mypagemain">My Page</a></li>
                    <li><a href="http://localhost:8081/help/notice">고객센터</a></li> -->

                <ul v-if="this.user.user_auth !== 1 && this.user.user_auth !== 0">
                    <li><router-link to="/login">로그인</router-link></li>
                    <li><router-link to="/join">회원가입</router-link></li>
                    <li><router-link to="/help/notice">고객센터</router-link></li>

                </ul>
                <ul v-if="this.user.user_auth === 1">                    
                    <li><router-link to="/" @click="logout">로그아웃</router-link></li>
                    <li><router-link :to="`/mypagemain/${user.user_no}`">My Page</router-link></li>
                    <li><router-link to="/help/notice">고객센터</router-link></li>
                </ul>
                <ul v-if="this.user.user_auth === 0">                    
                    <li><router-link to="/" @click="logout">로그아웃</router-link></li>
                    <li><router-link :to="`/admin`">Admin</router-link></li>
                    <li><a @click="gotohelp()">고객센터</a></li>
                    <!-- <li><router-link :to="`/mypagemain/${user.user_no}`">My Page</router-link></li>
                    <li><router-link to="/help/notice">고객센터</router-link></li> -->
                </ul>
            </div>
        </div>
        <div class="menu">
            <div class="menu_wrap">
                <ul v-if="this.user.user_auth !== 1 && this.user.user_auth !== 0" class="menu_list">
                    <li><a href="http://localhost:8081/movielist">영화</a></li>
                    <li><a  href="http://localhost:8081/moviebooking">예매</a></li>
                    <li><a href="http://localhost:8081/eventlist">이벤트</a></li>
                </ul>
                <ul v-if="this.user.user_auth === 1" class="menu_list">
                    <li><a href="http://localhost:8081/movielist">영화</a></li>
                    <li><a  href="http://localhost:8081/moviebooking">예매</a></li>
                    <li><a href="http://localhost:8081/eventlist">이벤트</a></li>
                </ul>
                <!-- <ul>
                    <div class="total_search">
                        <input  id="search" type="text" placeholder="검색">
                        <button type="button" class="search_btn"><img src="../images/search.png" alt=""></button>
                    </div>
                </ul> -->
            </div>
        </div>
    </header>
    
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    computed:{
        user() {
            return this.$store.state.user;       
        },        
    },
    methods: {
        ...mapMutations(['setUser']),
        gotohelp() {
            this.$router.push({ path: '/help/notice'});
        },
        logout(){
            this.setUser({ user_id: '', user_no: '', user_auth: '' });
            localStorage.clear();
            // window.location.href ="/login"
        }
    },
    mounted() {
        console.log("this.user.user_auth",this.user.user_auth);
    }
}
</script>
<style scoped>
header{
    width: 100%;
    margin-top: 20px;
    margin: 0 auto;
    margin-bottom: 70px;
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
    width: 30%;
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
    width: 100%;
    height: 50px;
    position: absolute;
    top: 110px;
    margin-bottom: 5px;
    border-bottom: 1px solid rgb(242, 242, 242);
}
.menu_wrap{
    width: 80%;
    height: 40px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
}
.menu_list{
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