import axiosConfig from "./axiosConfig";

const tableApi = {
    getAll: ()=> {
        const url = `/table`;
        return axiosConfig.get(url);
    },
    getOne: (tableId)=> {
        const url = `/table/${tableId}`;
        return axiosConfig.get(url);
    },
    createTable: (data)=> {
        const url = '/table/create-table';
        return axiosConfig.post(url, data);
    },
    updateTable: (tableId, data)=> {
        const url = `/table/update-table/${tableId}`;
        return axiosConfig.put(url, data);
    },
    deleteTable: (tableId)=> {
        const url = `/table/delete-table/${tableId}`;
        return axiosConfig.delete(url);
    }
}

export default tableApi;