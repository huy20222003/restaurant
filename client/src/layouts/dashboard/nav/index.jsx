import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Link,
  Drawer,
  Typography,
  Avatar,
  Stack,
  Button,
} from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useReponsive';
// components
import Logo from '../../../Components/User/logo';
import Scrollbar from '../../../Components/User/scrollbar';
import NavSection from '../../../Components/User/nav-section';
//context
import { useAuth } from '../../../hooks/context';
//SvgColor
import SvgColor from '../../../Components/User/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  navConfig: PropTypes.object,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isDesktop = useResponsive('up', 'lg');
  const {
    authState: { user, isAuthenticated },
  } = useAuth();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navConfig = [
    {
      title: 'Dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'Product',
      path: 'products',
      icon: icon('ic_product'),
    },
    isAuthenticated && {
      title: 'Cart',
      path: 'cart',
      icon: icon('ic_cart'),
    },
    isAuthenticated && {
      title: 'Order',
      path: 'order',
      icon: icon('ic_cart'),
    },
    isAuthenticated && {
      title: 'Reservation',
      path: 'reservation',
      icon: icon('ic_reservation'),
    },
  ];

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      {isAuthenticated ? (
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none">
            <StyledAccount>
              <Avatar src={user?.avatar} alt="photoURL" />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {user?.fullName}
                </Typography>

                {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user?.roles}
                </Typography> */}
              </Box>
            </StyledAccount>
          </Link>
        </Box>
      ) : (
        <Box sx={{ mb: 5 }}>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.75rem',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              size="medium"
              onClick={() => navigate('/auth/login')}
            >
              Login
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={() => navigate('/auth/register')}
            >
              Register
            </Button>
          </Stack>
        </Box>
      )}

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
