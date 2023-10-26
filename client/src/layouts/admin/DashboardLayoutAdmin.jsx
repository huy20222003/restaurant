import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
//@mui
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import {
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
//component
import {
  MainListItems,
  SecondaryListItems,
} from '../../Components/Admin/ListItem/ListItem';
import NotificationsPopover from './header/NotificationsPopover';
//context
import { useAuth } from '../../hooks/context';
//utils
// utils
import { bgBlur } from '../../utils/cssStyles';
//--------------------------------------------------------------

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  opacity: 0.95,
  boxShadow: theme.customShadows.z1,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const DashboardLayoutAdmin = () => {
  document.title = 'Admin Dashboard';
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    authState: { user },
    logoutUser,
  } = useAuth();

  const handleLogoutAdmin = () => {
    logoutUser();
    navigate('/auth/admin/login');
  };

  const handleNavigate = (data) => {
    if (data == 'dashboard') {
      navigate('/admin');
    } else if (data == 'profile') {
      navigate('/admin/profile');
    } else if (data == 'setting') {
      navigate('/admin/setting');
    }
    handleClose();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
              backgroundColor: '#fff',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon sx={{ color: '#000' }} />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            ></Typography>
            <NotificationsPopover />
            <Avatar
              src={user?.avatar}
              alt="avatar"
              sx={{ cursor: 'pointer', ml: '0.5rem' }}
              onClick={handleClick}
            />
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
              <Box sx={{ my: 1.5, px: 2.5 }}>
                <Typography variant="subtitle2" noWrap>
                  {user?.fullName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                  noWrap
                >
                  {user?.email}
                </Typography>
              </Box>
              <MenuItem onClick={() => handleNavigate('dashboard')}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => handleNavigate('profile')}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleNavigate('setting')}>
                Setting
              </MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />

              <MenuItem onClick={handleLogoutAdmin} sx={{ m: 1 }}>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              backgroundColor: 'rgb(47, 101, 203)',
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" sx={{ backgroundColor: 'rgb(55, 111, 208)' }}>
            <MainListItems />
            <Divider sx={{ my: 1, borderColor: '#fff' }} />
            <SecondaryListItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardLayoutAdmin;
