import Axios from 'axios';

function requestToServer(data,url) {
    Axios.post(url,data,{
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true ,
    }).then(res => { 
        console.log(res.data) 
        return res.data;
    });
    
}
export {requestToServer};