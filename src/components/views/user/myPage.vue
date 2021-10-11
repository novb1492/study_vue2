<template>
        <div>
        <div class="col-md-3" style="float: none; margin:0 auto;">
            <div>이메일</div>
            <div>{{infor.email}}</div>
            <div>이름</div>
            <div>{{infor.name}}</div>
            <input type="text" class="form-control joinInput" id="sample6_postcode" :value="postcode" placeholder="우편번호" disabled>
            <input type="text" class="form-control joinInput" id="sample6_address" :value="address" placeholder="주소" disabled>
            <input type="text" class="form-control joinInput" id="sample6_detailAddress"  :value="detailAddress" placeholder="상세주소">
            <input type="button" @click="this.sample6_execDaumPostcode"  class="btn btn-primary btn-default btn-sm" value="주소변경하기">
            <input type="text" id="phone" class="form-control joinInput" placeholder="핸드폰 번호를 입력 해주세요"><input type="button" id="sendPhoneButton" class="btn btn-primary" @click="this.sendPhone" value="인증번호전송">
            <input type="text" id="randnum" class="form-control joinInput" placeholder="인증번호를 입력해주세요"><input type="button" id="sendRandButton" class="btn btn-primary" @click="this.sendRand" value="확인" disabled>
            
            
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
                    location.href='/firstdoor';
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
        sample6_execDaumPostcode() {
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
        }
    },created(){
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
        document.head.appendChild(recaptchaScript)
    }

}
</script>