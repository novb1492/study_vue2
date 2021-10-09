<template>
    <div>
        <div>email</div><input type="email" id="email" class="form-control loginInput" placeholder="이메일을 입력해주세요">
        <br>
        <div>pwd</div><input type="password" id="pwd" class="form-control loginInput" placeholder="비밀번호를 입력해주세요">
        <input type="button" value="로그인" class="btn btn-success" style="margin-top: 30px;" @click="this.tryLogin">
    </div>
</template>
<script>
import * as module from "../../jslib/jslib.js";
export default {
    name:'loginPage',
     data() {
     return {
         
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
            module.requestToServer2(url,data);
        }
    },

}
</script>
<style>
.loginInput{width:300px;height:30px;}
</style>

