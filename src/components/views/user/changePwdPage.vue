<template>
    <div class="changePwdPage">
        <div>새 비밀번호를 입력해주세요</div>
        <input type="password" id="pwd" class="" placeholder="4자이상 10자 이하입니다">
        <div>한번더 일치하게 입력해주세요</div>
        <input type="password" id="pwd2" class="" placeholder="4자이상 10자 이하입니다">
        <input type="button" value="변경" id="updateButton" @click="this.tryUpdatePwd">
        <div id="done"></div>
    </div>
</template>
<script>
import * as module from "../../jslib/jslib.js";
export default {
    name:'changePwdPage',
    data(){
        return {
            
        }
    },
    methods:{
        tryUpdatePwd(){
             var parms=module.getAllParam();
            var pwd=document.getElementById('pwd').value;
            var pwd2=document.getElementById('pwd2').value;
            let data=JSON.stringify({
                "pwd":pwd,
                "pwd2":pwd2,
                "token":parms.object,
                "scope":"pwd",
                "detail":"find"
            });
            var url='http://localhost:8080/user/change?scope=pwd'
            module.requestPutToServer(url,data).then(result=>{
                alert(result.message);
                if(result.flag){
                    document.getElementById('done').innerHTML=('비밀번호가 변경되었습니다');
                }
            });
        }
    },
    created(){
        var parms=module.getAllParam();
        console.log(parms);
        module.requestGetToServer("http://localhost:8080/find/token?scope="+parms.scope+"&token="+parms.object+"").then(result=>{
            if(!result.flag){
                location.href='/firstdoor';
            }
        });
      

    }
 
}
</script>