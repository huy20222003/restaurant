import { useState, useEffect } from 'react';
//@mui
import styled from '@emotion/styled';
import {
  Box,
  ButtonBase,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { keyframes } from '@mui/system';

const slide = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;


const forwardToRight = keyframes`
  0% {
    transform: translateX(100%);
  } 
  100% {
    transform: translateX(0);
  }
`;

const forwardToLeft = keyframes`
  0% {
    transform: translateX(-100%);
  } 
  100% {
    transform: translateX(0);
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
    max-width: 90px;
  }
`;

const Main = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY > 100 && !animationStarted) {
        setAnimationStarted(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animationStarted]);
  return (
    <Box sx={{ flexGrow: 1 }} component="main">
      <Box
        component="div"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 1999,
          transformOrigin: '0% center',
          background:
            'linear-gradient(135deg, rgb(253, 171, 118) 0%, rgb(250, 84, 28) 100%)',
          animation: animationStarted ? `${slide} 10s linear` : 'none',
        }}
      ></Box>
      <Box
        sx={{
          position: 'relative',
          background:
            'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)) center center / cover no-repeat, url(/assets/images/background/overlay_1.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            sx={{
              minWidth: 0,
              flexFlow: 'wrap',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Grid
              item
              xs={12}
              sm={5}
              md={5}
              sx={{ minWidth: 0, flexBasis: 'auto', flexGrow: 0 }}
            >
              <Stack
                sx={{
                  gap: '40px',
                  justifyContent: 'center',
                  paddingTop: '130px',
                  paddingBottom: '130px',
                  alignItems: { md: 'flex-start' },
                  textAlign: { md: 'left' },
                  animation: `${forwardToLeft} 0.6s linear`
                }}
              >
                <Typography variant="h2">
                  Wellcome To <br /> Goc Bep Nho
                </Typography>
                <Typography variant="body2">
                  {' '}
                  Welcome to Goc Bep Nho. This is a great place for you.
                </Typography>
                <StyledButtonBaseBuy>
                  <Link
                    href="/auth/login"
                    style={{ color: '#fff', textDecoration: 'none' }}
                  >
                    Buy Now
                  </Link>
                </StyledButtonBaseBuy>
              </Stack>
            </Grid>
            <Grid item sm={7} md={7} sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  bottom: '20%',
                  right: '-110px',
                  width: 'calc(100% - 436.663px)',
                  animation: `${forwardToRight} 0.6s linear`
                }}
              >
                <Box
                  component="span"
                  sx={{
                    overflow: 'hidden',
                    position: 'relative',
                    verticalAlign: 'bottom',
                    display: 'inline-block',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: '750px',
                      height: '480px',
                      marginTop: '100px',
                      verticalAlign: 'bottom',
                      backgroundSize: 'cover !important',
                      color: 'transparent',
                      display: 'inline-block',
                    }}
                  >
                    <Box
                      component="img"
                      src="/assets/illustrations/illustration_home.svg"
                      alt="home_hero"
                      sx={{
                        width: '100%',
                        height: '40rem',
                        objectFit: 'cover',
                        verticalAlign: 'bottom',
                        borderRadius: '4px'
                      }}
                    ></Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Main;
