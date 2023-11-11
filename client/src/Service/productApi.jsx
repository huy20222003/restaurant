import axiosConfig from "./axiosConfig";

const productApi = {
    getAll: (currentPage, pageSize)=> {
        const url = `/products?page=${currentPage}&pageSize=${pageSize}`;
        return axiosConfig.get(url);
    },
    getOne: (productId)=> {
        const url = `/products/${productId}`;
        return axiosConfig.get(url);
    },
    createProduct: (data)=> {
        const url = '/products/create-product';
        return axiosConfig.post(url, data);
    },
    updateProduct: (productId, data)=> {
        const url = `/products/update-product/${productId}`;
        return axiosConfig.put(url, data);
    },
    deleteProduct: (productId)=> {
        const url = `/products/delete-product/${productId}`;
        return axiosConfig.delete(url);
    },
    searchProduct: (searchValue)=> {
        const url = `/products/search-product?q=${searchValue}`;
        return axiosConfig.get(url);
    },
    filterProductsByCategory: (filterValue)=> {
        const url = `/products/filter-product?q=${filterValue}`;
        return axiosConfig.get(url);
    },
}

export default productApi;