import Axios from 'axios';

async function requestToServer(data,url) {
    const response = await Axios.post(url,data,{
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true ,
    }).then(res => { 
        console.log(res.data); 
        return res.data;
    });
     return response;
}
export {requestToServer};