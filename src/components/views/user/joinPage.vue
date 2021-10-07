<template>

    <div>
      
        <div class="col-md-3" style="float: none; margin:0 auto;">
            <div v-for="text in this.textarray" :key="text">
                <div>{{text}}</div>
                <input type="text" id="joinInput" class="form-control">   
            </div>
            <vue-daum-postcode @complete="onComplete"/>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import VueDaumPostcode from "vue-daum-postcode";

Vue.use(VueDaumPostcode);

export default {
    name:'joinPage',
    data(){
        return {
            textarray:['이메일을 입력해주세요','비밀번호를입력해주세요','비밀번호를 다시 입력해주세요','이름을 입력해주세요(실명)','핸드폰번호를입력해주세요'],
            test:"<a href='http://medium.com'>링크</a>"
        }
    },
    methods:{
        onComplete(result) {
            console.log(result);
        },
    },
}
</script>
