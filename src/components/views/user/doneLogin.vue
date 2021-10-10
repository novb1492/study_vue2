<template>
    <div></div>
</template>

<script>
export default {
    name:'joinPage',
    data(){
        return {
      
        }
    },
    methods:{
      
    
    },
    created(){
        opener.opener.document.location.href='/test';
        self.close();
    }
 
}
</script>
