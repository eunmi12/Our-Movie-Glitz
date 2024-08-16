<template>
  <div class="admin">
    <adminpage-sidebar/>
    <div class="chat_wrap">
      <h1>예매 현황</h1>
      <div class="main_title">
          <h3>
            10대 예매현황
          </h3>
      </div>
      <div class="adminmain" style="display: flex">
        <GChart
          type="PieChart"
          :data="chartData1"
          :options="chartOptions1"
          class="chart"
        />
        <GChart
          type="PieChart"
          :data="chartData1_gender"
          :options="chartOptions1_gender"
          class="chart"
        />
      </div>
      <div class="main_title">
          <h3>
            20대 예매현황
          </h3>
      </div>
      <div class="adminmain" style="display: flex">  
        <GChart
          type="PieChart"
          :data="chartData2"
          :options="chartOptions2"
          class="chart"
        />
        <GChart
          type="PieChart"
          :data="chartData2_gender"
          :options="chartOptions2_gender"
          class="chart"
        />
      </div>
      <div class="main_title">
          <h3>
            30대 예매현황
          </h3>
      </div>
      <div class="adminmain" style="display: flex">
        <GChart
          type="PieChart"
          :data="chartData3"
          :options="chartOptions3"
          class="chart"
        />
        <GChart
          type="PieChart"
          :data="chartData3_gender"
          :options="chartOptions3_gender"
          class="chart"
        />
      </div>
        <div class="main_title">
          <h3>
            40대 예매현황
          </h3>
        </div>
      <div class="adminmain"  style="display: flex">
        <GChart
          type="PieChart"
          :data="chartData4"
          :options="chartOptions4"
          class="chart"
        />
        <GChart
          type="PieChart"
          :data="chartData4_gender"
          :options="chartOptions4_gender"
          class="chart"
        />   
      </div>
         <div class="main_title">
          <h3>
            50대 예매현황
          </h3>
         </div>
      <div class="adminmain" style="display: flex">
        <GChart
          type="PieChart"
          :data="chartData5"
          :options="chartOptions5"
          class="chart"
        />
        <GChart
          type="PieChart"
          :data="chartData5_gender"
          :options="chartOptions5_gender"
          class="chart"
        />
      </div>
      <div class="main_title">
          <h3>
            60대 예매현황
          </h3>
      </div>
      <div class="adminmain" style="display: flex">
        <GChart
          type="PieChart"
          :data="chartData6"
          :options="chartOptions6"
          class="chart"
        />
        <GChart
          type="PieChart"
          :data="chartData6_gender"
          :options="chartOptions6_gender"
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
      chartData1_gender: [
        ['gender_count', 'User'],
      ],
      chartOptions1_gender: {
        chart: {
          title: '10대 예매성별현황',
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
      chartData2_gender: [
        ['gender_count', 'User'],
      ],
      chartOptions2_gender: {
        chart: {
          title: '20대 예매성별현황'
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
      chartData3_gender: [
        ['gender_count', 'User'],
      ],
      chartOptions3_gender: {
        chart: {
          title: '30대 예매성별현황',
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
      chartData4_gender: [
        ['gender_count', 'User'],
      ],
      chartOptions4_gender: {
        chart: {
          title: '40대 예매성별현황'
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
      chartData5_gender: [
        ['Movie Title', 'User'],
      ],
      chartOptions5_gender: {
        chart: {
          title: '50대 예매성별현황',
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
      chartData6_gender: [
        ['movie_title', 'User'],
      ],
      chartOptions6_gender: {
        chart: {
          title: '60대 예매성별현황'
        }
      },
    }
  },
  created(){
    this.getteenInfo();
    this.getteenGender();

    this.gettwentiesInfo();
    this.gettwentiesGender();

    this.getthirtiesInfo();
    this.getthirtiesGender();

    this.getfortiesInfo();
    this.getfortiesGender();

    this.getfiftiesInfo();
    this.getfiftiesGender();
    
    this.getsixtiesInfo();
    this.getsixtiesGender();
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
    getteenGender(){
         axios.get(`http://localhost:3000/admin/teenGender`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData1_gender.push([ele.user_gender, ele.gender_count]);
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
    gettwentiesGender(){
         axios.get(`http://localhost:3000/admin/twentiesGender`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData2_gender.push([ele.user_gender, ele.gender_count]);
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
    getthirtiesGender(){
         axios.get(`http://localhost:3000/admin/thirtiesGender`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData3_gender.push([ele.user_gender, ele.gender_count]);
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
    getfortiesGender(){
      axios.get(`http://localhost:3000/admin/fortiesGender`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData4_gender.push([ele.user_gender, ele.gender_count]);
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
    getfiftiesGender(){
         axios.get(`http://localhost:3000/admin/fiftiesGender`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData5_gender.push([ele.user_gender, ele.gender_count]);
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
    getsixtiesGender(){
         axios.get(`http://localhost:3000/admin/sixtiesGender`)
         .then(response => {
          // console.log(`response.data :`, response.data);
          // this.Info = response.data; // movielists 배열에 데이터 설정

          console.log(response.data);

          response.data.forEach((ele) => {
            // console.log(`ele : ${ele.movie_title}`);
            // this.Info.push(ele.movie_title);
            // this.Info2 = ele.cnt
            this.chartData6_gender.push([ele.user_gender, ele.gender_count]);
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
.chat_wrap {
    width: 80%;
    min-width: 80%;
    margin-top: 100px;
    padding: 0 10% 0 5%;
    display: inline-block;
    vertical-align: top;
    overflow-x: auto;
    flex-wrap: nowrap;
    box-sizing: border-box;
}

.chat_wrap h1 {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 30px;
}

.admin{
    display: flex;
}
.adminmain {
  width: 100%;
  margin: 0 auto;
  text-align: center;
    /* display: flex; */
    justify-content: center;
    align-items: center;
}
.main_title{
  padding-top: 50px;
  text-align: center;
}
.chart {
  /* display: flex; */
  overflow: hidden;
  width: 100%;
  /* width: 600px; */
  height: 500px;
  
  /* padding-left: 400px; */
}
</style>