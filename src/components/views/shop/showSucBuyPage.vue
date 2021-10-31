<template>
    <div class="showSucBuyPage">
        주문번호:{{paymentid}}
        <br>
        결제번호:{{price}}
    </div>
</template>
<script>
import * as module from "../../jslib/jslib.js";
export default {
    name:'showSucBuyPage',
    data(){
        return {
            paymentid:"",
            price:""
        }
    },
    methods:{
    },
    created(){
       this.paymentid=module.getParam('paymentid');
       this.price=module.getParam('price');
    }
 
}
</script>

