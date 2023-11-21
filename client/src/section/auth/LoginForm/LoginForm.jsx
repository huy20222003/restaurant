import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Box,
  CircularProgress,
} from '@mui/material';
//mui icon
import { LoadingButton } from '@mui/lab';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
//cookie
import Cookies from 'js-cookie';
// components
import Iconify from '../../../Components/User/iconify';
//context
import { useAuth } from '../../../hooks/context';
//sweetalert
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { useFormik } from 'formik';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  document.title = 'Login';
  const { loginUser, loadUser } = useAuth();
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
        const loginData = await loginUser(values);
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
          navigate('/dashboard/app');
        }
      } catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          error={!!(formik.touched.username && formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          {...formik.getFieldProps('username')}
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
          name="password"
          label="Password"
          id="password"
          required
          fullWidth
          error={!!(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          {...formik.getFieldProps('password')}
          type={showPassword ? 'text' : 'password'}
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
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
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

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Box>
          <Checkbox name="remember" label="Remember me" />
          Remember me
        </Box>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      {loading ? (
        <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
        >
          Login
        </LoadingButton>
      )}
    </>
  );
}
