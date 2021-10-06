import axios from 'axios';

async function requestToServer(url,data){
      return  await axios.post(url,data,{
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true ,
    }).then(function(response){
        console.log(response.data);
        return response.data;
     })
}

export {requestToServer};