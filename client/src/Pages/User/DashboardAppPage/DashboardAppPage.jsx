import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Box } from '@mui/material';
// sections
import {
  Slider,
  Category,
  RecentlyProducts,
  PopularProducts,
} from '../../../section/@dashboard/app';
// ----------------------------------------------------------------------

const DashboardAppPage = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Box>
          <Slider />
          <Category />
          <PopularProducts />
          <RecentlyProducts />
        </Box>
      </Container>
    </>
  );
};

export default DashboardAppPage;
