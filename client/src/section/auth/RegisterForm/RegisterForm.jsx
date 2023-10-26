import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
//cookie
import Cookies from 'js-cookie';
// components
import Iconify from '../../../Components/User/iconify';
import { AuthContext } from '../../../Contexts/AuthContext';
//sweetalert
import Swal from 'sweetalert2';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  document.title = 'Đăng ký tài khoản';
  const { registerUser } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .required('FullName is required')
        .max(200, 'FullName maximum 200 characters'),
      username: yup
        .string()
        .required('Username is required')
        .max(100, 'Username maximum 100 characters'),
      email: yup
        .string()
        .required('Email is required')
        .matches(/^\S+@\S+\.\S+$/, 'Invalid email'),
      phoneNumber: yup.string().max(10, 'Maximum phone number is 10 characters'),
      password: yup
        .string()
        .required('Password is required')
        .min(7)
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{7,}$/,
          'Minimum password consists of 7 characters, with uppercase letters, lowercase letters, numbers and special characters'
        ),
      confirmPassword: yup
        .string()
        .required('ConfirmPassword is required')
        .oneOf([yup.ref('password')], 'Password do not match'),
    }),
    onSubmit: async (values) => {
      if (formik.values.password !== formik.values.confirmPassword) {
        Swal.fire('Error', 'Password do not match!', 'error');
      } else {
        try {
          const registerData = await registerUser(values);
          if (!registerData.success) {
            Swal.fire('Failed', 'Please check the information again!', 'error');
          } else {
            const expiration = new Date();
            expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
            Cookies.set('user', registerData.accessToken, {
              expires: expiration,
            });
            Cookies.set('refresh', registerData.refreshToken, { expires: 365 });
            Swal.fire('Success', 'Sign up Success!', 'success');
            navigate('/auth/login');
          }
        } catch (error) {
          Swal.fire('Error', 'Server Error', 'error');
        }
      }
    },
  });

  const handleCheck = () => {
    Swal.fire({
      title: 'Question',
      text: 'Hoang Sa and Truong Sa belong to which country?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Viet Nam',
      cancelButtonText: 'Orthers',
    }).then(async (result) => {
      if (result.isConfirmed) {
        formik.handleSubmit();
      } else {
        Swal.fire('', 'Resgister failed!', 'error');
      }
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="fullName"
          label="FullName"
          name="fullName"
          error={!!(formik.touched.fullName && formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
          autoComplete="fullName"
          {...formik.getFieldProps('fullName')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          error={!!(formik.touched.username && formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          autoComplete="username"
          {...formik.getFieldProps('username')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          error={!!(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoComplete="email"
          {...formik.getFieldProps('email')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          autoComplete="phoneNumber"
          {...formik.getFieldProps('phoneNumber')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="password"
          label="Password"
          id="password"
          error={!!(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
          fullWidth
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
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          id="confirmPassword"
          error={
            !!(formik.touched.confirmPassword && formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          required
          fullWidth
          {...formik.getFieldProps('confirmPassword')}
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
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      ></Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleCheck}
      >
        Signup
      </LoadingButton>
    </>
  );
}
