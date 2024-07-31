<template>
  <div>
  <div class="helpheader">
    <h1>&nbsp;&nbsp;고객센터</h1>
  </div>
  <div class="view">
    <div class="helpsidebar">
      <ul class="list">
      <li v-for="menu in type" :key="menu.id" @click="selectMenu(menu.id, menu.link)"
          :class="{ 'active': selectedMenu === menu.id }">
        <span>{{ menu.name }}</span>
      </li>
    </ul>
    </div> 
  <div class="content">
    <router-view/>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: [
        { id: 1, name: '• 공지사항', link: '/help/notice' },
        { id: 2, name: '• FAQ', link: '/help/faq' },
        { id: 3, name: '• 1:1문의', link: '/help/qna' }
      ],
      selectedMenu: null,
    };
  },
  computed: {
    user(){
      return this.$store.state.user;
    }
  },
  methods: {
    selectMenu(id, link) {
      if (id === 3 && (!this.user.user_id || !this.user.user_auth)) {
        this.$swal('로그인이 필요합니다');
        this.$router.push('/login');
      } else {
      this.selectedMenu = id;
      this.$router.push(link);
      }
    },
     setSelectedMenuFromRoute(route) {
      const routeLinkToIdMap = {
        '/help/notice': 1,
        '/help/faq': 2,
        '/help/qna': 3
      };
      const matchedRoute = Object.keys(routeLinkToIdMap).find(path => route.path.startsWith(path));
      this.selectedMenu = routeLinkToIdMap[matchedRoute] || null;
    }
  },
  watch: {
    $route(to) {
      this.setSelectedMenuFromRoute(to);
    }
  },
  mounted() {
    this.setSelectedMenuFromRoute(this.$route);
  }
};
</script>

<style  scoped>

.helpheader {
    border-bottom:1px solid lightgray;
    width:80%;
    text-align:left;
    margin:auto;
    padding:30px 0px 20px 0px;
}

.helpsidebar {
    padding-top:50px;
    flex: 1;
}

.list {
  text-align:left;
  font-size:25px;
  line-height:200%;
}

li {
  width:150px;
  cursor: pointer;
}

li:hover {
  color: burlywood;
}

.list li.active {
  background-color:lightgray;
}

.view {
  display: flex;
  margin: auto;
  width: 80%;
}

.content {
  padding-top: 30px;
  flex: 6;
}

</style>