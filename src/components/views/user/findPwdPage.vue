<template>
    <div class="findEmailPage">
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col">  
                </div>
                <div class="col">
                    <div style="margin-top:40px"><h4>찾으실 이메일을 입력해주세요</h4></div>
                    <input type="email" id="email" placeholder="이메일을 입력해주세요" class="form-control joinInput">
                    <input type="button" class="btn btn-primary btn btn-default btn-sm" value="인증번호 전송" id="sendEmail" @click="this.sendEmail" style="margin-top:10px;">
                    <div style="margin-top:10px;"><h4>인증번호를 입력해주세요</h4></div>
                    <input type="text" id="randnum" placeholder="인증번호를 입력해주세요" class="form-control joinInput" >
                    <input type="button" class="btn btn-primary btn btn-default btn-sm" @click="this.sendRandnum"  id="sendRandNum" value="확인" style="margin-top:10px;" disabled>
                </div>
                <div class="col">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as module from "../../jslib/jslib.js";
export default {
    name:'findPwdPage',
    data(){
        return {

        }
    },
    methods: {
        sendEmail(){
            var email=document.getElementById('email').value;
            var button=document.getElementById('sendEmail');
            var url="http://localhost:8080/confrim/email";
            var button2=document.getElementById('sendRandNum');
            if(module.checkEmthy(email)){
                alert('이메일을 입력해주세요');
                return;
            }
            button.disabled=true;
            let data=JSON.stringify({
                "unit":email,
                "scope":"email",
                "detail":"find"
            });
            module.requestToPostServer2(url,data).then(result=>{
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
            var email=document.getElementById('email').value;
            var button=document.getElementById('sendEmail');
            var url="http://localhost:8080/confrim/email";
            var button2=document.getElementById('sendRandNum');
            if(module.checkEmthy(email)){
                alert('이메일을 입력해주세요');
                button.disabled=false;
                return;
            }
            let data=JSON.stringify({
                "phoneOrEmail":email,
                "unit":"email",
                "randNum":document.getElementById('randnum').value,
                'scope':'find'
            });
            button2.disabled=true;
            module.requestPutToServer2(url,data).then(result=>{
                alert(result.message);
                if(!result.flag){
                    button2.disabled=false;
                    return;
                }
            }).catch(error=>{
                  alert(error);  
                  button.disabled=false;
            })
        }
    },
    created() {
        window.resizeTo(1100,400);
    },
}
</script>