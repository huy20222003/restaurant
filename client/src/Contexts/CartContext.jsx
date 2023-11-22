import { createContext, useCallback, useReducer } from 'react';
import { initCartState, reducer } from '../Reducers/CartReducer/reducer';
import { getCart, updateCart } from '../Reducers/CartReducer/action';
import cartApi from '../Service/cartApi';

export const CartContext = createContext();

export const CartProvider = (prop) => {
  const [cartState, dispatch] = useReducer(reducer, initCartState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handleGetCart = useCallback(async () => {
    try {
      const response = await cartApi.getCart();
      if (response.data.success) {
        dispatch(getCart(response.data.userCart));
      }
    } catch (error) {
      return handleError();
    }
  }, []);

  const handleUpdateCart = useCallback(async(data)=> {
    try {
      const response = await cartApi.updateCart(data);
      if(response.data.success) {
        dispatch(updateCart(response.data.cart));
      }
      return response.data;
    } catch (error) {
      return handleError();
    }
  }, []);

  const handleUpdateQuantity = useCallback(async(data)=> {
    try {
      const response = await cartApi.updateQuantity(data);
      return response.data;
    } catch (error) {
      return handleError();
    }
  }, []);

  const handleDeleteProductFromCart = useCallback(async(productId)=> {
    try {
      const response = await cartApi.deleteProductFromCart(productId);
      if(response.data.success) {
        dispatch(updateCart(response.data.cart));
      }
      return response.data;
    } catch (error) {
      return handleError();
    }
  }, []);

  const CartData = {
    cartState,
    handleGetCart,
    handleUpdateCart,
    handleDeleteProductFromCart,
    handleUpdateQuantity,
    
  };

  return (
    <CartContext.Provider value={CartData}>
      {prop.children}
    </CartContext.Provider>
  );
};
