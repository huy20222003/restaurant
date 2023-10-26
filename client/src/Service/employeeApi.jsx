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
    },
    updatePassword: (data)=> {
        const url = `/employee/update-employee/password`;
        return axiosConfig.patch(url, data);
    },
    updateAvatar: (data)=> {
        const url = `/employee/update-employee/avatar`;
        return axiosConfig.patch(url, data);
    },
    updateDetail: (data)=> {
        const url = 'employee/update-employee/detail';
        return axiosConfig.put(url, data);
    },
    updateRole: (data)=> {
        const url = 'employee/update-employee/role';
        return axiosConfig.patch(url, data);
    }
}

export default dishApi;