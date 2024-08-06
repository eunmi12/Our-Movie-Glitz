import { createRouter, createWebHistory } from 'vue-router'


//승호작성
import adminstatics from '../admin/adminstatics.vue'
//승호작성완

//진우작성

// import Header from '../layouts/Header.vue';
import Join from '../views/Join.vue'
import Login from '../views/Login.vue'

//진우작성완

//은미작성
import AdminFaqList from '../admin/FaqList.vue'
import Admin from '../admin/adminmain.vue'
import AdminCreateFaq from '../admin/CreateFaq.vue'
import AdminNotice from '../admin/notice.vue'
import moviecreate from '../admin/createmovie.vue'
import admincinemalist from '../admin/admincinemalist.vue'
import AdminCreateCinema from '../admin/CreateCinema.vue'
import AdminCreateNotice from '../admin/createNotice.vue'
import AdminUpdateNotice from '../admin/updatenotice.vue'
import MovieDetail from '../views/MovieDetail.vue'
import CouponList from '../admin/CouponList.vue'
import CreateCoupon from '../admin/CreateCoupon.vue'
import userseat from '../views/test.vue'
//은미작성완


//재영작성
import MainPage from '../views/MainPage.vue'
import EventList from '../admin/eventList.vue'
import AdminEventCreate from '../admin/CreateEvent.vue'
//재영작성완

//회창작성
import MypageMain from '../mypage/MypageMain.vue'
import MypageSideBar from '../layouts/MypageSideBar.vue'
import MypageTop from '../layouts/MypageTop.vue'
import Coupon from '../mypage/Coupon.vue'
import Gogaekcenter from '../mypage/Gogaekcenter.vue'
import Point from '../mypage/Point.vue'
import Rev from '../mypage/Rev.vue'
import UserMypage from '../mypage/UserMypage.vue'
import UserOut from '../mypage/UserOut.vue'
import Review from '../mypage/Review.vue'
import GogaekDetail from '../mypage/GogaekDetail.vue'
import Wish from '../mypage/Wish.vue'
//회창작성완

//아름작성
import AdminpageSidebar from '../layouts/AdminpageSidebar.vue';
import UserList from '../admin/UserList.vue';
import MovieBooking from '../views/MovieBooking.vue';
import SeatSelection from '../views/SeatSelection.vue';
import Payment from '../views/Payment.vue';

//아름작성완

//치혁작성

import Help from '../layouts/Helplayout.vue';
import Faq from '../views/Faq.vue';
import Noticelist from '../views/Noticelist.vue';
import Notice from '../views/Notice.vue';
import Qna from '../views/Qna.vue';
import Qnalist from '../admin/Qnalist.vue';
import Createqna from '../admin/Createqna.vue';
import Reviewlist from '../admin/Reviewlist.vue';


//치혁작성완
const routes = [
  {
    path: '/admin/statics',
    name: 'adminstatics',
    component: adminstatics
  },
  //승호작성

//승호작성완


//진우작성
{
  path: '/join',
  name: 'Join',
  component: Join
},
{
  path: '/login',
  name: 'Login',
  component: Login
},
//진우작성완


//은미작성
{
  path: "/admin/Faq",
  name: "AdminFaqList",
  component: AdminFaqList // component이름과 위의 import 뒤에 오는 이름이 같아야 됨
},
{
  path: "/admin",
  name: "Admin",
  component: Admin // component이름과 위의 import 뒤에 오는 이름이 같아야 됨
},
{
  path: "/admin/CreateFaq",
  name: "AdminCreateFaq",
  component: AdminCreateFaq // component이름과 위의 import 뒤에 오는 이름이 같아야 됨
},
{
  path: "/admin/notice",
  name: "AdminNotice",
  component: AdminNotice // component이름과 위의 import 뒤에 오는 이름이 같아야 됨
},
{
  path: "/admin/movie",
  name: "moviecreate",
  component: moviecreate // component이름과 위의 import 뒤에 오는 이름이 같아야 됨
},
{
  path: "/admin/cinema",
  name: "admincinemalist",
  component: admincinemalist // component이름과 위의 import 뒤에 오는 이름이 같아야 됨
},
{
  path: "/admin/CreateCinema",
  name: "AdminCreateCinema",
  component: AdminCreateCinema // component이름과 위의 import 뒤에 오는 이름이 같아야 됨
},
{
  path: "/admin/createNotice",
  name: "AdminCreateNotice",
  component: AdminCreateNotice // component이름과 위의 import 뒤에 오는 이름이 같아야 됨
},
{
  path: "/admin/notice/:notice_no",
  name: "AdminUpdateNotice",
  component: AdminUpdateNotice // component이름과 위의 import 뒤에 오는 이름이 같아야 됨
},
{
  path: "/moviedetail/:movie_no",
  name: "MovieDetail",
  component: MovieDetail
},
{
  path: "/admin/coupon",
  name: "CouponList",
  component: CouponList
},
{
  path: "/admin/createcoupon",
  name: "CreateCoupon",
  component: CreateCoupon
},
{
  path: "/user/seat",
  name: "userseat",
  component: userseat // component이름과 위의 import 뒤에 오는 이름이 같아야 됨
},

//은미작성완


//재영작성
{
  path: '/',
  name: 'MainPage',
  component: MainPage
},
{
  path: '/admin/eventlist',
  name: 'EventList',
  component: EventList
},
{
  path: "/admin/CreateEvent",
  name: "AdminEventCreate",
  component: AdminEventCreate 
},
//재영작성완


//회창작성
{
  path: '/mypagemain/:user_no',
  name: 'MypageMain',
  component: MypageMain
},
{
  path: '/mypagesidebar',
  name: 'MypageSideBar',
  component: MypageSideBar
},
{
  path: '/mypagetop',
  name: 'MypageTop',
  component: MypageTop
},
{
  path: '/coupon/:user_no',
  name: 'Coupon',
  component: Coupon
},
{
  path: '/gogaekcenter/:user_no',
  name: 'Gogaekcenter',
  component: Gogaekcenter
},
{
  path: '/point/:user_no',
  name: 'Point',
  component: Point
},
{
  path: '/rev/:user_no',
  name: 'Rev',
  component: Rev
},
{
  path: '/usermypage/:user_no',
  name: 'UserMypage',
  component: UserMypage
},
{
  path: '/userout/:user_no',
  name: 'UserOut',
  component: UserOut
},
{
  path: '/review/:user_no',
  name: 'Review',
  component: Review
},
{
  path: '/gogaekdetail/:user_no',
  name: 'GogaekDetail',
  component: GogaekDetail
},
{
  path: '/wish/:user_no',
  name: 'Wish',
  component: Wish
},
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
{
  path: "/seatselection",
  name: "SeatSelection",
  component: SeatSelection,
},
{
  path: "/payment/:ticket_no", // params로 주소를 이렇게 받아오므로 path도 이렇게 주소를 받아와야 됨
  name: "Payment",
  component: Payment,
},

//아름작성완

//치혁작성

{
  path: '/help/',
  component: Help,
  children: [
{
  path: 'notice',
  component: Noticelist,
},
{
  path: 'notice/:notice_no',
  component: Notice,
},
{
  path: 'faq',
  component: Faq,
},
{
  path: 'qna',
  component: Qna,
}
  ]
},
{
  path: '/admin/qnalist',
  component: Qnalist,
},
{
  path: '/admin/createqna/:qna_no',
  component: Createqna,
},
{
  path: '/admin/reviewlist',
  component: Reviewlist,
}

//치혁작성완

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router