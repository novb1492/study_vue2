<template>
  <div v-if="this.useHeader()">
    <div class="fade-in-box">
        <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
      <a class="navbar-brand" href="#">WonderLand</a>
      <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarsExample09" style="">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
          <li class="nav-item dropdown">
               <b-nav-item-dropdown right>
                  <template #button-content><em>User</em></template>
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
          </li>
        </ul>
    </div>
  </nav>
    </div> 
  </div>
  <!--<b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/main">WonderLand</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
     
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
    </b-navbar>-->
</template>
<script>
import * as module from "../jslib/jslib.js";
export default {
   name:'header',
    data(){
        return{  
            price:50,
            flag:false,
        }
    },
    methods :{
      showJoinPage(){
        window.open('/joinPage','userpopup', 'width=1000, height=1000', 'menubar=no, status=no, toolbar=no,location=no,resizable=no');
      },
      showLoginPage(){
        window.open('/loginPage','userpopup', 'width=500, height=500', 'menubar=no, status=no, toolbar=no,location=no,resizable=no');
      },
      showMyPage(){
        window.open('/myPage', 'userpopup', 'width=1000, height=500','menubar=no, status=no, toolbar=no,location=no,resizable=no');
      },
      useHeader(){
        var uri=location.pathname;
        if(uri=='/joinPage'||uri=='/loginPage'||uri=='/myPage'||uri=='/findPwdPage'||uri=='/findEmailPage'||uri=='/changePhonePage'){
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
