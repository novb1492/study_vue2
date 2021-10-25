<template>
    <div class="showItemPage">
        <ul class="oneItemUl">
            <li class="oneItemName minusMaginLeft">
                 <span >{{name}}</span>
            </li>
            <li class="oneItemImg minusMaginLeft">
                 <img :src="img" >
            </li>
            <li class="oneItemSize minusMaginLeft">
                 <span >사이즈:{{size}}</span>
            </li>
              <li class="oneItemPrice minusMaginLeft mt-2">
                 <span >가격:{{price}}</span>
            </li>
            <li class="oneItemCount minusMaginLeft mt-2">
                 <span >잔여수량:{{count}}</span>
            </li>
            <li class="minusMaginLeft mt-3">
                <input type="number" id="count" class="choiceCountInput"  :placeholder="'최대 구매수량 '+count" :max="count" min="1">
            </li>
             <li class="minusMaginLeft mt-4">
                <input type="button" @click="buy" value="구매">
                <input type="button" style="margin-left:20px;" value="장바구니 담기">
            </li>
        </ul>
    </div>
</template>
<style>
.choiceCountInput{width: 300px; height: 30px;}
.minusMaginLeft{margin-left: -180px;}
.oneItemCount{  font-size: 20px;}
.oneItemPrice{  font-size: 20px;}
.oneItemSize{  font-size: 20px;}
.oneItemName{color: pink;  font-size: 40px;}
.oneItemImg{width: 300px;height: 100px;margin-top: 30%; margin-bottom: 50%;}
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
        flag:module.loginCheck('no').then(result=>{
            console.log(result);
            console.log('loginCheck콜백');
            this.flag=result.flag;
            })
     }
    },
    methods: {
        buy(){
            var id=module.getParam('id');
            var count=module.getValueById('count');
            let data=JSON.stringify({
                "id":id,
                "count":count
            }); 
            module.requestPostToServer('http://localhost:8080/api/product/buy',data).then(reuslt=>{
                console.log(reuslt);
                if(!reuslt.flag){
                    alert(reuslt.message);
                }
            });
        },
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