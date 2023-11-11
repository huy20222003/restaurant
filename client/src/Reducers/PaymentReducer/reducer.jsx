import { GET_ALL_PAYMENT, GET_ONE_PAYMENT, UPDATE_PAYMENT } from './constant';

export const initPaymentsState = {
  payments: [],
  payment: '',
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PAYMENT:
      return {
        ...state,
        payments: payload,
      };
    case GET_ONE_PAYMENT:
      return {
        ...state,
        payment: payload,
      };
    case UPDATE_PAYMENT:
      const newPayments = state.payments.map((payment) =>
        payment._id === payload._id ? payload : payment
      );

      return {
        ...state,
        payments: newPayments,
      };
    default:
      return {
        ...state,
      };
  }
};
