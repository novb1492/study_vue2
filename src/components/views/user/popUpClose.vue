<template>
    <div></div>
</template>
<script>
import * as module from "../../jslib/jslib.js";
export default {
    name:'popUpClose',
    data(){
        return {
            
        }
    },
    methods:{
    },
    created(){
        var detail=module.getParam('detail');
        var result=module.getParam('result');
        if(detail=='settle'){
            if(!result){
                alert(module.getParam('message'));
                return;
            }
            opener.location.href="/showSucBuyPage?paymentid="+module.getParam('mchtTrdNo')+"&price="+module.getParam('price');
        }
        self.close();
    }
 
}
</script>

