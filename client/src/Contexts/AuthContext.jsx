import { createContext, useCallback, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import { initStateAuth, reducer } from '../Reducers/AuthReducer/reducer';
import { setAuth } from '../Reducers/AuthReducer/action';
import authApi from '../Service/authApi';

export const AuthContext = createContext();

export const AuthProvider = (prop) => {
  const [authState, dispatch] = useReducer(reducer, initStateAuth);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const setAuthenticatedUser = (isAuthenticated, user ) => {
    dispatch(setAuth({ isAuthenticated, user }));
  };

  const loadUser = useCallback(async () => {
    try {
      const accessToken = Cookies.get('user');
      if (!accessToken) {
        setAuthenticatedUser(false, null);
        return;
      }
      let response;

      if (!window.location.href.includes('admin')) {
        response = await authApi.account();
      } else {
        response = await authApi.accountAdmin();
      }
      if (response.data.success) {
        setAuthenticatedUser(response.data.success, response.data.user);
      } else {
        setAuthenticatedUser(false, null);
        Cookies.remove('user');
      }
    } catch (error) {
      setAuthenticatedUser(false, null);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const registerUser = async (registerForm) => {
    try {
      const response = await authApi.register(registerForm);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const loginUser = async (loginForm) => {
    try {
      const response = await authApi.login(loginForm);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const loginAdmin = async (loginForm) => {
    try {
      const response = await authApi.loginAdmin(loginForm);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const logoutUser = () => {
    Cookies.remove('user');
    setAuthenticatedUser(false, null, null);
  };

  const AuthContextData = {
    authState,
    loadUser,
    registerUser,
    loginUser,
    loginAdmin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {prop.children}
    </AuthContext.Provider>
  );
};
