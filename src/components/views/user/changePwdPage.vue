<template>
    <div class="changePwdPage">
        
    </div>
</template>
<script>
import * as module from "../../jslib/jslib.js";
export default {
    name:'changePwdPage',
    data(){
        return {
            object:module.getParam('object')
        }
    },
    methods:{
    },
    created(){
        var parms=module.getAllParam();
        module.requestGetToServer("http://localhost:8080/find/token?scope="+parms.scope+"&token="+parms.object+"").then(result=>{
            if(!result.flag){
                location.href='/firstdoor';
            }
        });
      

    }
 
}
</script>