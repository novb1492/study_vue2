<template>
  <div v-if="this.useHeader()">
    <div class="fade-in-box">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/main">WonderLand</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <div v-if="flag">
              <b-dropdown-item href="#">내구매내역</b-dropdown-item>
              <b-dropdown-item @click="this.showMyPage">내정보</b-dropdown-item>
              <b-dropdown-item href="#">로그아웃</b-dropdown-item>
            </div>
            <div v-else>
              <b-dropdown-item @click="this.showJoinPage">회원가입</b-dropdown-item>
              <b-dropdown-item @click="this.showLoginPage">로그인</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    </div> 
  </div>
</template>
<script>
import * as module from "../jslib/jslib.js";
export default {
   name:'header',
    data(){
        return{  
            price:50,
            flag:false
        }
    },
    methods :{
      showJoinPage(){
        window.open('/joinPage','loginPage', 'width=2000px, height=2500px', 'menubar=no, status=no, toolbar=no,location=no,resizable=no');
      },
      showLoginPage(){
        window.open('/loginPage','loginPage', 'width=500, height=500', 'menubar=no, status=no, toolbar=no,location=no,resizable=no');
      },
      showMyPage(){
        window.open('/myPage', 'window팝업', 'width=1000, height=500','menubar=no, status=no, toolbar=no,location=no,resizable=no');
      },
      useHeader(){
        var uri=location.pathname;
        if(uri=='/joinPage'||uri=='/loginPage'||uri=='/myPage'||uri=='/findPwdPage'){
           return false;
        }
        module.loginCheck().then(result=>{
            console.log(result);
            console.log('loginCheck콜백');
            this.flag=result.flag;
        });
        return true;
      }
    },


}
</script>
