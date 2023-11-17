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
} from '@mui/material';
//component
import Logo from '../../../Components/User/logo';
import Nav from './nav';
//icon
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
//-------------------------------------------------------

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
    z-index: 1100;
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
    width: 100vư;
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

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <StyledPaper elevation={4} component="header">
      <StyledToolbar>
        <StyledContainer>
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Typography sx={{ lineHeight: 0, m: 0 }} component={Link} href="/">
              <Logo
                sx={{
                  width: { xs: '1rem', sm: '1rem', md: '2rem', lg: '2rem' },
                  height: { xs: '1rem', sm: '1rem', md: '2rem', lg: '2rem' },
                }}
              />
            </Typography>
            <Typography sx={{ lineHeight: 0, m: 0 }} component={Link} href="/">
              <StyledSpan>v1.0</StyledSpan>
            </Typography>
          </Box>
          <Box sx={{ mt: '2rem' }}>
              <Nav />
            </Box>
          <Box
            sx={{
              display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' },
            }}
          >
            {open ? <CloseIcon onClick={toggleDrawer} /> : <MenuIcon onClick={toggleDrawer} />}
          </Box>
        </StyledContainer>
      </StyledToolbar>
    </StyledPaper>
  );
};

export default Header;
