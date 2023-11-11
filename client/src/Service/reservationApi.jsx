import axiosConfig from './axiosConfig';

const reservationApi = {
    getReservation: ()=> {
        const url = '/reservation';
        return axiosConfig.get(url);
    },
    getAllById: ()=> {
        const url = '/reservation/get-by-id';
        return axiosConfig.get(url);
    },
    createReservation: (data)=> {
        const url = '/reservation/create-reservation';
        return axiosConfig.post(url, data);
    },
    filterReservation: (data)=> {
        const url = 'reservation/filter-reservation';
        return axiosConfig.post(url, data);
    }
}

export default reservationApi;