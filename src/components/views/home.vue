<template>
    <div>
        {{price}}
        <input type="button" onclick="reuqest()" value="클릭">
    </div>
    

</template>
<script>
import Axios from 'axios';



export default {
   name :'home',
    data(){
        return{
            price:50,
        }
    },
    methods :{
        request() {
            Axios.get('http://localhost:8080/auth/test').then(res => { console.log(res.data) });
        }
    },
}
</script>
