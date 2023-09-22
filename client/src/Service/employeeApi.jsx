import axiosConfig from "./axiosConfig";

const dishApi = {
    getAll: ()=> {
        const url = `/employee`;
        return axiosConfig.get(url);
    },
    getOne: (employeeId)=> {
        const url = `/employee/${employeeId}`;
        return axiosConfig.get(url);
    },
    createEmployee: (data)=> {
        const url = '/employee/create-emloyee';
        return axiosConfig.post(url, data);
    },
    updateEmployee: (employeeId, data)=> {
        const url = `/employee/update-employee/${employeeId}`;
        return axiosConfig.put(url, data);
    },
    deleteEmployee: (employeeId)=> {
        const url = `/employee/delete-employee/${employeeId}`;
        return axiosConfig.delete(url);
    }
}

export default dishApi;