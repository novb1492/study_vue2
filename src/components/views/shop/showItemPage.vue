<template>
    <div class="showItemPage">
        <ul class="oneItemUl">
            <li>
                 <span class="oneItemName">{{name}}</span>
            </li>
            <li>
                 <img :src="img" class="oneItemImg">
            </li>
            <li>
                 <span class="oneItemSize">사이즈:{{size}}</span>
            </li>
              <li>
                 <span class="oneItemPrice">가격:{{price}}</span>
            </li>
        </ul>

    </div>
</template>
<style>
.oneItemPrice{margin-left: -180px;   font-size: 30px;}
.oneItemSize{margin-left: -180px;   font-size: 30px;}
.oneItemName{margin-left: -180px; color: pink;  font-size: 40px;}
.oneItemImg{width: 300px;height: 100px;margin-left: -180px; margin-top: 30%; margin-bottom: 50%;}
.itemArea{margin-left: -10%;}
.showItemPage{position: absolute;top:10%; left: 50%;}
</style>
<script>
import * as module from "../../jslib/jslib.js";
export default {
    name:'showItemPage',
     data() {
     return {
         price:"",
         name:"",
         size:"",
         img:""
     }
    },
    methods: {
        getItem(id){
            console.log(id);
            module.requestGetToServer('http://localhost:8080/product/select?detail=one&id='+id).then(result=>{
                console.log(result);
                if(!result.flag){
                    alert(result.message);
                    self.close();
                }
                this.price=result.price;
                this.name=result.name;
                this.size=result.size;
                this.img=result.img;
            });
        }
    },
    created() {
         var id=module.getParam('id');
         this.getItem(id);
    },
}
</script>