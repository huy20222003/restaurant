//@mui
import { Box, ButtonBase, Grid, Link, Stack, Typography } from '@mui/material';
//component
import Logo from '../../../Components/User/logo';
import Iconify from '../../../Components/User/iconify';

//----------------------------------------------

const Footer = () => {
  return (
    <Box sx={{ padding: '60px 16px 40px', borderTop: '1px solid gray' }}>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
        <Typography component={Link} href="/">
          <Box
            sx={{
              width: '40px',
              height: '40px',
              display: 'inline-flex',
              marginBottom: '24px',
            }}
          >
            <Logo />
          </Box>
        </Typography>
        <Typography variant="h6">Góc Bếp Nhỏ</Typography>
      </Stack>
      <Grid Box sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={8} md={3}>
          <Typography variant="body2">
            The starting point for your next project with Minimal UI Kit, built
            on the newest version of Material-UI ©, ready to be customized to
            your style.
          </Typography>
          <Stack
            sx={{
              flexDirection: 'row',
              mt: '24px',
              justifyContent: {
                xs: 'center',
                sm: 'center',
                md: 'flex-start',
                lg: 'flex-start',
              },
            }}
          >
            <ButtonBase sx={{ p: '8px' }}>
              <Iconify icon="logos:facebook" />
            </ButtonBase>
            <ButtonBase sx={{ p: '8px' }}>
              <Iconify icon="skill-icons:instagram" />
            </ButtonBase>
            <ButtonBase sx={{ p: '8px' }}>
              <Iconify icon="logos:twitter" />
            </ButtonBase>
            <ButtonBase sx={{ p: '8px' }}>
              <Iconify icon="skill-icons:linkedin" />
            </ButtonBase>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            sx={{
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
              },
              gap: '40px',
              mt: '2rem',
            }}
          >
            <Stack
              sx={{
                gap: '16px',
                width: '100%',
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Typography
                variant="overline"
                sx={{ textTransform: 'uppercase' }}
              >
                Home
              </Typography>
              <Typography variant="body2">About us</Typography>
              <Typography variant="body2">Contact us</Typography>
              <Typography variant="body2">FAQ</Typography>
            </Stack>
            <Stack
              sx={{
                gap: '16px',
                width: '100%',
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Typography
                variant="overline"
                sx={{ textTransform: 'uppercase' }}
              >
                Legal
              </Typography>
              <Typography variant="body2">Terms and Condition</Typography>
              <Typography variant="body2">Privacy Policy</Typography>
            </Stack>
            <Stack
              sx={{
                gap: '16px',
                width: '100%',
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Typography
                variant="overline"
                sx={{ textTransform: 'uppercase' }}
              >
                Contact
              </Typography>
              <Typography variant="body2">admin@gmail.com</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
