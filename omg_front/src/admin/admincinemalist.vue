<template>
    <div class="cinema">
    <AdminpageSidebar />
        <div class="cinema_wrap">
            <div class="cinema_title">
                <h1 class="title">상영 관리</h1>
            </div>
            <div class="cinema_list">
                <table>
                    <thead>
                        <tr class="list_title" v-if="cinemalist.length > 0">
                            <th class="cinema_no">상영관 이름</th>
                            <th class="cinema_name">영화 제목</th>
                            <th class="cinema_name">상영 날짜</th>
                            <th class="cinema_name">상영 시간</th>
                            <th class="cinema_update">삭제하기</th>
                        </tr>
                        <tr class="no_cinema" v-else> 상영 정보를 등록해주세요</tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cinema,i) in pagingData" :key="i">
                            <th class="cinema_no">{{cinema.cinema_name}}</th>
                            <th class="cinema_no">{{cinema.movie_title}}</th>
                            <th class="cinema_name">{{cinema.screen_date}}</th>
                            <th class="cinema_name">{{cinema.cinema_time}}</th>
                            <th class="cinema_update"><button class="update" @click="deletecinema(cinema.screen_no)">삭제</button></th>
                        </tr>
                    </tbody>
                </table> 
            </div>
            <br>
            <div v-if="cinemalist.length > 0" class="pagination">
                <ul class="number_box">
                    <li @click="prevPageGroup" :class="{disabled: currentPageGroup === 1}"><img src="../images/prev.png"/></li>
                    <li v-for="page in currentGroupPages" :key="page" @click="changePage(page)" :class="{active: page === currentPage}">
                    {{ page }}</li>
                    <li @click="nextPageGroup" :class="{disabled: currentPageGroup === pageGroups.length}"><img src="../images/next.png"/></li>
                </ul>
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
import Swal from 'sweetalert2';

