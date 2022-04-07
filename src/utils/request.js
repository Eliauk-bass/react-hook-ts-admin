import axios from "axios";
import { notification } from 'antd';
var qs = require('qs');
let x_xsrf_token = '',
  random_num = Math.random();

window.cancelAjax = []

export default (url, options) => {
  let params = Object.assign({ lang: 'zh-CN' }, options.param, options.method.toLowerCase() == 'get' ? {
    r: Math.random()
  } : {});//对象合并
  let headers = {
    'X-Requested-With': 'XMLHttpRequest',//Ajax异步HTTP请求
    'random-num': random_num,//设置随机请求头 防止某个相同的请求头对目标网站频繁进行访问
    'x-xsrf-token': x_xsrf_token,
    'x-access-token': JSON.parse(sessionStorage.getItem('userInfo'))?.xaccessToken || ''//进行登录验证
  }
  let value = {
    method: options.method,
    url: url,
    data: options.data,
    headers: headers,
    params,
    // 在请求拦截器中配置cancelToken。通过new CancelToken把取消函数放到pending数组中。
    // CancelToken跳页面后取消掉还在pending状态的请求以提高性能
    cancelToken: new axios.CancelToken((c) => {
      cancelAjax.push(c) //在请求拦截器中为每一个请求添加cancelToken，并将cancel方法存入全局数组中保存
    })
  }
  if (options.responseType) {
    value.responseType = options.responseType
  }
  return axios(value).then(function (res) {
    let inner_x_xsrf_token = res.headers['x-xsrf-token'];//added by yany
    if (inner_x_xsrf_token) {
      x_xsrf_token = inner_x_xsrf_token;
    }
    if (res?.status === 200 && res?.data?.code === 1005) {
      sessionStorage.setItem('userInfo', JSON.stringify({}));
      window.top.location.href = window.location.origin + window.location.pathname + '#/user/login';//返回登陆页
      // return Promise.resolve(res.data);
    } else {
      return Promise.resolve(res.data);
    }
  }).catch(function (err) {
    let res = err.response;
    if (res) {
      let { status, data: { msg } } = res;
      switch (status) {
        case 1005:
          window.top.location.href = window.location.origin + window.location.pathname + '#/user/login';//返回登陆页
          break;
        default:
          notification['error']({
            description: `服务器${status}错误`,
          });
        // return Promise.resolve(res);
      }
    }
  });
}