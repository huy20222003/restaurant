import axiosConfig from './axiosConfig';

const cartApi = {
    getCart: ()=> {
        const url = '/cart';
        return axiosConfig.get(url);
    },
    updateCart: (data)=> {
        const url = '/cart/update-cart';
        return axiosConfig.put(url, data);
    },
    updateQuantity: (data)=> {
        const url = '/cart/update-cart-quantity';
        return axiosConfig.put(url, data);
    },
    deleteProductFromCart: (productId)=> {
        const url = `/cart/update-cart/delete-product/${productId}`;
        return axiosConfig.delete(url);
    }
}

export default cartApi;