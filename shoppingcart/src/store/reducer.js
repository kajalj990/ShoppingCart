import {
  AUTH_ERROR,
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  GET_ALL_PRODUCTS,
  GET_USER,
  GET_CART,
  CART

} from './actionTypes';

const defaultState = {
  isAuthenticated: false,
  token: '',
  errorMessage: '',
  username: '',
  userId: '',
  cartId:''
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      console.log('Error Reducer');
      return { ...state, errorMessage: action.payload };
    case AUTH_LOGIN:
      console.log('Logged in');
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: '',
        isAuthenticated: false,
        errorMessage: '',
      };
    case AUTH_REGISTER:
      return { ...state };
    case GET_USER:
        return{
          userId:action.payload.userId
        }
    case GET_CART:
      return{
        cartId:action.payload.cartId
      }
    case CART :{
      console.log('cart added')
      return{
        ...state,
        userId:action.payload.cartId
      }
    }
  }
  return state;
};

export default authReducer;
