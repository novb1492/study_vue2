<template>
    <div v-if="useSide()">
      <div class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar fade-in-box">
        <span class="fs-4">Menu</span>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto ">
            <li class="menuul"><a ><span  class="menutext">Coffee</span></a></li>
             <li class="menuul"><a  @click="changeMenu('cake',1,null)"><span  class="menutext">Cake</span></a></li>
        </ul>
        <hr>
    </div>
  </div>
</template>
<style>
.menuul{margin-top: 20px;}
.menutext{color: pink;}
.sidebar{position: absolute;width: 150px;height: 100%;}
</style>
<script>
import * as module from "../jslib/jslib.js";
export default {
   name:'sidebar',
    data(){
        return{  
     
        }
    },
    methods :{
      useSide(){
        var showOrNot=false;
        var uri=location.pathname;
        if(uri=='/shopMainPage'){
           showOrNot= true;
        }else{
          showOrNot=false;
        }
        return showOrNot;
      },
      changeMenu(kind,page,keyword){
        module.remove('itemArea');
        module.requestGetToServer('http://localhost:8080/product/select?kind='+kind+'&page='+page+'&keyword='+keyword).then(result=>{
              console.log(result);
              this.products=result.products;
          });
      }
    },


}
</script>