import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCT,
  GET_ONE_PRODUCT,
  SEARCH_PRODUCT,
  SET_PAGE,
  FILTER_PRODUCT,
  UPDATE_PRODUCT,
  SORT_PRODUCT,
  FILTER_PRODUCT_BY_CATEGORY,
} from './constants';

export const initProductsState = {
  product: null,
  products: [],
  currentPage: null,
  totalPages: null,
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PRODUCT:
      return {
        ...state,
        products: payload,
      };
    case GET_ONE_PRODUCT:
      return {
        ...state,
        product: payload,
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: payload.currentPage,
        totalPages: payload.totalPages,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
      };
    case UPDATE_PRODUCT:
      const newProducts = state.products.map((product) =>
        product._id === payload._id ? payload : product
      );

      return {
        ...state,
        products: newProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
      };
    case SEARCH_PRODUCT:
      return {
        ...state,
        products: payload,
      };
    case FILTER_PRODUCT:
      return {
        ...state,
        products: payload,
      };
    case SORT_PRODUCT:
      return {
        ...state,
        products: payload,
      };
    case FILTER_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        products: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
