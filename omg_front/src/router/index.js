import { createRouter, createWebHistory } from 'vue-router'


//승호작성

//승호작성완

//진우작성

// import Header from '../layouts/Header.vue';
import Join from '../views/Join.vue'

//진우작성완

//은미작성

//은미작성완


//재영작성
import MainPage from '../views/MainPage.vue'
//재영작성완

//회창작성

//회창작성완

//아름작성
import AdminpageSidebar from '../layouts/AdminpageSidebar.vue';
import UserList from '../admin/UserList.vue';
import MovieBooking from '../views/MovieBooking.vue';

//아름작성완

//치혁작성

import Help from '../layouts/Helplayout.vue';
import Faq from '../views/Faq.vue';
import Notice from '../views/Notice.vue';
import Qna from '../views/Qna.vue';

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
{
  path: '/join',
  name: 'Join',
  component: Join
}
//진우작성완


//은미작성


//은미작성완


//재영작성
{
  path: '/',
  name: 'MainPage',
  component: MainPage
}
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

{
  path: '/help/',
  component: Help,
  children: [
{
  path: 'faq',
  component: Faq,
},
{
  path: 'notice',
  component: Notice,
},
{
  path: 'qna',
  component: Qna,
}
  ]
}
//치혁작성완

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router