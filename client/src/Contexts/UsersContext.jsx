import { createContext, useCallback, useReducer } from 'react';
import { initUsersState, reducer } from '../Reducers/UsersReducer/reducer';
import { getAllUsers, createUser, deleteUser, getOneUser } from '../Reducers/UsersReducer/action';
import userApi from '../Service/userApi';
import { useAuth } from '../hooks/context';
//------------------------------------------------------------

export const UsersContext = createContext();

export const UsersProvider = (prop) => {
  const [usersState, dispatch] = useReducer(reducer, initUsersState);
  const { loadUser } = useAuth();

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };


  const handleGetAllUser = useCallback(async()=> {
    try {
        const response = await userApi.getAll();
        dispatch(getAllUsers(response.data.users));
    } catch (error) {
        return handleError(error);
    }
  }, []);

  const handleGetOneUser = useCallback(async(userId)=> {
    try {
        const response = await userApi.getOne(userId);
        dispatch(getOneUser(response.data.user));
        return response.data;
    } catch (error) {
        return handleError(error);
    }
  }, []);

  const handleCreateUser = useCallback(async(data)=> {
    try {
      const response = await userApi.createUser(data);
      dispatch(createUser(response.data.user));
      return response.data;
  } catch (error) {
      return handleError(error);
  }
  }, []);

  const handleDeleteUser = useCallback(async(userId)=> {
    try {
      const response = await userApi.deleteUser(userId);
      dispatch(deleteUser(userId));
      return response.data;
  } catch (error) {
      return handleError(error);
  }
  }, []);

  const handleUpdateAvatar = useCallback(async(avatarUpdate)=> {
    try {
      const response = await userApi.updateAvatar(avatarUpdate);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, [loadUser]);

  const handleUpdateDetail = useCallback(async(updateForm)=> {
    try {
      const response = await userApi.updateDetail(updateForm);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, [loadUser]);

  const handleUpdatePasswordUser = useCallback(async (newPassword) => {
    try {
      const response = await userApi.updatePassword(newPassword);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, [loadUser]);

  const handleUpdateRole = useCallback(async (role) => {
    try {
      const response = await userApi.updateRole(role);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, [loadUser]);

  const UsersContextData = {
    usersState,
    handleGetAllUser,
    handleCreateUser,
    handleGetOneUser,
    handleDeleteUser,
    handleUpdateAvatar,
    handleUpdateDetail,
    handleUpdatePasswordUser,
    handleUpdateRole,
  };

  return (
    <UsersContext.Provider value={UsersContextData}>
      {prop.children}
    </UsersContext.Provider>
  );
};
