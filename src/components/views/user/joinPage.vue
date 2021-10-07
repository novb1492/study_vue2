<template>
    <div>
        <div class="col-md-3" style="float: none; margin:0 auto;">
            <div v-for="text in this.textarray" :key="text">
                <div>{{text}}</div>
                <input type="text" id="joinInput" class="form-control">   
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name:'joinPage',
    data(){
        return {
            textarray:['이메일을 입력해주세요','비밀번호를입력해주세요',+'c'],
        }
    },
    methods:{

    }
}
</script>
