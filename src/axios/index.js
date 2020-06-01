import axios from "axios";
import Qs from "qs";
const instance = axios.create();
axios.defaults.withCredentials = true;
//请求拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//响应拦截器
instance.interceptors.response.use(
  response => {
    return Promise.resolve(response.data);
  },
  error => {
    return Promise.reject(error);
  }
);
export default {
  axiosPost(url, param) {
    return new Promise(function(resolve, reject) {
      instance({
        method: "post",
        url: url,
        data: param,
        headers: { "content-type": "application/x-www-form-urlencoded" }
      }).then(res => {
        resolve(res);
      });
    });
  },
  axiosGet(url, param) {
    return new Promise(function(resolve, reject) {
      instance({
        method: "get",
        url: url,
        data: param
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
      }).then(res => {
        resolve(res);
      });
    });
  },
  axiosPostForm(url, param) {
    return new Promise(function(resolve, reject) {
      instance({
        method: "post",
        url: url,
        data: Qs.stringify(param),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(
        response => {
          resolve(response);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  axiosPostJson(url, param) {
    return new Promise(function(resolve, reject) {
      instance({
        method: "post",
        url: url,
        data: param,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(
        response => {
          resolve(response);
        },
        error => {
          reject(error);
        }
      );
    });
  }
};
