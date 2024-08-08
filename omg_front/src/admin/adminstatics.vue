<template>
  <div class="admin">
    <adminpage-sidebar/>
    <div class="chat_wrap">
      <div class="adminmain">
        10대 예매현황
        <GChart
          type="PieChart"
          :data="chartData1"
          :options="chartOptions1"
          class="chart"
        />
      </div>
      <div class="adminmain">
        20대 예매현황
        <GChart
          type="PieChart"
          :data="chartData2"
          :options="chartOptions2"
          class="chart"
        />
      </div>
      <div class="adminmain">
        30대 예매현황
        <GChart
          type="PieChart"
          :data="chartData3"
          :options="chartOptions3"
          class="chart"
        />
      </div>
      <div class="adminmain">
        40대 예매현황
        <GChart
          type="PieChart"
          :data="chartData4"
          :options="chartOptions4"
          class="chart"
        />
      </div>
      <div class="adminmain">
        50대 예매현황
        <GChart
          type="PieChart"
          :data="chartData5"
          :options="chartOptions5"
          class="chart"
        />
      </div>
      <div class="adminmain">
        60대 예매현황
        <GChart
          type="PieChart"
          :data="chartData6"
          :options="chartOptions6"
          class="chart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import AdminpageSidebar from "../layouts/AdminpageSidebar.vue";
import axios from 'axios';

export default {
  components: {
    AdminpageSidebar,
    GChart
  },
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData1: [
        ['Movie Title', 'User'],
      ],
      chartOptions1: {
        chart: {
          title: '10대 예매현황',
        }
      },
      chartData2: [
        ['movie_title', 'User'],
      ],
      chartOptions2: {
        chart: {
          title: '20대 예매현황'
        }
      },
      chartData3: [
        ['Movie Title', 'User'],
      ],
      chartOptions3: {
        chart: {
          title: '30대 예매현황',
        }
      },
      chartData4: [
        ['movie_title', 'User'],
      ],
      chartOptions4: {
        chart: {
          title: '40대 예매현황'
        }
      },
      chartData5: [
        ['Movie Title', 'User'],
      ],
      chartOptions5: {
        chart: {
          title: '50대 예매현황',
        }
      },
      chartData6: [
        ['movie_title', 'User'],
      ],
      chartOptions6: {
        chart: {
          title: '60대 예매현황'
        }
      },
    }
  },
  created(){
    this.getteenInfo();
    this.gettwentiesInfo();
    this.getthirtiesInfo();
    this.getfortiesInfo();
    this.getfiftiesInfo();
    this.getsixtiesInfo();
  },
  methods:{
    getteenInfo(){
         axios.get(`http://localhost:3000/admin/teen`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData1.push([ele.movie_title, ele.cnt]);
          })

          console.log(`this.Info :`, this.Info);
       
        })
        .catch(error => {
          console.error(`err : `, error);
        });
    },
    gettwentiesInfo(){
         axios.get(`http://localhost:3000/admin/twenties`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData2.push([ele.movie_title, ele.cnt]);
          })

          console.log(`this.Info :`, this.Info);
       
        })
        .catch(error => {
          console.error(`err : `, error);
        });
    },
    getthirtiesInfo(){
         axios.get(`http://localhost:3000/admin/thirties`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData3.push([ele.movie_title, ele.cnt]);
          })

          console.log(`this.Info :`, this.Info);
       
        })
        .catch(error => {
          console.error(`err : `, error);
        });
    },
    getfortiesInfo(){
         axios.get(`http://localhost:3000/admin/forties`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData4.push([ele.movie_title, ele.cnt]);
          })

          console.log(`this.Info :`, this.Info);
       
        })
        .catch(error => {
          console.error(`err : `, error);
        });
    },
    getfiftiesInfo(){
         axios.get(`http://localhost:3000/admin/fifties`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData5.push([ele.movie_title, ele.cnt]);
          })

          console.log(`this.Info :`, this.Info);
       
        })
        .catch(error => {
          console.error(`err : `, error);
        });
    },
    getsixtiesInfo(){
         axios.get(`http://localhost:3000/admin/sixties`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData6.push([ele.movie_title, ele.cnt]);
          })

          console.log(`this.Info :`, this.Info);
       
        })
        .catch(error => {
          console.error(`err : `, error);
        });
    },
  }
  

}


</script>

<style scoped>
.admin{
    display: flex;
}
.adminmain {
    display: flex;
    justify-content: center;
    align-items: center;
}
.chart {
  width: 1000px;
  height: 500px;
  padding-left: 400px;
}
</style>