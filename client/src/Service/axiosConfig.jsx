import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
//----------------------------------------------

const axiosConfig = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use((config) => {
  const token = Cookies.get('user');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const navigate = useNavigate();
    if (error.response && error.response.status === 401) {
      const refreshToken = Cookies.get('refresh');
      if (refreshToken) {
        try {
          let response;

          if (!window.location.href.includes('admin')) {
            response = await axiosConfig.post('/auth/refresh', {
              refreshToken,
            });
          } else {
            response = await axiosConfig.post('/auth/admin/refresh', {
              refreshToken,
            });
          }
          const newToken = response.data.accessToken;

          // Lưu token mới vào cookie
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
          Cookies.set('user', newToken, {
            expires: expiration,
          });

          // Thực hiện lại yêu cầu gốc với token mới (nếu có)
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axios.request(error.config);
        } catch (refreshError) {
          console.error('Lỗi khi làm mới token:', refreshError);
        }
      } else {
        Cookies.remove('user');
        Cookies.remove('refresh');
        if (window.location.href.includes('admin')) {
          navigate('/auth/admin/login');
        } else {
          navigate('/auth/login');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
