import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useReponsive';
// components
// import Logo from '../../../../Components/User/logo';
import Iconify from '../../../../Components/User/iconify';
// sections
import RegisterForm from '../../../../section/auth/RegisterForm';
//context
import { useCommon, useAuth } from '../../../../hooks/context';
//firebase
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../../config/firebase/firebase';
//sweetalert2
import Swal from 'sweetalert2';
//cookie
import Cookies from 'js-cookie';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6, 0),
}));

// ----------------------------------------------------------------------

const Register = () => {
  const mdUp = useResponsive('up', 'md');
  const { handleEvolvingFunctionality } = useCommon();
  const { registerUser, loadUser } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);
      setUser({
        fullName: data.user.displayName,
        username: data.user.uid,
        email: data.user.email,
        avatar: data.user.photoURL,
        password: '1234567'
      });
      try {
        const response = await registerUser(user);
        if(!response.success) {
          Swal.fire('Failed', 'Login Failed', 'error')
        } else {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
          Cookies.set('user', response.accessToken, { expires: expiration });
          Cookies.set('refresh', response.refreshToken, { expires: 365 });
          await loadUser();
          Swal.fire('Success', 'Login Success', 'success');
          navigate('/dashboard/app');
        }
      } catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Server Error', 'error');
    }
  };

  return (
    <>
      <Helmet>
        <title> Signup </title>
      </Helmet>

      <StyledRoot>
        {/* <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        /> */}

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 5, mb: 5 }}>
              Hi, Welcome to Restaurant
            </Typography>
            <img
              src="/assets/illustrations/illustration_register.svg"
              alt="register"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Signup
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
            Do you already have an account? {''}
              <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                Signin
              </Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={signInWithGoogle}
              >
                <Iconify
                  icon="eva:google-fill"
                  color="#DF3E30"
                  width={22}
                  height={22}
                />
              </Button>

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleEvolvingFunctionality}
              >
                <Iconify
                  icon="eva:facebook-fill"
                  color="#1877F2"
                  width={22}
                  height={22}
                />
              </Button>

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleEvolvingFunctionality}
              >
                <Iconify
                  icon="eva:twitter-fill"
                  color="#1C9CEA"
                  width={22}
                  height={22}
                />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <RegisterForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default Register;
