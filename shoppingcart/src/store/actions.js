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
} from './actionTypes';
import axios from 'axios';

export const performLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};
export const clearErrorMsg = () => {
  return {
    type: AUTH_ERROR,
    payload: '',
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
      .then(async (res) => {
        console.log(res.data.userType)
        dispatch({
          type: AUTH_LOGIN,
          payload: {
            token: res.data.token,
            userId: res.data.userId,
            userType: res.data.userType,
          },
        });
        await axios
          .post('http://localhost:3004/cart/user/' + res.data.userId)
          .then((cartResponse) => {
            console.log(cartResponse.data);
            dispatch({
              type: CART,
              payload: cartResponse.data._id,
            });
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
      payload: "got userID",
    });
  };
};
export const performAddToCart = (newCart) => {
  return (dispatch) => {
    return axios
      .post('http://localhost:3004/cart', {
        productId: newCart.productId,
        quantity: newCart.quantity,
        userId: newCart.userId,
        cartId: newCart.cartId
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
        dispatch({
          type: GET_CART,
          payload: res.data,
        });
        return res.data;
      })
      .catch((error) => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'no cart found',
        });
        return error;
      });
  };
};

// export const getCart = (userId) => {
//   return async (dispatch) => {
//     return await axios
//       .post('http://localhost:3004/cart/user/' + userId)
//       .then((res) => {
//         console.log(res.data);
//         dispatch({
//           type: GET_CART,
//           payload: res.data,
//         });
//         return res.data;
//       })
//       .catch((error) => {
//         dispatch({
//           type: AUTH_ERROR,
//           payload: error,
//         });
//         return error;
//       });
//   };
// };

// export const performRemoveProduct = (cartId, productId, userId) => {
//   return async (dispatch) => {
//     return await axios
//       .patch('http://localhost:3004/cart/cart/' + cartId + '/' + productId, {
//         productId: productId,
//         userId: userId,
//       })
//       .then((res) => {
//         dispatch({
//           type: REMOVE_PRODUCT,
//           payload: 'Successfully Removed the product',
//         });
//         return res;
//       })
//       .catch((error) => {
//         dispatch({
//           type: AUTH_ERROR,
//           payload: 'Oops cannot remove',
//         });
//         return error;
//       });
//   };
// };

export const performRemoveProduct = (cartId, productId, userId) => {
  return async (dispatch) => {
    return await axios
      .patch('http://localhost:3004/cart/cart/' + cartId + '/' + productId)
      .then(async (res) => {
        dispatch({
          type: REMOVE_PRODUCT,
          payload: 'Successfully Removed the product',
        });
        return res;
      })
      .catch((error) => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Oops cannot remove',
        });
        return error;
      });
  };
};

export const performCheckout = (cartId, userId) => {
  return async (dispatch) => {
    return await axios
      .post('http://localhost:3005/order', {cartId: cartId, userId: userId})
      .then(async (res) => {
        console.log(res);
        await axios
          .post('http://localhost:3004/cart/user/' + userId)
          .then((cartResponse) => {
            console.log(cartResponse.data);
            dispatch({
              type: CART,
              payload: cartResponse.data._id,
            });
          });
        return res;
      })
      .catch((error) => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Error with purchase',
        });
        return error;
      });
  };
};
