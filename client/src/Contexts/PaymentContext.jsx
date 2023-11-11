import { createContext, useCallback, useReducer } from 'react';
import { initPaymentsState, reducer } from '../Reducers/PaymentReducer/reducer';
import { getAll, getOne, updatePayment } from '../Reducers/PaymentReducer/action';
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

  const handleGetOnePayment = useCallback(async (paymentId) => {
    try {
      const response = await paymentApi.getOne(paymentId);
      if (response.data.success) {
        dispatch(getOne(response.data.payment));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleCreatePayment = useCallback(async(data)=> {
    try {
      const response = await paymentApi.createPayment(data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handlePaymentWithVnPay = useCallback(async(data)=> {
    try {
      const response = await paymentApi.createPaymentVNPay(data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleUpdatePayment = useCallback(async(paymentId, data)=> {
    try {
      const response = await paymentApi.updatePayment(paymentId, data);
      dispatch(updatePayment(response.data.payment));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const paymentsData = {
    paymentState,
    handleGetAllPayments,
    handleGetOnePayment,
    handleCreatePayment,
    handlePaymentWithVnPay,
    handleUpdatePayment,
  };

  return (
    <PaymentContext.Provider value={paymentsData}>
      {prop.children}
    </PaymentContext.Provider>
  );
};
