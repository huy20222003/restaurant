//@mui
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
//context
import { useAuth, useUser } from '../../../hooks/context';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
//sweetalert
import Swal from 'sweetalert2';
//-----------------------------------------------

const ProfileCardInfo = () => {
  const {
    authState: { user },
  } = useAuth();
  const { handleUpdateDetail } = useUser();
  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName || '',
      username: user?.username || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      shipAddress: user?.shipAddress || '',
      address: user?.address || '',
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .required('Fullname is required')
        .max(200, 'Maximum characters are 200'),
      username: yup
        .string()
        .required('Username is required')
        .max(100, 'Maximum characters are 100'),
      email: yup.string().email('Invalid email').required('Email is required'),
      phoneNumber: yup.string().max(10, 'Maximum characters are 10'),
      shipAddress: yup.string().max(2000, 'Maximum characters are 2000'),
      address: yup.string().max(2000, 'Maximum characters are 2000'),
    }),
    onSubmit: async (values) => {
      try {
        const updateData = await handleUpdateDetail(values);
        if (updateData.success) {
          Swal.fire('', 'Update success', 'success');
        } else {
          Swal.fire('', 'Update failed', 'error');
        }
      } catch (error) {
        Swal.fire('', 'Server Error', 'error');
      }
    },
  });

  return (
    <Box component="form" noValidate autoComplete="off">
      <Paper elevation={0}>
        <CardHeader>
          <Typography variant="body2">Profile</Typography>
          <Typography variant="subtitle2">The content can be edit</Typography>
        </CardHeader>
        <CardContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  name="fullName"
                  label="Fullname"
                  {...formik.getFieldProps('fullName')}
                  error={!!(formik.touched.fullName && formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  name="username"
                  label="Username"
                  {...formik.getFieldProps('username')}
                  error={!!(formik.touched.username && formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  name="email"
                  label="Email"
                  {...formik.getFieldProps('email')}
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  name="phoneNumber"
                  label="Phone Number"
                  {...formik.getFieldProps('phoneNumber')}
                  error={
                    !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  name="shipAddress"
                  label="Ship Address"
                  {...formik.getFieldProps('shipAddress')}
                  error={
                    !!(formik.touched.shipAddress && formik.errors.shipAddress)
                  }
                  helperText={
                    formik.touched.shipAddress && formik.errors.shipAddress
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  name="address"
                  label="Address"
                  {...formik.getFieldProps('address')}
                  error={!!(formik.touched.address && formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            size="medium"
            variant="contained"
            type="submit"
            onClick={formik.handleSubmit}
          >
            Save Detail
          </Button>
        </CardActions>
      </Paper>
    </Box>
  );
};

export default ProfileCardInfo;
