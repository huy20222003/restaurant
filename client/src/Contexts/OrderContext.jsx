import { createContext, useCallback, useReducer } from 'react';
import { initOrdersState, reducer } from '../Reducers/OrderReducer/reducer';
import {
  getAll,
  getOne,
  createOrder,
  getAllById,
  filterOrderByStatus,
} from '../Reducers/OrderReducer/action';
import orderApi from '../Service/orderApi';

export const OrderContext = createContext();

export const OrdersProvider = (prop) => {
  const [ordersState, dispatch] = useReducer(reducer, initOrdersState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handleGetAllOrders = useCallback(async () => {
    try {
      const response = await orderApi.getAll();
      if (response.data.success) {
        dispatch(getAll(response.data.orders));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleGetAllOrdersById = useCallback(async () => {
    try {
      const response = await orderApi.getAllById();
      if (response.data.success) {
        dispatch(getAllById(response.data.orders));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleGetOneOrder = useCallback(async (OrderId) => {
    try {
      const response = await orderApi.getOne(OrderId);
      if (response.data.success) {
        dispatch(getOne(response.data.order));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleCreateOrder = useCallback(async (data) => {
    try {
      const response = await orderApi.createOrder(data);
      if (response.data.success) {
        dispatch(createOrder(response.data.order));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleFilterOrderByStatus = useCallback(async (status) => {
    try {
      if (status == 'all') {
        await handleGetAllOrdersById();
      } else {
        const response = await orderApi.filterOrderByStatus(status);
        if (response.data.success) {
          dispatch(filterOrderByStatus(response.data.orders));
        }
        return response.data;
      }
    } catch (error) {
      return handleError(error);
    }
  }, [handleGetAllOrdersById]);

  const handleUpdateOrder = useCallback(async (orderId, status)=> {
    console.log(orderId)
    try {
      const response = await orderApi.updateOrder(orderId, status);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const OrdersData = {
    ordersState,
    handleGetAllOrders,
    handleGetAllOrdersById,
    handleGetOneOrder,
    handleCreateOrder,
    handleFilterOrderByStatus,
    handleUpdateOrder,
  };

  return (
    <OrderContext.Provider value={OrdersData}>
      {prop.children}
    </OrderContext.Provider>
  );
};
