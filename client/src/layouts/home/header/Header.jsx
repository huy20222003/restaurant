import { useState } from 'react';
//@mui
import styled from '@emotion/styled';
import {
  Paper,
  Toolbar,
  Container,
  Box,
  Typography,
  Link,
  Drawer as MuiDrawer,
  useTheme,
  useMediaQuery,
} from '@mui/material';
//component
import Logo from '../../../Components/User/logo';
import Nav from './nav';
//icon
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
//-------------------------------------------------------

const drawerWidth = 240;

const StyledPaper = styled(Paper)`
  && {
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-image: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
    position: fixed;
    z-index: 1;
    top: 0px;
    left: auto;
    right: 0px;
    background-color: rgba(255, 255, 255, 0.9);
    color: inherit;
    box-shadow: none;
    opacity: 0.95;
    border-radius: 0;
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 56px;
    transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

const StyledContainer = styled(Container)`
  && {
    width: 100vw;
    margin-left: auto;
    box-sizing: border-box;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StyledSpan = styled('span')(() => ({
  minWidth: '24px',
  lineHeight: 0,
  borderRadius: '6px',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  justifyContent: 'center',
  textTransform: 'capitalize',
  padding: '0px 4px',
  fontWeight: 700,
  transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  color: 'rgb(0, 108, 156)',
  backgroundColor: 'rgba(0, 184, 217, 0.16)',
  marginLeft: '4px',
  top: '10px',
  left: '60px',
  height: '20px',
  fontSize: '11px',
  cursor: 'pointer',
  position: 'absolute',
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: open ? drawerWidth : 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    overflowX: 'hidden',
    ...(!open && {
      width: 0,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }),
    [theme.breakpoints.up('sm')]: {
      width: open ? theme.spacing(9) : 0,
    },
  },
}));

const Header = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <StyledPaper elevation={4} component="header">
        <StyledToolbar>
          <StyledContainer>
            <Box sx={{ lineHeight: 0, position: 'relative' }}>
              <Typography
                sx={{ lineHeight: 0, m: 0 }}
                component={Link}
                href="/"
              >
                <Logo
                  sx={{
                    width: { xs: '1rem', sm: '1rem', md: '2rem', lg: '2rem' },
                    height: { xs: '1rem', sm: '1rem', md: '2rem', lg: '2rem' },
                  }}
                />
              </Typography>
              <Typography
                sx={{ lineHeight: 0, m: 0 }}
                component={Link}
                href="/"
              >
                <StyledSpan>v1.1</StyledSpan>
              </Typography>
            </Box>
            <Box
              sx={{
                display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' },
                cursor: 'pointer'
              }}
            >
              {open ? (
                <CloseIcon onClick={toggleDrawer} />
              ) : (
                <MenuIcon onClick={toggleDrawer} />
              )}
            </Box>
            {isSmallScreen ? (
              <Drawer anchor="left" open={open} onClose={toggleDrawer}>
                <Nav />
              </Drawer>
            ) : (
              <Box>
                <Nav />
              </Box>
            )}
          </StyledContainer>
        </StyledToolbar>
      </StyledPaper>
    </>
  );
};

export default Header;
