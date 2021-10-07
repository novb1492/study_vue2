<template>
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
          <b-dropdown-item href="#">Profile</b-dropdown-item>

          <div v-if="flag">
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </div>
          <div v-else>
            <b-dropdown-item href="#">login</b-dropdown-item>
          </div>
   
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div> 
</template>
<script>
import {loginCheck} from '../jslib/jslib.js';
//import axios from 'axios';
export default {
   name:'header',
    data(){
        return{  
            price:50,
            link1:'null',
            flag:loginCheck().then(result=>{
              console.log(result);
              this.flag=result.flag;
            }),
        }
    },
    methods :{
      /*async loginCheck(){
          const result=await loginCheck().then(function(result){
            console.log(result.flag);
            return result.flag;
          });
          console.log(result);
         return false;
       },*/
    

    },


}
</script>
