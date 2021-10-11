<template>
    <div>
      
    </div>
</template>

<script>
import * as module from "../../jslib/jslib.js";
export default {
    name:'joinPage',
    data(){
        return {
      
        }
    },
    methods:{
    },
    created(){
        var provider=module.getParam('provider');
        opener.opener.window.location.reload();
        opener.close();
        if(provider=='naver'){
            self.close();
        }else if(provider=='kakao'){
            location.href='/kakaoplusOkPage';
        }

    }
 
}
</script>
