<template>
    <div v-if="userfooter()">
        <div class="footer">
            풋터
        </div>
    </div>
</template>
<style>
.footer{position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
	text-align: center;
}
</style>
<script>
export default {
   name:'footer',
    data(){
        return{  
        }
    },
    methods :{
        userfooter(){
            var showOrNot=true;
            var uri=location.pathname;
            if(uri=='/'||uri=='/joinPage'||uri=='/loginPage'||uri=='/myPage'||uri=='/findPwdPage'||uri=='/findEmailPage'||uri=='/changePhonePage'||uri=='/showItemPage'){
                showOrNot=false;
            }else{
                showOrNot=true;
            }
            return showOrNot;
        }
    },


}
</script>
