<template>
    <div class="shopMainPage">
        <div id="productArea">
            <ul v-for="product in this.products" :key="product" >
                <li> 
                    <div>
                        <a href="#" @click="buyPopUp(product.id)"><img :src="product.imgPath"></a>
                    </div> 
                    {{product.price}} dsds
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
ul{padding-left: 0px; list-style: none;float: left;}
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
      buyPopUp(id){
        alert(id);
      }
   },
   created() {
       this.getProduct('coffee',1,null)
   },
   
}
</script>