export default {
    components: {
        AdminpageSidebar
    },
    data(){
        return{
            cinemalist:[],
            //페이징용
            currentPage:1,
            itemsPerPage:5,
            currentPageGroup: 1,

        };
    },

    computed:{
        // //태그네이밍용
        // tagname(){
        //     return{
        //         0:'사용 가능',
        //         1:'사용 불가'
        //     }
        // },
        //페이징
        pagingData(){
            const start = (this.currentPage -1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.cinemalist.slice(start,end);
        },
        totalPages(){
            return Math.ceil(this.cinemalist.length / this.itemsPerPage);
        },
        pageGroups(){
            const groups = [];
            for (let i = 1; i<=this.totalPages; i +=10){
                groups.push({
                    start: i,
                    end: Math.min(i+9, this.totalPages),
                });
            }
            return groups;
        },
        currentGroupPages(){
            const group = this.pageGroups[this.currentPageGroup - 1];
            if(group){
                return Array.from({ length: group.end - group.start + 1}, (_, i) => group.start + i);
            }
            return[];
        }
    },
//  map쓸 경우에 이런식으로 사용, 위에서 사용하고싶을떈 tagnameList(i)로 호출(v-for로 반복하고 있기 때문)
//     computed: {
//   tagnameList() {
//     // tagnaming 객체는 sc_avaailable 값을 태그 이름으로 매핑합니다.
//     const tagnaming = {
//       0: '사용 가능',
//       1: '사용 불가'
//     };

//     // this.cinemalist 배열의 각 항목에 대해 map 메서드를 사용하여 변환된 값을 새 배열에 담습니다.
//     return this.cinemalist.map(cinema => {
//       // cinema 항목의 sc_avaailable 값을 사용하여 tagnaming 객체에서 해당 태그 이름을 가져옵니다.
//       return tagnaming[cinema.sc_avaailable];
//     });
//   }
// }
//v-for때문에 문제가 생기는거라서 computed보다 methods에 넣고 사용하는게 좋음 쓰고싶으면 아래처럼ㄱㄱ
        //methods: {
        //     tagname(sc_avaailable) {
        //         const tagnaming = {
        //             0: '사용 가능',
        //             1: '사용 불가'
        //         };
        //         return tagnaming[sc_avaailable];
        //     }
        // }

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
        insert(){
            this.$router.push(`/admin/CreateCinema`);
        },
        async deletecinema(screen_no){
            console.log("screen_no",screen_no);
            try {
        // 사용자가 삭제를 확인하는 Swal 팝업을 표시
        const result = await Swal.fire({
            title: '정말 삭제하시겠습니까?',
            text: "이 작업은 취소할 수 없습니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
        });

        // 사용자가 확인 버튼을 클릭한 경우
        if (result.isConfirmed) {
            const response = await axios.post(`http://localhost:3000/admin/deletescreen`,{screen_no : screen_no});
            console.log("스크린 삭제 성공", response.data);
            await Swal.fire('삭제 완료', '스크린이 삭제되었습니다.', 'success');
            window.location.reload(); // Swal 닫히면 reload 실행하기 위해 then으로 promise 씀
        } else {
            // 사용자가 취소 버튼을 클릭한 경우
            await Swal.fire('취소됨', '스크린 삭제가 취소되었습니다.', 'info');
        }
    } catch (error) {
        console.error('삭제 도중 에러 발생', error);
        await Swal.fire('오류', '스크린 삭제 중 문제가 발생했습니다.', 'error');
    }
},
         //페이징
        changePage(page){
            if(page > 0 && page <= this.totalPages){
                this.currentPage = page;
            }
        },
        prevPage(){
            if(this.currentPage > 1 ){
                this.changePage(this.currentPage - 1);
            }
        },
        nextPage(){
            if(this.currentPage < this.totalPages) {
                this.changePage(this.currentPage + 1);
            }
        },
        prevPageGroup(){
            if(this.currentPageGroup > 1){
                this.currentPageGroup--;
                this.changePage(this.pageGroups[this.currentPageGroup - 1 ].start);
            }
        },
        nextPageGroup(){
            if(this.currentPageGroup < this.pageGroups.length){
                this.currentPageGroup ++;
                this.changePage(this.pageGroups[this.currentPageGroup - 1].start)
            }
        },
        
    }
}
</script>

<style scoped>
.cinema{
    display: flex;
}

.cinema_list{
    /* display:flex; */
  border-bottom: 1px solid #d4cdcd;
  /* border-top: 1px solid #d4cdcd; */
}
.no_cinema{
    display: block;
    margin-top:70px;
    font-size:36px;
    text-align: center;
    height: 100px;
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
    width: 10%;
    /* padding-right:40px; */
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
    color: white;
    background-color: #db1919;
    border-radius: 5px;
    cursor: pointer;
    /* margin-right: 10px; */
}
.update:hover{
    font-size: 16px;
    width: 60px;
    height: 30px;
    border: none;
    color: #db1919;
    background-color: #ffeeee;
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
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: #f0eeda;
    color: black;
    border: 1px solid #f0eeda;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}
.insert:hover{
    font-size: 16px;
    width: 80px;
    height: 30px;
    border: none;
    background-color: #ffffff;
    color: #32851e;
    box-shadow: 0 4px 8px rgba(23, 88, 42, 0.5);
    /* margin-right: 10px; */
}

/*페이징 */
.pagination {
    width: 100%;
    text-align: center;
    padding-top: 10px;
    display: flex;
    justify-content: center;
}

.pagination .number_box {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
}

.number_box li {
    width: 25px;
    height: 25px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.number_box li.active {
    background-color: #f0eeda;
    border-radius: 5px;
    color: black;
}

.number_box img {
    width: 15px;
    padding-bottom: 5px;
}

.cinema_wrap {
    width: 80%;
    min-width: 80%;
    padding: 0 10% 0 5%;
    margin-top: 100px;
    display: inline-block;
    vertical-align: top;
    overflow-x: auto;
    flex-wrap: nowrap;
    box-sizing: border-box;
}

.cinema_wrap h1 {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 30px;
}

</style>