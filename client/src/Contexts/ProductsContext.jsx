//date
import { parseISO, compareDesc } from 'date-fns';
//react
import { createContext, useCallback, useReducer, useState } from 'react';
//reducer
import {
  initProductsState,
  reducer,
} from '../Reducers/ProductsReducer/reducer';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAll,
  getOne,
  setPage,
  searchProduct,
  filterProduct,
  sortProduct,
  filterProductByCategory,
} from '../Reducers/ProductsReducer/action';
//api
import productApi from '../Service/productApi';
//------------------------------------------------

export const ProductsContext = createContext();

export const ProductsProvider = (prop) => {
  const [productsState, dispatch] = useReducer(reducer, initProductsState);
  const [currentPage, setCurrentPage] = useState(1);
  const [property, setProperty] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleGetAllProducts = useCallback(async () => {
    const pageSize = 50;
    try {
      const response = await productApi.getAll(currentPage, pageSize);
      if (response.data.success) {
        dispatch(getAll(response.data.products));
        const pageData = {
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
        };
        dispatch(setPage(pageData));
      }
    } catch (error) {
      return handleError(error);
    }
  }, [currentPage]);

  const handleGetOneProduct = useCallback(async (productId) => {
    try {
      const response = await productApi.getOne(productId);
      if (response.data.success) {
        dispatch(getOne(response.data.product));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleCreateProduct = useCallback(async (product) => {
    try {
      const response = await productApi.createProduct(product);
      if (response.data.success) {
        dispatch(createProduct(response.data.product));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleUpdateProduct = useCallback(async (productId, data) => {
    try {
      const response = await productApi.updateProduct(productId, data);
      if (response.data.success) {
        dispatch(updateProduct(response.data.product));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleDeleteProduct = useCallback(async (productId) => {
    try {
      const response = await productApi.deleteProduct(productId);
      if (response.data.success) {
        dispatch(deleteProduct(productId));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleSearchProduct = useCallback(async (searchValue) => {
    try {
      const response = await productApi.searchProduct(searchValue);
      if (response.data.success) {
        dispatch(searchProduct(response.data.products));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleFilterProduct = useCallback(async (filteredProducts) => {
    dispatch(filterProduct(filteredProducts));
  }, []);

  const handleSortProduct = (type) => {
    let sortedProducts = [];

    switch (type) {
      case 'newest':
        sortedProducts = [...productsState.products].sort((a, b) =>
          compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
        );
        break;
      case 'priceAsc':
        sortedProducts = [...productsState.products].sort(
          (a, b) => b.price - a.price
        );
        break;
      case 'priceDesc':
        sortedProducts = [...productsState.products].sort(
          (a, b) => a.price - b.price
        );
        break;
    }

    dispatch(sortProduct(sortedProducts));
  };

  const handleFilterProductsByCategory = async(filtervalue)=> {
    try {
      const response = await productApi.filterProductsByCategory(filtervalue);
      dispatch(filterProductByCategory(response.data.products));
    } catch (error) {
      return handleError(error);
    }
  }

  const ProductsData = {
    quantity,
    setQuantity,
    property,
    setProperty,
    productsState,
    handleGetAllProducts,
    handlePageChange,
    currentPage,
    handleGetOneProduct,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleSearchProduct,
    handleSortProduct,
    handleFilterProduct,
    handleFilterProductsByCategory,
  };

  return (
    <ProductsContext.Provider value={ProductsData}>
      {prop.children}
    </ProductsContext.Provider>
  );
};
