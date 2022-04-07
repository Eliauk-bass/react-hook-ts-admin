import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS
} from './constants';
import { loginCheck } from '../../models/common';
import { push } from 'react-router-redux'
import axios from 'axios'
import request from "../../utils/request";

interface loginRes {
  data: string;
  errorCode: number;
  errorMessage: string;
}

const checkLogin = async(param: loginCheck) => {
  let obj: loginRes = {
    data: '',
    errorCode: -1,
    errorMessage: '账号或密码错误，登录失败'
  }
  // await axios({
  //   method: 'get',
  //   url: '/httpServer/login'
  // }).then((res: any) => {
  //   if (param.username === res.data.username && param.password === res.data.password) {
  //       obj.data = '',
  //       obj.errorCode = 0,
  //       obj.errorMessage = '登录成功'
  //   }
  // }).catch((err :any) => {

  // })
  await request('/httpServer/login', {
    method: "get",
    param:{}
  }).then((res: any) => {
       if (param.username === res.username && param.password === res.password) {
        obj.data = '',
        obj.errorCode = 0,
        obj.errorMessage = '登录成功'
    }
  }).catch((err :any) => {
  })
  return obj
}

export const userLoadingSuccess = (response: loginRes) => {
  return {
    type: USER_LOGIN_SUCCESS,
    response
  }
};
export const userLoginFail = (response: loginRes) => {
  return {
    type: USER_LOGIN_FAILURE,
    response
  }
};


export const userLoginReq = (param: loginCheck) => {
  return async (dispatch: any) => {
    try {
      const response = await checkLogin(param)
      if (response.errorCode === 0) {
        await dispatch(userLoadingSuccess(response));
        // dispatch(push('/home'));
        setTimeout(() => {
          window.location.hash = `/main/home`
        }, 500);
      } else {
        await dispatch(userLoginFail(response));
      }
    }
    catch (err) {
      await dispatch(userLoginFail(err));
    }

  };
};
