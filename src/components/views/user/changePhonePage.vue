<template>
    <div class="changePhonePage">   
        <div class="center">
            <div>새로 사용하실 핸드폰 번호를 입력해주세요</div>
            <input type="text" id="phone" placeholder="핸드폰번호를 입력해주세요" class="form-control joinInput">
            <input type="button" class="btn btn-outline-primary btn btn-default btn-sm" value="인증번호 전송" id="sendPhone" @click="sendPhone" style="margin-top:10px;">
            <div style="margin-top:10px;">인증번호를 입력해주세요</div>
            <input type="text" id="randnum" placeholder="인증번호를 입력해주세요" class="form-control joinInput" >
            <input type="button" class="btn btn-outline-primary btn btn-default btn-sm" @click="sendRandnum"  id="sendRandNum" value="확인" style="margin-top:10px;" disabled>
        </div>
    </div>
</template>
<script>
import * as module from "../../jslib/jslib.js";
export default {
    name:'changePhonePage',
    data(){
        return {
            
        }
    },
    methods:{
            sendPhone(){
            var phone=document.getElementById('phone').value;
            var button=document.getElementById('sendPhone');
            var url="http://localhost:8080/confrim/phone";
            var button2=document.getElementById('sendRandNum');
            if(module.checkEmthy(phone)){
                alert('전화번호를 입력해주세요');
                return;
            }
            button.disabled=true;
            let data=JSON.stringify({
                "unit":phone,
                "scope":"phone",
                "detail":"update"
            });
            module.requestPostToServer(url,data).then(result=>{
                alert(result.message);
                if(!result.flag){
                    button.disabled=false;
                    return;
                }
                button2.disabled=false;
            }).catch(error=>{
                  alert(error);  
                  button.disabled=false;
            })
        },
        sendRandnum(){
            var phone=document.getElementById('phone').value;
            var button=document.getElementById('sendPhone');
            var url="http://localhost:8080/confrim/phone";
            var button2=document.getElementById('sendRandNum');
            if(module.checkEmthy(phone)){
                alert('전화번호를 입력해주세요');
                button.disabled=false;
                return;
            }
            let data=JSON.stringify({
                "phoneOrEmail":phone,
                "unit":"phone",
                "randNum":document.getElementById('randnum').value,
                'scope':'update',
                'detail':'update'
            });
            button2.disabled=true;
            module.requestPutToServer(url,data).then(result=>{
                alert(result.message);
                if(!result.flag){
                    button2.disabled=false;
                    return;
                }
                opener.window.location.reload();
                self.close();
            }).catch(error=>{
                  alert(error);  
                  button.disabled=false;
            })
        }
    },
    created(){
        module.loginCheck().then(result=>{
            if(!result.flag){
                self.close();
            }
        });
    }
 
}
</script>