<template>
    <div class="showItemPage">
        <ul class="oneItemUl">
            <li class="oneItemName">
                 <span >{{name}}</span>
            </li>
            <li class="oneItemImg">
                 <img :src="img" >
            </li>
            <li class="oneItemSize">
                 <span >사이즈:{{size}}</span>
            </li>
              <li class="oneItemPrice">
                 <span >가격:{{price}}</span>
            </li>
            <li class="oneItemCount">
                 <span >잔여수량:{{count}}</span>
            </li>
        </ul>

    </div>
</template>
<style>
.oneItemCount{margin-left: -180px;   font-size: 30px;}
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
        img:"",
        count:"",
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
                this.count=result.count;
                if(this.count==0){
                    alert('품절되었습니다');
                    self.close();
                }
            });
        }
    },
    created() {
         var id=module.getParam('id');
         this.getItem(id);
    },
}
</script>