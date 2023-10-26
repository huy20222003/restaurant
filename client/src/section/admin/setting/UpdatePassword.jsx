import { useState } from 'react';
//@mui
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
//context
import { useEmployee } from '../../../hooks/context';
//sweetalert
import Swal from 'sweetalert2';
//component
import Iconify from '../../../Components/User/iconify';
//yup
import * as yup from 'yup';
//formik
import {useFormik} from 'formik';
//---------------------------------------------------------

const UpdatePassword = () => {
  const { handleUpdatePasswordEmployee } = useEmployee();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .required('Password is required')
        .min(7)
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{7,}$/,
          'Minimum password consists of 7 characters, with uppercase letters, lowercase letters, numbers and special characters'
        ),
      confirmNewPassword: yup
        .string()
        .required('ConfirmPassword is required')
        .oneOf([yup.ref('newPassword')], 'Password do not match'),
    }),
    onSubmit: async (values)=> {
      try {
        const response = await handleUpdatePasswordEmployee(values);
          if (!response.success) {
            Swal.fire('Failed', 'Update password failed', 'error');
          } else {
            Swal.fire('Success', 'Update password success', 'success');
          }
       
      } catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
    },
    onReset: ()=> {
      formik.setValues('');
    }
  });

  return (
    <form style={{ marginBottom: '1rem' }}>
      <Paper elevation={1} sx={{ borderRadius: '1rem' }}>
        <Box
          sx={{
            display: 'flex',
            p: '2rem 1.5rem 1rem',
            flex: '1 1 auto',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6">Password</Typography>
          <Typography variant="body2">Update password</Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: '1rem',
          }}
        >
          <FormControl sx={{ my: '0.5rem' }}>
            <TextField
              name="newPassword"
              label="Password"
              fullWidth
              {...formik.getFieldProps('newPassword')}
              error={!!(formik.touched.newPassword && formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              sx={{ maxWidth: { xs: '100%', sm: '100%', md: '50%' } }}
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
                        icon={
                          showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ my: '0.5rem' }}>
            <TextField
              name="confirmNewPassword"
              label="Password (Confirm)"
              fullWidth
              {...formik.getFieldProps('confirmNewPassword')}
              error={!!(formik.touched.confirmNewPassword && formik.errors.confirmNewPassword)}
              helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
              sx={{ maxWidth: { xs: '100%', sm: '100%', md: '50%' } }}
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
                        icon={
                          showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box
          sx={{
            p: '1rem',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Button
            size="medium"
            color="primary"
            variant="contained"
            sx={{ p: '0.5rem 1.25rem' }}
            type='submit'
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </form>
  );
};

export default UpdatePassword;
