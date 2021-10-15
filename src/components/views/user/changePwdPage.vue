<template>
    <div class="changePwdPage">
        <div class="container-fluid">

                <div class="col ">
                    <h1 id="logo2" class="center">WonderLand</h1>
                    <div class="center2">
                        <h4 class="mt-5">새 비밀번호를 입력해 주세요</h4>
                        <input type="password" id="pwd" class="loginInput mt-2" placeholder="4자이상 10자 이하입니다">
                        <h4 class="mt-3">한번더 일치하게 입력해주세요</h4>
                        <input type="password" id="pwd2" class="loginInput mt-2" placeholder="4자이상 10자 이하입니다">
                        <br>
                        <input type="button" value="변경" class="mt-3" id="updateButton" @click="this.tryUpdatePwd">
                        <div id="done"></div>
                    </div>
                </div>
        </div>
    </div>
</template>
<style>
#logo2{text-align: center; margin-top: 50px;color: pink;font: italic 5em "Fira Sans", serif; }
.center{position: absolute;top: 20%;left: 50%; margin-left: -250px; margin-top: -50px;}
.center2{position: absolute;top: 40%;left:50%;  margin-left: -150px; margin-top: -50px;}
</style>
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
        module.requestGetToServer2("http://localhost:8080/find/token?scope="+parms.scope+"&token="+parms.object+"").then(result=>{
            if(!result.flag){
                location.href='/firstdoor';
            }
        });
      

    }
 
}
</script>