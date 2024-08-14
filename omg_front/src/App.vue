<template>
  <div>
    <Header />
    <router-view />
    <GoogleChart />
    <Footer />
  </div>

  
</template>


<script>


import Header from './layouts/Header.vue';
import Footer from './layouts/Footer.vue';

import GoogleChart from './admin/adminstatics.vue';

export default {
  components: {
    GoogleChart,
  },

  components: {Header, Footer},
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
}
</script>

<style>

 @font-face {
    font-family: 'SBAggroL';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroL.woff') format('woff');
    font-weight: 300;
}
 @font-face {
    font-family: 'SBAggroM';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroM.woff') format('woff');
    font-weight: 500;
}
 @font-face {
    font-family: 'SBAggroB';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
    font-weight: 700;
}
@font-face {
    font-family: 'ONE-Mobile-Title';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-Title.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'NPSfontBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/NPSfontBold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}
*{
    margin: 0;
    padding: 0;
    font-family: 'NPSfontBold';
}
ul{list-style: none;}
a:link, a:visited{
    text-decoration: none;
    color: #333;
}
html, body{
    width: 100%;
}
body{
    background-color: #fff;
    min-width: 1280px;
    line-height: 1.5;
}   
</style>
