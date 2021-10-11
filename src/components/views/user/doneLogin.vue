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
            var url='http://localhost:8080/kakao/showPage?scope=selfMessage';
            module.requestGetToServer(url).then(result=>{
                if(result.flag){
                    location.href=result.message;
                }else{
                    alert(result.message);
                }
            });
        }

    }
 
}
</script>
