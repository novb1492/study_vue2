<template>
    <div class="myPage">
       <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col">  
                </div>
                <div class="col">
                    <div>이메일</div>
                    <div>{{infor.email}}</div>
                    <div>이름</div>
                    <div>{{infor.name}}</div>
                    <div>휴대폰번호</div>
                    <div>{{infor.phoneNum}}</div>
                    <input type="button" @click="this.openPhone" class="btn btn-primary btn-default btn-sm" value="전화번호 변경하기">
                    <input type="text" class="form-control joinInput" id="sample6_postcode" v-bind:value="postcode" placeholder="우편번호" disabled>
                    <input type="text" class="form-control joinInput" id="sample6_address" v-bind:value="address" placeholder="주소" disabled>
                    <input type="text" class="form-control joinInput" id="sample6_detailAddress"  v-bind:value="detailAddress" placeholder="상세주소">
                    <input type="button" @click="this.sample6_execDaumPostcode" class="btn btn-primary btn-default btn-sm" value="우편번호 찾기">
                    <input type="button" @click="this.updateAddress" id="updateAddressButton" class="btn btn-primary btn-default btn-sm" value="주소변경하기" disabled>
                    <div>비밀번호 변경</div>
                    <div>현재 비밀번호를 입력해주세요</div>
                    <input type="password" class="form-control joinInput" id="originPwd"  placeholder="현재 비밀번호를 입력해주세요" >
                    <div>새로 사용하실 비밀번호를 입력해주세요</div>
                    <input type="password" class="form-control joinInput" id="pwd"  placeholder="새로 사용하실 비밀번호를 입력해주세요" >
                    <div>한번더  입력해주세요</div>
                    <input type="password" class="form-control joinInput" id="pwd2"   placeholder="새로 사용하실 비밀번호를 입력해주세요">
                    <input type="button" @click="this.updatePwd"  class="btn btn-primary btn-default btn-sm" value="비밀번호 수정">                    
                </div>
                <div class="col">
                </div>
            </div>
        </div>  
    </div>
</template>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
import * as module from '../../jslib/jslib.js';
export default {
   name:'myPage',
        data() {
        return {
            postcode:null,
            address:null,
            detailAddress:null,
            infor: module.loginCheckGetInfor().then(result=>{
                console.log(result+ "제일위")
                if(!result.flag){
                    alert(result.message);
                    self.close();
                    return;
                }
                this.infor=result.data;
                var fullAddress=result.data.address.split(',');
                this.postcode=fullAddress[0];
                this.address=fullAddress[1];
                this.detailAddress=fullAddress[2];
            }),
        }
    },
    methods: {
        updatePwd(){
            var originPwd=document.getElementById('originPwd').value;
            var pwd=document.getElementById('pwd').value;
            var pwd2=document.getElementById('pwd2').value;
            var url='http://localhost:8080/user/change/pwd'
            let data=JSON.stringify({
                "originPwd":originPwd,
                "pwd":pwd,
                "pwd2":pwd2,
                "scope":"pwd",
                "detail":"update"
            });
            module.requestPutToServer(url,data).then(result=>{
                alert(result.message);
                if(result.flag){
                    window.location.reload();
                }
            });
        },
        updateAddress(){
            var postcode=document.getElementById('sample6_postcode').value;
            var address=document.getElementById('sample6_address').value;
            var detailAddress=document.getElementById('sample6_detailAddress').value;
            console.log(address);
            let data=JSON.stringify({
                "postcode":postcode,
                "address":address,
                "detailAddress":detailAddress,
                "scope":"address",
                "detail":"update"
            });
            var url='http://localhost:8080/user/change/address';
            module.requestPutToServer2(url,data).then(result=>{
                alert(result.message);
            }).catch(error=>{
                  alert(error);  
                  button.disabled=false;
            })
        },
        sample6_execDaumPostcode() {
            new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수
                console.log(data);
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
                    //document.getElementById("sample6_extraAddress").value = extraAddr;
                
                } else {
                    //document.getElementById("sample6_extraAddress").value = '';
                }
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById("sample6_postcode").value=data.zonecode;
                document.getElementById("sample6_address").value=addr;
                document.getElementById('updateAddressButton').disabled=false;
                // 커서를 상세주소 필드로 이동한다.
                //document.getElementById("sample6_detailAddress").focus();
            }
            }).open();
        },
        openPhone(){
            window.open('/changePhonePage', 'changePhonePage', 'width=1000, height=500','menubar=no, status=no, toolbar=no,location=no,resizable=no');
        }
    },created(){
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
        document.head.appendChild(recaptchaScript)
    }

}
</script>