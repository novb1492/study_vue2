import Vue from 'vue';
import VueRouter from 'vue-router';
import firstdoor from './components/views/firstdoor.vue';
import home from './components/views/home.vue';
import test from './components/views/test.vue';
import loginPage from'./components/views/user/loginPage.vue';
import joinPage from './components/views/user/joinPage.vue';
import doneLogin from './components/views/user/doneLogin.vue';
import popUpClose from './components/views/user/popUpClose.vue';
Vue.use(VueRouter);

const router =new VueRouter({
    mode:'history',
    routes: [
      {path:'/',component: firstdoor},  
      {path:'/home',component: home},
      {path:'/loginPage',component: loginPage},
      {path:'/joinPage',component: joinPage},
      {path:'/doneLogin',component: doneLogin},
      {path:'/popUpClose',component: popUpClose},
      {path:'/test',component: test}  
    ]
});
export default router;