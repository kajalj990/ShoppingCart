import {
  AUTH_ERROR,
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  GET_ALL_PRODUCTS,
  GET_USER,
  GET_CART,
  CART,
  GET_CARTID,
  REMOVE_PRODUCT,
  ORDER
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
          payload: {
            token: res.data.token,
            userId: res.data.userId,
            userType: res.data.admin
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

export const getUser = () => {
  return async (dispatch) => {
    await dispatch({
      type: GET_USER,
      payload: "got userID"
    })
  }
}
export const performAddToCart = (newCart) => {
  return (dispatch) => {
    return axios
      .post('http://localhost:3004/cart', {
        productId: newCart.productId,
        quantity: newCart.quantity,
        userId: newCart.userId
      })
      .then((res) => {
        console.log(res.data.cart._id)
        dispatch({
          type: CART,
          payload: res.data.cart._id
        });
        return res
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
export const getCart = (cartId) => {
  return async (dispatch) => {
    return await axios
      .get('http://localhost:3004/cart/' + cartId)
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: GET_CART,
          payload: res.data
        })
        return res.data;
      }).catch((error) => {
        dispatch({
          type: AUTH_ERROR,
          payload: "no cart found"
        })
        return error;
      })
  }
}

export const performRemoveProduct = (cartId, productId, userId) => {
  return async (dispatch) => {
    return await axios.patch('http://localhost:3004/cart/cart/' + cartId + '/' + productId, { productId: productId, userId: userId })
      .then(res => {
        console.log(res.data)
        dispatch({
          type: REMOVE_PRODUCT,
          payload: res.data
        })
        return res.data
      }).catch((error) => {
        dispatch({
          type: AUTH_ERROR,
          payload: "Oops cannot remove"
        })
        return error;
      })
  }
}

export const placeOrder = (cartId) => {
  return async (dispatch) => {
    return await axios
      .post('http://localhost:3005/order/', cartId)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: ORDER,
          payload: res.data
        })
        return res
      }).catch((error) => {
        dispatch({
          type: AUTH_ERROR,
          payload: "Oops Cannot Save the order some error"
        })
        return error;
      })
  }
}