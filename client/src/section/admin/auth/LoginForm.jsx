import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//@mui
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
//context
import { useAuth } from '../../../hooks/context';
//Sweetalert
import Swal from 'sweetalert2';
//Cookies
import Cookies from 'js-cookie';
//component
import Iconify from '../../../Components/User/iconify';
import { useState } from 'react';
//-----------------------------------------------------------------

const LoginForm = () => {
  const { loginAdmin, loadUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required('Invalid username'),
      password: yup.string().required('Invalid password'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const loginData = await loginAdmin(values);
        if (!loginData.success) {
          Swal.fire('Failed', 'Login Failed', 'error');
          setLoading(false);
        } else {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 60 * 60 * 1000);
          Cookies.set('user', loginData.accessToken, { expires: expiration });
          Cookies.set('refresh', loginData.refreshToken, { expires: 365 });
          await loadUser();
          Swal.fire('Success', 'Login Success!', 'success');
          navigate('/admin');
        }
      } catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%',
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
            </Stack>

            <Stack spacing={3}>
              <TextField
                error={!!(formik.touched.username && formik.errors.username)}
                fullWidth
                helperText={formik.touched.username && formik.errors.username}
                label="Username"
                name="username"
                id='username'
                {...formik.getFieldProps('username')}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    if (document.getElementById('username').value === '') {
                      return;
                    } else {
                      document.getElementById('password').focus();
                    }
                  }
                }}
              />
              <TextField
                error={!!(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                name="password"
                id='password'
                type="password"
                {...formik.getFieldProps('password')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    formik.handleSubmit();
                  }
                }}
              />
            </Stack>
            {loading ? (
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: '2rem'
                }}
              >
                <CircularProgress size={30} />
              </Stack>
            ) : (
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loadingPosition="start"
                loadingIndicator={<CircularProgress size={16} />}
                onClick={formik.handleSubmit}
                sx={{mt: '2rem'}}
              >
                Login
              </LoadingButton>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
