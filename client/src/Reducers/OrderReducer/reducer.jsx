import {
  CREATE_ORDER,
  FILTER_ORDER_BY_STATUS,
  GET_ALL_ORDERS,
  GET_ALL_ORDERSBY_ID,
  GET_ONE_ORDER,
} from './constant';

export const initOrdersState = {
  order: null,
  orders: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: payload,
      };
    case GET_ONE_ORDER:
      return {
        ...state,
        order: payload,
      };
      case GET_ALL_ORDERSBY_ID:
        return {
          ...state,
          orders: payload,
        };
    case CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders].concat(payload),
      };
    case FILTER_ORDER_BY_STATUS:
      return {
        ...state,
        orders: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
