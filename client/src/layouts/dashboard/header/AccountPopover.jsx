import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
  Button,
} from '@mui/material';
//context
import { useAuth } from '../../../hooks/context';
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const {
    authState: { user, isAuthenticated },
    logoutUser,
  } = useAuth();
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/auth/login');
  };

  const handleNavigate = (data) => {
    if (data == 'dashboard') {
      navigate('/dashboard/app');
    } else if (data == 'profile') {
      navigate('/dashboard/profile');
    } else if (data == 'setting') {
      navigate('/dashboard/setting');
    }
    handleClose();
  };

  return (
    <>
      {isAuthenticated ? (
        <IconButton
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              '&:before': {
                zIndex: 1,
                content: "''",
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              },
            }),
          }}
        >
          <Avatar src={user?.avatar} alt="photoURL" />
        </IconButton>
      ) : (
        <Box>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.75rem',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate('/auth/login')}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate('/auth/register')}
            >
              Register
            </Button>
          </Stack>
        </Box>
      )}

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem onClick={() => handleNavigate('dashboard')}>
            Dashboard
          </MenuItem>
          <MenuItem onClick={() => handleNavigate('profile')}>Profile</MenuItem>
          <MenuItem onClick={() => handleNavigate('setting')}>Setting</MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
