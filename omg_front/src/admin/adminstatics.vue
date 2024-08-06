<template>

  <GChart
    type="PieChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import { GChart } from 'vue-google-charts'

// export default {
//   components: {
//     GChart,
//   },
//   data() {
//     return {
//       type: "PieChart",
//       data:[
//         ["Task", "Hours per Day"],
//         ["movie_title", 1],
//         ["Eat", 2],
//         ["Commute", 2],
//         ["Watch TV", 2],
//         ["Sleep", 7]
//         ],
//       options: {
//         title: "10대",
//         width: 800,
//         height: 600
//         },
//     };
//   },
// };
export default {
  components: {
    GChart
  },
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        // 영화 제목
        ['Expenses', 'Profit'],
        // 예매 수 json
        ['2014', 1000],
        ['2015', 1170],
        ['2016', 660],
        ['2017', 1030]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      }
    }
  },
  created(){
    this.getInfo
  },
  methods:{
    getInfo(){
         axios.get(`http://localhost:3000/admin/teen`)
         .then(response => {
          console.log(`response.data :`, response.data);
          this.Infro = response.data; // movielists 배열에 데이터 설정
        })
        .catch(error => {
          console.error(`err : `, error);
        });
    }
  }
  

}


</script>
