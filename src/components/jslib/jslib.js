import axios from 'axios';

export async function requestToServer(url,data){
      return  await axios.post(url,data,{
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true ,
    }).then(function(response){
        var reuslt=response.data;
        console.log(reuslt);
        console.log('통신직후')
        if(reuslt.flag==false){
            console.log('새토큰 받아오기');

        }
        return reuslt;
     })
}
export function loginCheck(){
    var url='http://localhost:8080/auth/checkLogin';
   return requestToServer(url,null);
}
export function requestToServer2(url,data){
    return  axios.post(url,data,{
      headers: {
          "Content-Type": `application/json`,
      },
      withCredentials: true ,
  }).then(function(response){
      var reuslt=response.data;
      console.log(reuslt);
      console.log('통신직후')
      if(reuslt.flag==false){
          console.log('새토큰 받아오기');

      }
      return reuslt;
   })
}
export function checkEmthy(text){
    console.log('checkEmthy');
    if(text=='' || text==null ||text== undefined){
        return true;
    }
    return false;
}
export function checkLength(text,min,max){
    console.log('checkLength');
    var len=text.length;
    if(len<min||len>max){
        return true;
    }
    return false;
}

