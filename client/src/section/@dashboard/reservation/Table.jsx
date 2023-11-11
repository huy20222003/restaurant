import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
//component
import FormDialogReservation from '../../../Components/FormDialog/FormDialogReservation';
import FormDialogFilterTable from '../../../Components/FormDialog/FormDialogFilterTable';
//context
import {
  useCommon,
  useAuth,
  useReservation,
  useTable,
} from '../../../hooks/context';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//sweetalert
import Swal from 'sweetalert2';
//------------------------------------------------

const Table = () => {
  const { setOpenFormDialog } = useCommon();
  const [openFormDialogFilter, setOpenFormDialogFilter] = useState(false);
  const {
    authState: { user },
  } = useAuth();
  const navigate = useNavigate();

  const {
    handleCreateReservation,
    handleGetAllReservations,
    reservationState: { reservations },
  } = useReservation();
  const {
    tableState: { tables },
    handleGetAllTables,
  } = useTable();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      tableId: '',
      reservationDate: '',
      note: '',
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .required('FullName is required')
        .max(200, 'The maximum number of characters is 200'),
      tableId: yup
        .string()
        .required('Table Id is required')
        .max(100, 'The maximum number of characters is 100'),
      reservationDate: yup
        .date()
        .required('Reservation Date From is required')
        .min(new Date(), 'Reservation Date must be in the future'),
      note: yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await handleCreateReservation(values);
        if (!response.success) {
          Swal.fire('', 'Reservation failed', 'error');
        } else {
          Swal.fire('', 'Reservation successful', 'success');
        }
        window.location.reload();
        setOpenFormDialog(false);
      } catch (error) {
        Swal.fire('', 'Server Error', 'error');
      }
    },
  });

  useEffect(() => {
    handleGetAllTables();
  }, [handleGetAllTables]);

  useEffect(() => {
    handleGetAllReservations();
  }, [handleGetAllReservations]);

  const handleOpenFormDialog = (table) => {
    setOpenFormDialog(true);
    formik.setFieldValue('tableId', table._id);
    formik.setFieldValue('fullName', user?.fullName);
  };

  const handleOpenFormDialogFilter = () => {
    setOpenFormDialogFilter(true);
  };

  let reversedTableArr = [...tables].reverse();
  const reservationsCopy = [...reservations];
  reversedTableArr.forEach((item1) => {
    const matchingItem2 = reservationsCopy.find(
      (item2) => item2.tableId === item1._id
    );

    if (matchingItem2) {
      item1.status = 'ordered';
    }
  });

  const handleNavigateToReservationsList = ()=> {
    navigate('/dashboard/reservation/reservation-list');
  }

  return (
    <>
      <Paper sx={{ my: '1rem', p: '1rem' }} elevation={1}>
        <Stack
          sx={{
            gap: '0.75rem',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" sx={{ mb: '1rem' }}>
            Table
          </Typography>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            startIcon={<FilterAltIcon />}
            onClick={handleOpenFormDialogFilter}
          >
            Filter
          </Button>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            px: '1rem',
          }}
        >
          {reversedTableArr.map((table) => (
            <Stack
              key={table.name}
              sx={{
                alignItems: 'center',
                gap: '0.75rem',
                m: '1rem',
                cursor: table.status === 'ordered' ? 'default' : 'pointer',
              }}
              onClick={
                table.status === 'ordered'
                  ? null
                  : () => handleOpenFormDialog(table)
              }
            >
              <Box
                component={'img'}
                src={
                  table.status === 'ordered'
                    ? '/assets/images/reservation/table-ordered.png'
                    : '/assets/images/reservation/table-empty.png'
                }
                sx={{
                  width: '3rem',
                  height: '3rem',
                  mr: '1rem',
                  userSelect: 'none',
                }}
              ></Box>
              <Typography variant="subtitle1">{table.name}</Typography>
            </Stack>
          ))}
        </Stack>
        <FormDialogReservation formik={formik} />
        <FormDialogFilterTable
          openFormDialogFilter={openFormDialogFilter}
          setOpenFormDialogFilter={setOpenFormDialogFilter}
        />
      </Paper>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          size="medium"
          color="primary"
          startIcon={<FormatListBulletedIcon />}
          onClick={handleNavigateToReservationsList}
        >
          Table Reservation List
        </Button>
      </Stack>
    </>
  );
};

export default Table;
