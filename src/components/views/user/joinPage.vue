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
            <!--
            이전까지 써오던 방법
            <input type="text" id="sample6_postcode" placeholder="우편번호" disabled>
            <input type="button" @click="this.sample6_execDaumPostcode"  value="우편번호 찾기">
            <br>
            <input type="text" id="sample6_address" placeholder="주소" disabled>
            <br>
            <input type="text" id="sample6_detailAddress" placeholder="상세주소">
            <input type="text" id="sample6_extraAddress" placeholder="참고항목" disabled>
            <br>-->
        </div>
    </div>
</template>
<!--<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>-->
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
            for(var ii=0;ii<infor.length;ii++){
                if(module.checkEmthy(infor[ii])){
                    alert('빈칸이 있습니다');
                    return;
                }
            }
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
                    if(result.flag){
                        location.href='/loginPage';
                    }
            }).catch(error=>{
                    alert(error);  
            })

        },
        /*sample6_execDaumPostcode() {
        new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;
            
            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
        }).open();
        }*/

    },
    /*created(){
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
        document.head.appendChild(recaptchaScript)
    }*/
}
</script>
