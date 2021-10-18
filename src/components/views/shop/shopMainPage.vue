<template>
    <div class="shopMainPage">
        <div id="productArea">
            <img src="https://s3.ap-northeast-2.amazonaws.com/wonderlandimgs/productimgs/스크린샷(1972).png" @click="this.test">
        </div>
    </div>
</template>
<style>
#productArea{position: absolute; top: 100px; left: 20px;}
img{width: 100px;height: 100px;}
</style>
<script>
import * as module from "../../jslib/jslib.js";
export default {
   name :'firstdoor',
   data() {
       return {
           products:this.getProduct('coffee',1,null)
       }
   },
   methods: {
      getProduct(kind,page,keyword){
          module.requestGetToServer('http://localhost:8080/product/select?kind='+kind+'&page='+page+'&keyword='+keyword).then(result=>{
              console.log(result);
          });
      }
   },
   created() {
       
   },
   
}
</script>