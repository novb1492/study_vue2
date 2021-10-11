<template>
    <div>
        <div>email</div><input type="email" id="email" class="form-control loginInput" placeholder="이메일을 입력해주세요">
        <br>
        <div>pwd</div><input type="password" id="pwd" class="form-control loginInput" placeholder="비밀번호를 입력해주세요">
        <input type="button" value="로그인" class="btn btn-success btn btn-default btn-sm" style="margin-top: 30px;" @click="this.tryLogin"><input type="button" class="btn btn-success btn btn-default btn-sm" value="네이버 로그인" @click="this.callNaverLogin" style="margin-left: 30px; margin-top: 30px;">
        <input type="button" class="btn btn-success btn btn-default btn-sm" value="카카오 로그인" @click="this.callKakaoLogin" style="margin-left: 30px; margin-top: 30px;">
        <br>
        <a href="/findPwdPage"><span  style="margin-top: 30px;">비밀번호찾기</span ></a><a href="/findPwdPage"><span  style="margin-top: 30px; margin-left: 30px;">이메일찾기</span ></a>
    </div>
</template>
<script>
import * as module from "../../jslib/jslib.js";
export default {
    name:'loginPage',
     data() {
     return {
         child:null
     }
    },
    methods: {
        tryLogin(){
            var email=document.getElementById('email').value;
            var pwd=document.getElementById('pwd').value;
            var url='http://localhost:8080/login';
            var data=JSON.stringify({
                "email":email,
                "pwd":pwd,
            });
            module.requestToPostServer2(url,data).then(result=>{
                console.log(result.flag+" ss");
                if(result.flag){
                   opener.window.location.reload();
                    self.close();
                }else{
                    alert(result.message);
                }
            });
        },
        callNaverLogin(){
            var url='http://localhost:8080/naver/showPage';
            module.requestGetToServer2(url).then(result=>{
                if(result.flag){ 
                    this.child=window.open(result.message,'naverLogin','width=500, height=500');
           
                }else{
                    alert(result.message);
                }
            });
        },
        callKakaoLogin(){
            var url='http://localhost:8080/kakao/showPage?scope=login';
            module.requestGetToServer2(url).then(result=>{
                if(result.flag){ 
                    this.child=window.open(result.message,'width=500','height=500');
                }else{
                    alert(result.message);
                }
            });
        },
    },

}
</script>
<style>
.loginInput{width:300px;height:30px;}
</style>

