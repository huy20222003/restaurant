import {
    GET_ALL_PAYMENT
  } from './constant';
  
  export const initPaymentsState = {
    payments: [],
    payment: ''
  };
  
  export const reducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ALL_PAYMENT:
        return {
          ...state,
          payments: payload,
        };
      default:
        return {
          ...state,
        };
    }
  };
  