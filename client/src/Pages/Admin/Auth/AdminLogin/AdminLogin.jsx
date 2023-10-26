//@mui
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
//component
import { LoginForm } from '../../../../section/admin/auth';
//------------------------------------------

const AdminLogin = () => {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto',
      }}
    >
      <Grid container sx={{ flex: '1 1 auto' }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%',
            }}
          ></Box>
          <LoginForm />
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            // background:
            //   'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
          }}
        >
          <Box sx={{ p: 3 }}>
            <img alt="" src="/assets/illustrations/illustration_login_admin.svg" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminLogin;
