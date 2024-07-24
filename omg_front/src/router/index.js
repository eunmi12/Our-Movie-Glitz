import { createRouter, createWebHistory } from 'vue-router'


//승호작성

//승호작성완

//진우작성

import Header from '../layouts/Header.vue';

//진우작성완

//은미작성

//은미작성완


//재영작성
// import MainPage from '../views/MainPage.vue'
//재영작성완

//회창작성

//회창작성완

//아름작성
import AdminpageSidebar from '../layouts/AdminpageSidebar.vue';
import UserList from '../admin/UserList.vue';
import MovieBooking from '../views/MovieBooking.vue';

//아름작성완

//치혁작성

//치혁작성완
const routes = [
  // {
  //   path: '/',
  //   name: 'MainPage',
  //   component: MainPage
  // },
  {
    path: '/test',
    component: Header,
  },

  //승호작성

//승호작성완


//진우작성

//진우작성완


//은미작성


//은미작성완


//재영작성

//재영작성완


//회창작성


//회창작성완

//아름작성
{
  path: "/adminpagesidebar",
  name: "AdminPageSidebar",
  component: AdminpageSidebar // component이름과 위의 import 뒤에 오는 이름이 같아야 됨
},
{
  path: "/admin/userlist",
  name: "UserList",
  component: UserList
},
{
  path: "/moviebooking",
  name: "MovieBooking",
  component: MovieBooking
},

//아름작성완

//치혁작성

//치혁작성완

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router