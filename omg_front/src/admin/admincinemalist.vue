<template>
    <div class="cinema">
    <AdminpageSidebar />
        <div class="cinema_wrap">
            <div class="cinema_title">
                <h1 class="title"> 상 영 정 보 </h1>
            </div>
            <div class="cinema_list">
                <table>
                    <thead>
                        <tr class="list_title">
                            <th class="cinema_no">상영관 번호</th>
                            <th class="cinema_name">상영관 이름</th>
                            <th class="cinema_update">수정하기</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cinema,i) in cinemalist" :key="i">
                            <th class="cinema_no">{{cinema.cinema_no}}</th>
                            <th class="cinema_name">{{cinema.cinema_name}}</th>
                            <th class="cinema_update"><button class="update" @click="update">수정</button></th>
                        </tr>
                    </tbody>
                </table> 
            </div>
            <div class="button_insert">
                <button class="insert" @click="insert">등록</button>
            </div>
        </div>
    </div>
</template>
<script>
import AdminpageSidebar from "../layouts/AdminpageSidebar.vue";
import axios from 'axios';

export default {
    components: {
    AdminpageSidebar
    },
    data(){
        return{
            cinemalist:[],
        };
    },
    created(){
        this.getCinemaList();
    },
    methods:{
        async getCinemaList(){
           try{ 
            const response = await axios.post(`http://localhost:3000/admin/cinemalist`)
            const data = response.data;
            this.cinemalist = data;
            console.log('cinemalist', this.cinemalist);
           }
           catch{
            console.error('상영관 리스트 불러오는 도중 에러발생',error);
           }
        },
        
    }
}
</script>

<style scoped>
.cinema{
    display: flex;
    width:100%;
}
.cinema_wrap{
    width:40%;
    margin:0 auto;
}
.cinema_title{
    margin: 150px 80px 30px 0;
}
.cinema_list{
    /* display:flex; */
  border-bottom: 1px solid #d4cdcd;
  /* border-top: 1px solid #d4cdcd; */
}
.cinema_list table {
    width: 100%;
  /* border-collapse: collapse; 테이블 셀 간의 간격 제거 */
}

.cinema_list th, .cinema_list td {
    border-bottom: 1px solid #d4cdcd; 
    padding: 10px;
    text-align: center;
}

.cinema_no{
    width: 20%;
    padding-right:40px;
    
    text-align: center;
}
.cinema_name{
    width:20%;
    text-align: center;
}
.cinema_update{
    width:20%;
    text-align: center;
}
.update{
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: rgb(0, 0, 0);
    background-color: #e0e0e0;
    border-radius: 5px;
    cursor: pointer;
    /* margin-right: 10px; */
}
.update:hover{
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color:  #e0e0e0;
    background-color: rgb(0, 0, 0);
    border-radius: 5px;
    cursor: pointer;
    /* margin-right: 10px; */
}
.button_insert{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px; /* 필요에 따라 조정 가능 */
}
.insert{
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: white;
    background-color: #58aeff;
    border-radius: 5px;
    cursor: pointer;
    /* margin-right: 10px; */
}
.insert:hover{
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: #ffffff;
    background-color: #2294ff;
    border-radius: 5px;
    cursor: pointer;
    /* margin-right: 10px; */
}
</style>