import axios from 'axios';

async function requestToServer(url,data){
      return  await axios.post(url,data,{
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true ,
    }).then(function(response){
        var reuslt=response.data;
        console.log(reuslt);
        if(reuslt.flag==false){
            console.log('새토큰 받아오기');

        }
        return reuslt;
     })
}
function loginCheck(){
    var url='http://localhost:8080/auth/checkLogin';
   return requestToServer(url,null);
 }

export {loginCheck};