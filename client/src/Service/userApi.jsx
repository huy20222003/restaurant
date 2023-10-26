import axiosConfig from "./axiosConfig";

const userApi = {
    getAll: ()=> {
        const url = '/user'
        return axiosConfig.get(url);
    },
    getOne: (userId)=> {
        const url =`user/${userId}`;
        return axiosConfig.get(url);
    },
    createUser: (data)=> {
        const url = '/user/create-user';
        return axiosConfig.post(url, data);
    },
    deleteUser: (userId)=> {
        const url = `/user/delete-user/${userId}`;
        return axiosConfig.delete(url);
    },
    updateAvatar: (data)=> {
        const url = '/user/update-user/avatar';
        return axiosConfig.patch(url, data);
    },
    updateDetail: (data)=> {
        const url = 'user/update-user/detail';
        return axiosConfig.put(url, data);
    },
    updatePassword: (data)=> {
        const url = 'user/update-user/password';
        return axiosConfig.patch(url, data);
    },
    updateRole: (data)=> {
        const url = 'user/update-user/role';
        return axiosConfig.patch(url, data);
    }
}

export default userApi;