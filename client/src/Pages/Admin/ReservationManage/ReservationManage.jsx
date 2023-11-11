import { useState } from 'react';

//@mui
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import styled from '@emotion/styled';
//icon
import AddIcon from '@mui/icons-material/Add';
//context
import { useTable, useCommon } from '../../../hooks/context';
//component
import Iconify from '../../../Components/User/iconify';
import FormDialogTable from '../../../Components/FormDialog/FormDialogTable';
import { ReservationTabs } from '../../../section/admin/reservation';
//sweetalert
import Swal from 'sweetalert2';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//---------------------------------------------------------

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: theme.customShadows.card,
  marginTop: '4rem',
  borderRadius: '0.75rem',
}));

const ReservationManage = () => {
  const { handleCreateTable, handleUpdateTable } = useTable();
  const { setOpenFormDialog } = useCommon();

  const [isEdit, setIsEdit] = useState(false);

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Table Name is required')
        .max(100, 'The maximum number of characters is 100'),
      description: yup
        .string()
        .required('Description is required')
        .max(1000, 'The maximum number of characters is 1000'),
    }),
    onSubmit: async (values) => {
      try {
        if (isEdit) {
          const editData = await handleUpdateTable(values._id, values);
          if (!editData.success) {
            Swal.fire({
              title: 'Update table failed!',
              icon: 'error',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Update table successful!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          }
        } else {
          const createData = await handleCreateTable(values);
          if (!createData.success) {
            Swal.fire({
              title: 'Add table failed!',
              icon: 'error',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Add table Successful!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          }
        }
        formik.setValues({});
        setOpenFormDialog(false);
      } catch (error) {
        Swal.fire({
          title: 'Server Error',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      }
    },
  });

  const fields = [
    { name: 'name', label: 'Table Name', type: 'text', row: 1 },
    { name: 'description', label: 'Description', type: 'text', row: 5 },
  ];

  return (
    <StyledPaper>
      <Box sx={{ display: 'flex', flex: '1 1 auto', maxWidth: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            width: '100%',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flexGrow: 1, py: '2.5rem' }}>
            <Container maxWidth="xl">
              <Stack>
                <Stack
                  sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mb: '1rem',
                  }}
                >
                  <Stack>
                    <Typography variant="h5" color="primary">
                      Reservations
                    </Typography>
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        mt: '0.5rem',
                      }}
                    >
                      <ButtonBase sx={{ p: '0.2rem' }}>
                        <Iconify
                          icon="material-symbols:upload"
                          sx={{ mr: '0.3rem' }}
                        />
                        Upload
                      </ButtonBase>
                      <ButtonBase sx={{ p: '0.2rem' }}>
                        <Iconify icon="uil:import" sx={{ mr: '0.3rem' }} />
                        Export
                      </ButtonBase>
                    </Stack>
                  </Stack>
                  <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{ borderRadius: '0.375rem' }}
                      onClick={handleOpenFormDialog}
                    >
                      Add Table
                    </Button>
                  </Stack>
                </Stack>
                <ReservationTabs
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  formik={formik}
                />
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
      <FormDialogTable
        fields={fields}
        formik={formik}
        handleSave={formik.handleSubmit}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </StyledPaper>
  );
};

export default ReservationManage;
