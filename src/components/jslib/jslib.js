import axios from 'axios';

export async function requestGetToServer(url){
      return  await axios.get(url,{withCredentials: true}).then(function(response){
        var result=response.data;
        console.log(result);
        console.log('통신직후');
        if(result.message=='newAccessToken'){
            console.log('새토큰으로 요청');
            return requestGetToServer(url);
        }
        return result;
     })
}
export async function requestPostToServer(url,data){
    return  await axios.get(url,data,{
      headers: {
          "Content-Type": `application/json`,
      },
      withCredentials: true ,
  }).then(function(response){
      var result=response.data;
      console.log(result);
      console.log('통신직후')
      if(result.message=='newAccessToken'){
        console.log('새토큰으로 요청');
        return requestPostToServer(url,data);
        }   
      return result;
   })
}
export async function requestPutToServer(url,data){
    return  await axios.put(url,data,{
      headers: {
          "Content-Type": `application/json`,
      },
      withCredentials: true ,
  }).then(function(response){
      var result=response.data;
      console.log(result);
      console.log('통신직후')
      if(result.message=='newAccessToken'){
        console.log('새토큰으로 요청');
        return requestPutToServer(url,data);
    }
      return result;
   })
}
export  function requestGetToServer2(url){
    return  axios.get(url,{withCredentials: true}).then(function(response){
      var result=response.data;
      console.log(result);
      console.log('통신직후')
      if(result.flag==false){
          console.log('새토큰 받아오기');
      }
      return result;
   })
}
export function requestToPostServer2(url,data){
    return  axios.post(url,data,{
      headers: {
          "Content-Type": 'application/json',
      },
      withCredentials: true ,
  }).then(function(response){
      var result=response.data;
      console.log(result);
      console.log('통신직후')
      if(result.flag==false){
          console.log('새토큰 받아오기');

      }
      return result;
   })
}
export function requestPutToServer2(url,data){
    return  axios.put(url,data,{
      headers: {
          "Content-Type": 'application/json',
      },
      withCredentials: true ,
  }).then(function(response){
      var result=response.data;
      console.log(result);
      console.log('통신직후')
      if(result.flag==false){
          console.log('새토큰 받아오기');

      }
      return result;
   })
}
export function loginCheck(scope){
    var url='http://localhost:8080/user/crud/checkLogin?scope='+scope;
   return requestGetToServer(url).then(result=>{
            if(result.message=='newAccessToken'){
                console.log('새토큰으로 다시시도');
                return requestGetToServer(url);
            }else{
                return result;
            }
        });
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
export function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
       var temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}
export function getAllParam() {
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    console.log(result);
    return result;
}

