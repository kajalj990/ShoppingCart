import {
  AUTH_ERROR,
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  GET_ALL_PRODUCTS,
  GET_USER
} from './actionTypes';
import axios from 'axios';

export const performLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const performRegister = (newUser) => {
  return async (dispatch) => {
    return await axios
      .post('http://localhost:3001/user/signup', {
        name: newUser.name,
        gender: newUser.gender,
        address: newUser.address,
        phoneNo: newUser.phoneNo,
        emailId: newUser.emailId,
        password: newUser.password,
        userType: newUser.userType,
      })
      .then((res) => {
        console.log('Registered Successfully');
        return res;
      })
      .catch((error) => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Error While registering',
        });
        return error;
      });
  };
};

export const showError = (data) => {
  return {
    type: AUTH_ERROR,
    payload: data,
  };
};

export const performLogin = (data) => {
  return async (dispatch) => {
    return await axios
      .post('http://localhost:3001/user/login', data)
      .then((res) => {
        dispatch({
          type: AUTH_LOGIN,
          payload: {token:res.data.token,
                    userId :res.data.userId
                    }
        });
        return res;
      })
      .catch((error) => {
        dispatch({
          type: AUTH_ERROR,
          payload: "Email or password isn't correct",
        });
        return error;
      });
  };
};

export const getUser = ()=>{
  return async (dispatch) => {
  await dispatch({
    type:GET_USER,
    payload:"got userID"
  })
}
}