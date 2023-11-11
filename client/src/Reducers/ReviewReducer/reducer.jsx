import { CREATE_REVIEW, GET_ALL_REVIEWS_BY_PRODUCT } from './constants';

export const initReviewState = {
  reviews: [],
  review: '',
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_REVIEWS_BY_PRODUCT:
      return {
        ...state,
        reviews: payload,
      };
    case CREATE_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, payload],
      };
    default:
      return {
        ...state,
      };
  }
};
