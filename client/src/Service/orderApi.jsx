import axiosConfig from "./axiosConfig";

const orderApi = {
    getAll: ()=> {
        const url = '/order';
        return axiosConfig.get(url);
    },
    getAllById: ()=> {
        const url = '/order/getAllById';
        return axiosConfig.get(url);
    },
    getOne: (orderId)=> {
        const url = `/order/${orderId}`;
        return axiosConfig.get(url);
    },
    createOrder: (data)=> {
        const url ='/order/create-order';
        return axiosConfig.post(url, data)
    },
    filterOrderByStatus: (data)=> {
        const url =`/order/filter-order?status=${data}`;
        return axiosConfig.get(url)
    },
    updateOrder: (orderId, data)=> {
        console.log(orderId)
        const url = `/order/update-order/${orderId}`;
        return axiosConfig.patch(url, data);
    }
}

export default orderApi;