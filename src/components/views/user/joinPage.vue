<template>

    <div>
      
        <div class="col-md-3" style="float: none; margin:0 auto;">
            <div v-for="text in this.textarray" :key="text">
                <div>{{text.text}}</div>
                <input type="text" v-bind:id="text.id" class="form-control joinInput">   
                <div v-if="text.id=='password2'">
                    <div style="font-size: 5px;">비밀번호는 최소 4자 최대 10자입니다</div>
                </div>
            </div>
            <vue-daum-postcode  @complete="onComplete" style="overflow:scroll; width:300px; height:300px;"/>
            <input type="text" id="postcode" class="form-control" placeholder="우편번호" disabled>
            <input type="text" id="address" class="form-control" placeholder="주소" disabled>
            <input type="text" id="detailAddess" class="form-control" placeholder="상세주소">
            <input type="text" id="phone" class="form-control joinInput" placeholder="핸드폰 번호를 입력 해주세요"><input type="button" id="sendPhoneButton" class="btn btn-primary" @click="this.sendPhone" value="인증번호전송">
            <input type="text" id="randnum" class="form-control joinInput" placeholder="인증번호를 입력해주세요"><input type="button" id="sendRandButton" class="btn btn-primary" @click="this.sendRand" value="확인" disabled>
            <br>
            <input type="button" id="tryJoinButton" class="btn btn-success"  @click="this.tryJoin" value="회원가입" style="margin-top: 10%;">
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import VueDaumPostcode from "vue-daum-postcode";
import * as module from "../../jslib/jslib.js";
Vue.use(VueDaumPostcode);

export default {
    name:'joinPage',
    data(){
        return {
            textarray:[
                {id:'email',text:'이메일을 입력해주세요'},
                {id:'password',text:'비밀번호를입력해주세요'},
                {id:'password2',text:'비밀번호를 다시 입력해주세요'},
                {id:'name',text:'이름을 입력해주세요(실명)'},
            ],
        }
    },
    methods:{
        onComplete(result) {
            console.log(result);
            document.getElementById('postcode').value=result.zonecode;
            document.getElementById('address').value=result.address;
        },
        sendPhone(){
            var url="http://localhost:8080/auth/sendSms";
            var phone=document.getElementById('phone').value;
            var button=document.getElementById('sendPhoneButton');
            var button2=document.getElementById('sendRandButton');
            if(module.checkEmthy(phone)||module.checkLength(phone,11,11)){
                alert('핸드폰번호를 입력해주세요');
                return;
            }
            button.disabled=true;
            let data=JSON.stringify({
                "phone":phone
            });
            module.requestToServer2(url,data).then(result=>{
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
        sendRand(){
            var url="http://localhost:8080/auth/checkRandNum";
            var phone=document.getElementById('phone').value;
            var randNum=document.getElementById('randnum').value;
            var button=document.getElementById('sendPhoneButton');
            var button2=document.getElementById('sendRandButton'); 
            if(module.checkEmthy(phone)||module.checkLength(phone,11,11)){
                alert('핸드폰번호를 입력해주세요');
                button.disabled=false;
                return;
            }
            let data=JSON.stringify({
                "phone":phone,
                "randNum":randNum,
                "unit":'phone'
            });
            button2.disabled=true;
            module.requestToServer2(url,data).then(result=>{
                alert(result.message);
                if(!result.flag){
                    button2.disabled=false;
                }
            }).catch(error=>{
                  alert(error);  
                  button2.disabled=false;
            })
        },
        tryJoin(){
            var infor=[];
            var other=['postcode','address','detailAddess','phone'];
            var nomalsize=this.textarray.length;
            var size=nomalsize+other.length;
            for(var i=0;i<size;i++){
                if(i<nomalsize){
                    infor[i]=document.getElementById(this.textarray[i].id).value;
                }else{
                    infor[i]=document.getElementById(other[i-nomalsize]).value;
                }
               
            }
            console.log(infor);
             let data=JSON.stringify({
                "email":infor[0],
                "pwd":infor[1],
                "pwd2":infor[2],
                "name":infor[3],
                "postcode":infor[4],
                "address":infor[5],
                "detailAddess":infor[6],
                "phone":infor[7]
            });
            var url="http://localhost:8080/auth/tryJoin";
            module.requestToServer2(url,data).then(result=>{
                    alert(result.message);
            }).catch(error=>{
                    alert(error);  
            })

        }
    },
}
</script>
