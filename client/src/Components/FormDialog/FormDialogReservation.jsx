import { useEffect } from 'react';
import PropTypes from 'prop-types';
//@mui
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//CommonContext
import { useCommon, useTable } from '../../hooks/context';
import dayjs from 'dayjs';
//---------------------------------------------------------------------------

const FormDialogReservation = (props) => {
  const { formik, isEdit } = props;
  const { openFormDialog, setOpenFormDialog } = useCommon();
  const today = dayjs();

  const {
    tableState: { tables },
    handleGetAllTables,
  } = useTable();

  useEffect(() => {
    handleGetAllTables();
  }, [handleGetAllTables]);

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <div>
      <Dialog open={openFormDialog} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
          {isEdit ? 'Update Reservation' : 'Add Reservation'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            value={formik.values.fullName || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.fullName && formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            required
          />
          <Box sx={{ my: '0.25rem' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']} >
                <DateTimePicker
                  label="Reservation Date"
                  value={formik.values.reservationDate || today}
                  disablePast
                  slotProps={{
                    textField: {
                      helperText:
                        formik.touched.reservationDate &&
                        formik.errors.reservationDate,
                    },
                  }}
                  onChange={(date) => {
                    formik.setFieldValue('reservationDate', date);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <FormControl
            fullWidth
            autoFocus
            sx={{ margin: '2rem 0', display: 'block' }}
          >
            <InputLabel id="tableId-label">Table Name</InputLabel>
            <Select
              labelId="tableId-label"
              id="tableId"
              name="tableId"
              value={formik.values.tableId || ''}
              label="Table Name"
              fullWidth
              onChange={formik.handleChange}
              error={!!(formik.touched.tableId && formik.errors.tableId)}
              helperText={formik.touched.tableId && formik.errors.tableId}
            >
              {tables.map((table) => (
                <MenuItem
                  key={table.name}
                  disabled={table.isReservation ? true : false}
                  value={table._id}
                >
                  {table.name} ({table.description})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            fullWidth
            id="note"
            label="Note"
            name="note"
            autoComplete="note"
            error={!!(formik.touched.note && formik.errors.note)}
            helperText={formik.touched.note && formik.errors.note}
            {...formik.getFieldProps('note')}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: 'red', borderColor: 'red' }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={formik.handleSubmit}
          >
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FormDialogReservation.propTypes = {
  formik: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default FormDialogReservation;
