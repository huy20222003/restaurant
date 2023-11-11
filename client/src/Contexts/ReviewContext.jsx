import { createContext, useCallback, useReducer } from 'react';
import { initReviewState, reducer } from '../Reducers/ReviewReducer/reducer';
import { getAllByProduct, createReview } from '../Reducers/ReviewReducer/action';
import reviewApi from '../Service/reviewApi';

export const ReviewContext = createContext();

export const ReviewProvider = (prop) => {
  const [reviewState, dispatch] = useReducer(reducer, initReviewState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handleGetAllReviewsByProduct = useCallback(async (productId) => {
    try {
      const response = await reviewApi.getAllByProduct(productId);
      if (response.data.success) {
        dispatch(getAllByProduct(response.data.reviews));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleCreateReview = useCallback(async (data) => {
    try {
      const response = await reviewApi.createReview(data);
      if (response.data.success) {
        dispatch(createReview(response.data.review));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleUpdateOrderAfterReview = useCallback(async (data) => {
    try {
      const response = await reviewApi.updateOrder(data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const reviewData = {
    reviewState,
    handleGetAllReviewsByProduct,
    handleCreateReview,
    handleUpdateOrderAfterReview,
  };

  return (
    <ReviewContext.Provider value={reviewData}>
      {prop.children}
    </ReviewContext.Provider>
  );
};
