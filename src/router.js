import Vue from 'vue';
import VueRouter from 'vue-router';
import firstdoor from './components/views/firstdoor.vue';
import home from './components/views/home.vue';
import test from './components/views/test.vue';
import loginPage from'./components/views/user/loginPage.vue';
import joinPage from './components/views/user/joinPage.vue';
import doneLogin from './components/views/user/doneLogin.vue';
import popUpClose from './components/views/user/popUpClose.vue';
import myPage from './components/views/user/myPage.vue'
import findPwdPage from './components/views/user/findPwdPage.vue';
import changePwdPage from './components/views/user/changePwdPage.vue';
import findEmailPage from './components/views/user/findEmailPage.vue';
import changePhonePage from './components/views/user/changePhonePage.vue';
import shopMainPage from './components/views/shop/shopMainPage.vue';
import showItemPage from './components/views/shop/showItemPage.vue';
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
      {path:'/myPage',component: myPage},
      {path:'/findPwdPage',component: findPwdPage},
      {path:'/changePwdPage',component: changePwdPage},
      {path:'/findEmailPage',component: findEmailPage},
      {path:'/changePhonePage',component: changePhonePage},
      {path:'/shopMainPage',component: shopMainPage},
      {path:'/showItemPage',component: showItemPage},
      {path:'/test',component: test}  
    ]
});
export default router;