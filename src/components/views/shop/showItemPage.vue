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
            <li class="minusMaginLeft mt-3">
                쿠폰번호
                <br>
                <input type="text" id="coupon" class="choiceCountInput"  >
            </li>
            <li class="minusMaginLeft mt-3">
                할인 코드번호
                <br>
                <input type="text" id="code" class="choiceCountInput"  >
            </li>
            <li class="minusMaginLeft mt-3">
                포인트 사용 금액
                <br>
                <input type="number" id="point" class="choiceCountInput" :placeholder="'보유포인트 '+point" :max="point" min="0">
            </li>
             <li class="minusMaginLeft mt-4">
                <div  v-if="flag">
                    <input type="button" @click="buy('card')" value="카드구매">
                    <input type="button" @click="buy('vbank')" value="가상계좌구매">
                    <input type="button" style="margin-left:20px;" value="장바구니 담기">
                </div> 
                <div v-else>
                        <span>로그인후 구매/장바구니가능합니다</span>
                </div>
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
<script src="https://tbnpg.settlebank.co.kr/resources/js/SettlePG.js"></script>
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
        point:"",
        flag:module.loginCheck('all').then(result=>{
            console.log(result);
            console.log('loginCheck콜백');
            this.flag=result.flag;
            this.point=result.point;
            })
     }
    },
    methods: {
        buy(buykind){
            var id=module.getParam('id');
            var count=module.getValueById('count');
            var kind="product";
            var coupon=module.getValueById('coupon');
            var code=module.getValueById('code');
            var point=module.getValueById('point');
            var array=module.create2DArray(1,5); 
            array[0][0]=id;
            array[0][1]=count;
            array[0][2]=coupon;
            array[0][3]=code;
            array[0][4]=point;
            console.log(array,buykind);
           module.requestbuy(array,buykind,kind).then(result=>{
               console.log(result);
                  if(!result.flag){
                    alert(result.message);
                    return;
                }
                module.card(SETTLE_PG,result);
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
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://tbnpg.settlebank.co.kr/resources/js/SettlePG.js')
        document.head.appendChild(recaptchaScript)
    },
}
</script>