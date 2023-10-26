import { createContext, useCallback, useReducer } from 'react';
import {
  initEmployeesState,
  reducer,
} from '../Reducers/EmployeesReducer/reducer';
import {
  getAllEmployees,
  getOneEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../Reducers/EmployeesReducer/action';
import employeeApi from '../Service/employeeApi';
//context
import { useAuth } from '../hooks/context';
//--------------------------------------------------

export const EmployeesContext = createContext();

export const EmployeesProvider = (prop) => {
  const [employeesState, dispatch] = useReducer(reducer, initEmployeesState);
  const { loadUser } = useAuth();

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handleGetAll = useCallback(async () => {
    try {
      const response = await employeeApi.getAll();
      dispatch(getAllEmployees(response.data.employees));
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleGetOneEmployee = useCallback(async (employeeId) => {
    try {
      const response = await employeeApi.getOne(employeeId);
      dispatch(getOneEmployee(response.data.employee));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleUpdateEmployee = useCallback(async (employeeId, data) => {
    try {
      const response = await employeeApi.updateEmployee(employeeId, data);
      if (response.data.success) {
        dispatch(updateEmployee(response.data.employee));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleCreateEmployee = useCallback(async (data) => {
    try {
      const response = await employeeApi.createEmployee(data);
      if (response.data.success) {
        dispatch(createEmployee(response.data.employee));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleDeleteEmployee = useCallback(async (employeeId) => {
    try {
      const response = await employeeApi.deleteEmployee(employeeId);
      dispatch(deleteEmployee(employeeId));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleUpdatePasswordEmployee = useCallback(async (newPassword) => {
    try {
      const response = await employeeApi.updatePassword(newPassword);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, [loadUser]);

  const handleUpdateAvatar = useCallback(async (avatarUpdate) => {
    try {
      const response = await employeeApi.updateAvatar(avatarUpdate);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, [loadUser]);

  const handleUpdateDetail = useCallback(async(updateForm)=> {
    try {
      const response = await employeeApi.updateDetail(updateForm);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, [loadUser]);

  const handleUpdateRole = useCallback(async (role) => {
    try {
      const response = await employeeApi.updateRole(role);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, [loadUser]);

  const EmployeesData = {
    employeesState,
    handleGetAll,
    handleGetOneEmployee,
    handleCreateEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    handleUpdatePasswordEmployee,
    handleUpdateAvatar,
    handleUpdateDetail,
    handleUpdateRole,
  };

  return (
    <EmployeesContext.Provider value={EmployeesData}>
      {prop.children}
    </EmployeesContext.Provider>
  );
};
