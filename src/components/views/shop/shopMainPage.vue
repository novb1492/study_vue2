<template>
    <div class="shopMainPage">
        <div id="productArea">
            <span v-for="product in this.products" :key="product">
                <img :src="product.imgPath">
                <span> {{product.price}} dsds</span>
            </span>
        </div>
    </div>
</template>
<style>
#productArea{position: absolute; top: 100px; left: 20px;}
img{width: 150px;height: 100px;}
</style>
<script>
import * as module from "../../jslib/jslib.js";
export default {
   name :'firstdoor',
   data() {
       return {
           products:[]
       }
   },
   methods: {
      getProduct(kind,page,keyword){
          module.requestGetToServer('http://localhost:8080/product/select?kind='+kind+'&page='+page+'&keyword='+keyword).then(result=>{
              console.log(result);
              this.products=result.products;
          });
      },
   },
   created() {
       this.getProduct('coffee',1,null)
   },
   
}
</script>