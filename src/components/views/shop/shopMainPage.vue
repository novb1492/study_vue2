<template>
    <div class="shopMainPage fade-in-box">
        <!--<input type="button" value="커피" @click="getProduct('coffee','1',null)">-->
        <div id="productArea">
            <ul v-for="product in this.products" :key="product" >
                <li> 
                    <div>
                        <a href="#" @click="buyPopUp(product.id)"><img :src="product.imgPath"></a>
                    </div> 
                    <span>{{product.name}}</span>
                    <br>
                    <span >가격</span>: {{product.price}} 
                    <br>
                    <span>수량</span>:{{product.count}}
                </li>
            </ul>
        </div>
        <div class="buttonArea"></div>
        <div class="buyArea">

        </div>
    </div>
</template>
<style>
ul{padding-left: 0px; list-style: none;float: left;text-align: center;}
#productArea{position: absolute; top: 100px; left: 500px;}
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