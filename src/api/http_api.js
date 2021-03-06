import axios from "axios"

const axiosAPI = axios.create({
  baseURL : "https://pb.kotlinist.ru" // it's not recommended to have this info here.
});

const apiRequest = (method, url, request) => {
    const headers = {
        authorization: "",
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    return axiosAPI({
        method,
        url,
        data: request,
        headers,
        responseType: "arraybuffer", responseEncoding: "binary"
      }).then(res => {
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
};

const get = (url, request) => apiRequest("get",url,request);

const deleteRequest = (url, request) =>  apiRequest("delete", url, request);

const post = (url, request) => apiRequest("post", url, request);

const put = (url, request) => apiRequest("put", url, request);

const patch = (url, request) =>  apiRequest("patch", url, request);

const API = {
    get,
    delete: deleteRequest,
    post,
    put,
    patch
};
export default API;