import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';  
import './assets/custom-sweetalert.css';

//부트스트랩
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App)
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.mount('#app');
app.use(BootstrapVue3);

window.Kakao.init("8e6728892efb3b06470225642e03db50");
