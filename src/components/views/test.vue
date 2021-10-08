<template>
    <div>
        {{price}}
        {{message}}
        <input type="button" @click="request" value="클릭">
        <a href="http://localhost:8080/spring/test">백엔드</a>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
    

</template>
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
        }
    },
}
</script>
