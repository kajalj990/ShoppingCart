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

const defaultState = {
  isAuthenticated: false,
  token: '',
  errorMessage: '',
  username: '',
  userId: '',
  userType:'',
  cartId:'',
  cart:[],
  orderId:''
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      console.log('Error Reducer');
      return { ...state, errorMessage: action.payload };
    case AUTH_LOGIN:
      console.log('Logged in');
      console.log(action.payload.userType)
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userId: action.payload.userId,
        userType:action.payload.userType
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
      console.log(action.payload)
      return{
        ...state,
        cart:action.payload,
      };
    case REMOVE_PRODUCT:
      return{
        ...state,
        cart:action.payload
      }
      // case GET_CARTID:
      // console.log(action.payload)
      // return{
      //   ...state,
      //   cartId:action.payload,
      // }
    case CART :{
      return{
        ...state,
        cartId:action.payload
      }
    }
    case ORDER :{
      return{
        ...state,
       // orderId:action.payload
      }
    }
  }
  return state;
};

export default authReducer;
