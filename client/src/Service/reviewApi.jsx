import axiosConfig from './axiosConfig';

const reviewApi = {
    getAllByProduct: (productId)=> {
        const url = `/review/${productId}`;
        return axiosConfig.get(url);
    },
    createReview: (data)=> {
        const url = '/review/create-review';
        return axiosConfig.post(url, data);
    },
    updateOrder: (data)=> {
        const url = '/review/update-order';
        return axiosConfig.put(url, data);
    }
}

export default reviewApi;