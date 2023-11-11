import { Helmet } from 'react-helmet-async';
//@mui
import { Container, Typography, Grid } from '@mui/material';
//component
import { Table, TableInfo } from '../../../section/@dashboard/reservation';
//---------------------------------------------

const Reservation = () => {
  return (
    <>
      <Helmet>
        <title>{'Reservation'}</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Reservation
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <Table />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TableInfo />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Reservation;
