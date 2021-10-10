<template>
    <div>
      
    </div>
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
         opener.opener.window.location.reload();
        opener.close();
        self.close();
    }
 
}
</script>
