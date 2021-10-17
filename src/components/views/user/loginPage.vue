<template>
 <div class="loginPage">
      <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col">  
                </div>
                <div class="col">
                    <div id="logo">WonderLand</div>
                    <div class="mt-4">email</div>
                    <input type="email" id="email" class="form-control loginInput mt-2" placeholder="이메일을 입력해주세요">
                    <div class="mt-2">pwd</div>
                    <input type="password" id="pwd" class="form-control loginInput mt-2" placeholder="비밀번호를 입력해주세요">
                    <input type="button" value="로그인" class="btn btn-success btn btn-default btn-sm mt-3"  @click="this.tryLogin">
                    <input type="button" class="btn btn-success btn btn-default btn-sm mt-3" style="margin-left:5px;" value="네이버 로그인" @click="this.callNaverLogin" >
                    <input type="button" class="btn btn-success btn btn-default btn-sm mt-3" style="margin-left:5px;" value="카카오 로그인" @click="this.callKakaoLogin">
                    <br>
                    <a href="/findEmailPage"><span>이메일찾기</span></a>
                    <a href="/findPwdPage"><span style="margin-left:110px;">비밀번호찾기</span></a>
                    </div>
                <div class="col">
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.findButton{margin-top: 20px;}
#logo{text-align: center; margin-top: 50px;color: pink;font: italic 3em "Fira Sans", serif; }
.loginInput{width:300px;height:30px;}
</style>
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

