<template>
    <div>
        {{price}}
        {{message}}
        <input type="button" @click="request" value="클릭">
    </div>
    

</template>
<script>
import Axios from 'axios';



export default {
   name :'home',
    data(){
        return{
            price:50,
            message:null,
        }
    },
    methods :{
        request() {
            let data=JSON.stringify({
                "seat":123,
                "month":1234,
                "year":1234
            });
            Axios.post('http://localhost:8080/auth/test',data,{
                headers: {
                    "Content-Type": `application/json`,
                },
                withCredentials: true ,
            }).then(res => { 
                console.log(res.data) 
                var response=res.data;
                this.message=response.message;
            });
        }
    },
}
</script>
