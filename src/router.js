import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/views/home.vue';
import test from './components/views/test.vue';

Vue.use(VueRouter);

const router =new VueRouter({
    mode:'history',
    routes: [
      {path:'/',component: Home},  
      {path:'/test',component: test}  
    ]
});
export default router;