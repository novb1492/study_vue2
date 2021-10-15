<template>
  <div v-if="this.useHeader()">
    <div class="fade-in-box">
        <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
      <a class="navbar-brand" href="#">WonderLand</a>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" center>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="User" center>
            <div v-if="flag">
              <b-dropdown-item href="#">내구매내역</b-dropdown-item>
              <b-dropdown-item @click="this.showMyPage">내정보</b-dropdown-item>
              <b-dropdown-item @click="this.doLogOut">로그아웃</b-dropdown-item>
            </div>
            <div v-else>
              <b-dropdown-item @click="this.showJoinPage">회원가입</b-dropdown-item>
              <b-dropdown-item @click="this.showLoginPage">로그인</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
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
            flag:this.doLogin(),
        }
    },
    methods :{
      showJoinPage(){
        window.open('/joinPage','userpopup', 'width=500, height=900','resizable=no');
      },
      showLoginPage(){
        window.open('/loginPage','userpopup', 'width=500, height=400','resizable=no');
      },
      showMyPage(){
        window.open('/myPage', 'userpopup', 'width=1000, height=1000','resizable=no');
      },
      useHeader(){
        var showOrNot=true;
        var uri=location.pathname;
        if(uri=='/joinPage'||uri=='/loginPage'||uri=='/myPage'||uri=='/findPwdPage'||uri=='/findEmailPage'||uri=='/changePhonePage'){
           showOrNot= false;
        }else{
          showOrNot=true;
        }
        return showOrNot;
      },
      doLogin(){
        var uri=location.pathname;
        console.log(uri);
        if(uri!='/myPage'){
            module.loginCheck('no').then(result=>{
            console.log(result);
            console.log('loginCheck콜백');
            this.flag=result.flag;
            })
        }
      },
      doLogOut(){
        var url='http://localhost:8080/user/logout';
        module.requestGetToServer(url,null).then(result=>{
            if(result.flag){
              location.reload();
              return;
            }
            alert(result.message);
        });
      }
    },


}
</script>
