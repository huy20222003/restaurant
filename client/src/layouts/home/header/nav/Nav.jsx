//@mui
import styled from '@emotion/styled';
import {
  Button,
  Link,
  Stack,
  Typography,
  Badge,
  Box,
  ButtonBase,
} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SettingsIcon from '@mui/icons-material/Settings';
import { keyframes } from '@mui/system';
//context
import { useAuth } from '../../../../hooks/context';
//----------------------------------------------------------------------

const StyledButton = styled(Button)`
  && {
    min-width: 0px;
    box-sizing: border-box;
    text-align: left;
    line-height: 1.57143;
    font-size: 0.875rem;
    font-family: __Public_Sans_66e638, __Public_Sans_Fallback_66e638, Helvetica,
      Arial, sans-serif;
    font-weight: 540;
    padding: 0px;
    height: 100%;
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: rgb(33, 43, 54);
    position: relative; /* Thêm position relative */
  }

  &:hover:before {
    /* Thêm pseudo-element khi hover */
    content: '';
    border-radius: 50%;
    position: absolute;
    width: 6px;
    height: 6px;
    left: -12px;
    background-color: rgb(250, 84, 28);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledButtonBaseBuy = styled(ButtonBase)`
  && {
    font-weight: 700;
    line-height: 1.71429;
    font-size: 0.875rem;
    text-transform: capitalize;
    font-family: __Public_Sans_66e638, __Public_Sans_Fallback_66e638, Helvetica,
      Arial, sans-serif;
    min-width: 64px;
    padding: 6px 12px;
    border-radius: 8px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    color: rgb(255, 255, 255);
    background-color: rgb(33, 43, 54);
  }
`;

const Nav = () => {
  const {
    authState: { isAuthenticated },
  } = useAuth();
  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Stack
        component="nav"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
          gap: '40px',
          height: '100%',
        }}
      >
        <Typography component={Link} href="/" sx={{ textDecoration: 'none' }}>
          <StyledButton>Home</StyledButton>
        </Typography>
        <Typography
          component={Link}
          href="/about"
          sx={{ textDecoration: 'none' }}
        >
          <StyledButton>About us</StyledButton>
        </Typography>
        <Typography
          component={Link}
          href="/dashboard/products"
          sx={{ textDecoration: 'none' }}
        >
          <StyledButton>Products</StyledButton>
        </Typography>
        <Typography component={Link} href="faq" sx={{ textDecoration: 'none' }}>
          <StyledButton>FAQs</StyledButton>
        </Typography>
        <Typography component={Link} href="/" sx={{ textDecoration: 'none' }}>
          <StyledButton>Contact us</StyledButton>
        </Typography>
      </Stack>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <ButtonBase
            sx={{
              fontSize: '1.5rem',
              padding: '8px',
              borderRadius: '50%',
              overflow: 'visible',
              transition:
                'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            }}
          >
            <ManageSearchIcon />
          </ButtonBase>
          <Badge
            component="span"
            sx={{
              position: 'relative',
              display: 'inline-flex',
              verticalAlign: 'middle',
              flexShrink: 0,
            }}
          >
            <Box>
              <ButtonBase
                sx={{
                  fontSize: '1.5rem',
                  padding: '8px',
                  borderRadius: '50%',
                  overflow: 'visible',
                  transition:
                    'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                  animation: `${spin} 5s linear infinite`,
                }}
              >
                <SettingsIcon />
              </ButtonBase>
            </Box>
          </Badge>
          <StyledButtonBaseBuy>
            <Link
              href={isAuthenticated ? '/dashboard/products' : '/auth/login'}
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              Buy Now
            </Link>
          </StyledButtonBaseBuy>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Nav;
