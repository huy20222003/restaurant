import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
//@mui
import { Container, Typography } from '@mui/material';
//component
import { TableListContainer } from '../../../section/@dashboard/reservation/reservationList';
//context
import { useReservation, useTable } from '../../../hooks/context';
//component
import { ButtonBack } from '../../../section/@dashboard/common';
//---------------------------------------------

const Reservation = () => {
  const {
    reservationState: { reservations },
    handleGetAllReservationsById,
  } = useReservation();

  const {
    tableState: { tables },
    handleGetAllTables,
  } = useTable();

  useEffect(() => {
    handleGetAllReservationsById();
  }, [handleGetAllReservationsById]);

  useEffect(() => {
    handleGetAllTables;
  }, [handleGetAllTables]);

  return (
    <>
      <Helmet>
        <title>{'Reservation List'}</title>
      </Helmet>
      <ButtonBack />
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Reservation List
        </Typography>
        <TableListContainer reservations={reservations} tables={tables} />
      </Container>
    </>
  );
};

export default Reservation;
