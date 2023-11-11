import axiosConfig from "./axiosConfig";

const paymentApi = {
    getAll: ()=> {
        const url = '/payment';
        return axiosConfig.get(url);
    },
    getOne: (paymentId)=> {
        const url = `/payment/${paymentId}`;
        return axiosConfig.get(url);
    },
    createPayment: (data)=> {
        const url = '/payment/create-payment';
        return axiosConfig.post(url, data);
    },
    createPaymentVNPay: (data)=> {
        const url = '/payment/create-payment-vnpay';
        return axiosConfig.post(url, data);
    },
    vnpayIPN: ()=> {
        const url = '/payment/vnpay-ipn';
        return axiosConfig.get(url);
    },
    vnpayReturn: ()=> {
        const url = '/payment/vnpay-return';
        return axiosConfig.get(url);
    },
    updatePayment: (paymentId, data)=> {
        const url = `payment/update-payment/${paymentId}`;
        return axiosConfig.put(url, data);
    }
}

export default paymentApi;