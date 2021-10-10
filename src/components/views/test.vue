<template>
    <div>
        {{price}}
        {{message}}
        <input type="button" @click="request" value="클릭">
        <a href="http://localhost:8080/spring/test">백엔드</a>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <input type="button" @click="this.settle" value="settle">
    </div>
    

</template>
<script src="https://tbnpg.settlebank.co.kr/resources/js/SettlePG.js"></script>
<script>
import Axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../jslib/MyUploadAdapter';

export default {
   name :'home',
    data(){
        return{  
            price:50,
            message:null,
            editor: ClassicEditor,
                editorData: '<p>.</p>',
                editorConfig: {
                    extraPlugins: [this.MyCustomUploadAdapterPlugin],
                }
        }
    },
    methods :{
        request() {
            let data=JSON.stringify({
                "value":123,
            });
            Axios.post('http://localhost:8080/spring/test',data,{
                headers: {
                    "Content-Type": `application/json`,
                },
                withCredentials: true ,
            }).then(res => { 
                console.log(res.data) 
                var response=res.data;
                this.message=response.message;
            });
        },
        MyCustomUploadAdapterPlugin( editor ) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
            // Configure the URL to the upload script in your back-end here!
            return new MyUploadAdapter( loader );
            };
        },
        settle(){

            SETTLE_PG.pay({
            "env": "https://tbnpg.settlebank.co.kr",
            "mchtId": "nx_mid_il",
            "method": "vbank",
            "trdDt": 20211010,    
            "trdTm": 110000,
            "mchtTrdNo":123456789,
            "mchtName": "세틀뱅크",
            "mchtEName": "Settlebank",
            "pmtPrdtNm": 'test',
            "trdAmt": 1000,
            "mchtCustId":'mchtCustId',
            "notiUrl": "http://kim80800.iptime.org:8080/auth/settlebank",
            "nextUrl": "https://localhost:8443/doneSettlebankPage.jsp",
            "cancUrl": "https://localhost:8443/canceSettlePage.html",
            "pktHash": 'pktHash',
            "ui": {
                "type": "popup",
                "width": "430",
                "height": "660"
            }
            }, function(rsp){
                console.log('통신완료');
                console.log(rsp);
            });      
        }
    },
    created(){
        console.log('sss');
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://tbnpg.settlebank.co.kr/resources/js/SettlePG.js')
        document.head.appendChild(recaptchaScript)
    }
}
</script>
