<template>
  <div>
    <!-- <Header /> -->
    <router-view />
    <!-- <Footer /> -->
  </div>
  
</template>


<script>
// import Header from './layouts/Header.vue';
// import Footer from './layouts/Footer.vue';
export default {
  // components: {Header},
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
