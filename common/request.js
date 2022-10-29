import axios from "axios";

let baseURL = "http://127.0.0.1:6003";
// let baseURL = "http://119.29.184.178:6003";
// let baseURL = "http://api.wnb2022.com";

const service = axios.create({
  baseURL,
  timeout: 5000, // request timeout
  crossDomain: true,
});

service.interceptors.request.use(
  (config) => {
    //添加请求头
    let token = uni.getStorageSync("token") || "";
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (res) => {
    if (res.data.status == 1) {
      return res.data;
    } else if (res.data.status < 0) {
      uni.showToast({
        duration: 2000,
        icon: "error",
        title: res.data.message,
      });
      return Promise.reject(res.data.message);
    } else {
      return Promise.reject(res.data.message);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          uni.navigateTo({
            url: "/pages/login/index",
          });
          break;
        case 406:
          uni.showToast({
            duration: 2000,
            icon: "error",
            title: "参数校验错误，请稍后重试",
          });
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    var settle = require("axios/lib/core/settle");
    var buildURL = require("axios/lib/helpers/buildURL");
    uni.request({
      method: config.method.toUpperCase(),
      url:
        config.baseURL +
        buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config,
        };
        settle(resolve, reject, response);
      },
    });
  });
};

export default service;
