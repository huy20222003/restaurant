import { GET_CART, UPDATE_CART } from "./constants";

export const initCartState = {
    items: [], 
    userCart: null, 
    property: []
  };
  
  export const reducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_CART:
        return {
          ...state,
          items: payload.items,
          userCart: payload.userCart,
        };
        case UPDATE_CART:
        return {
          ...state,
          items: payload.items,
          userCart: payload.userCart,
        };
      default:
        return {
          ...state,
        };
    }
  };
  