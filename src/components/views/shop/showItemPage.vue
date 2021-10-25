<template>
    <div class="showItemPage">

    </div>
</template>
<script>
import * as module from "../../jslib/jslib.js";
export default {
    name:'showItemPage',
     data() {
     return {
         item:[]
     }
    },
    methods: {
        getItem(id){
            module.requestGetToServer('http://localhost:8080/product/select?detail=one&id='+id).then(result=>{
                console.log(result);
            });
        }
    },
    created() {
         var id=module.getParam('id');
         this.getItem(id);
    },
}
</script>