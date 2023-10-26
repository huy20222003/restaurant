import { createContext, useCallback, useReducer } from 'react';
import { initPaymentsState, reducer } from '../Reducers/PaymentReducer/reducer';
import { getAll } from '../Reducers/PaymentReducer/action';
import paymentApi from '../Service/paymentApi';

export const PaymentContext = createContext();

export const PaymentsProvider = (prop) => {
  const [paymentState, dispatch] = useReducer(reducer, initPaymentsState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handleGetAllPayments = useCallback(async () => {
    try {
      const response = await paymentApi.getAll();
      if (response.data.success) {
        dispatch(getAll(response.data.payments));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleCreatePayment = async(data)=> {
    try {
      const response = await paymentApi.createPayment(data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }

  const handlePaymentWithVnPay = async(data)=> {
    try {
      const response = await paymentApi.createPaymentVNPay(data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }

  const paymentsData = {
    paymentState,
    handleGetAllPayments,
    handleCreatePayment,
    handlePaymentWithVnPay,
  };

  return (
    <PaymentContext.Provider value={paymentsData}>
      {prop.children}
    </PaymentContext.Provider>
  );
};
