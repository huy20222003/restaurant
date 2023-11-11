import { useState } from 'react';
import PropTypes from 'prop-types';
//@mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//dayjs
import dayjs from 'dayjs';
//sweetalert
import Swal from 'sweetalert2';
//context
import { useReservation } from '../../hooks/context';
//---------------------------------------------------------------------

const FormDialogFilterTable = ({
  openFormDialogFilter,
  setOpenFormDialogFilter,
}) => {
  const today = dayjs();
  const [reservationDate, setReservationDate] = useState(today);
  const [type, setType] = useState('lunch');
  const { handleFilterReservation } = useReservation();
  const typeArr = [
    { id: 1, name: 'lunch', label: 'Lunch' },
    { id: 2, name: 'dinner', label: 'Dinner' },
  ];

  const handleClose = () => {
    setOpenFormDialogFilter(false);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleFilter = async () => {
    try {
      const response = await handleFilterReservation({ reservationDate, type });
      if(!response.success) {
        Swal.fire('', 'Retrieve data failed', 'error');
      } else {
        Swal.fire('', 'Retrieve data successful', 'success');
      }
      handleClose();
    } catch (error) {
      Swal.fire('', 'Server Error', 'error');
    }
  };

  return (
    <Dialog open={openFormDialogFilter} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.6rem' }}>
        Filter Table
      </DialogTitle>
      <DialogContent>
        <Box sx={{ my: '1rem' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label="Reservation Date"
                value={reservationDate}
                disablePast
                onChange={(date) => setReservationDate(date)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <FormControl fullWidth>
          <InputLabel id="select-type">Type</InputLabel>
          <Select
            labelId="select-type"
            value={type}
            label="Table"
            onChange={handleChangeType}
            fullWidth
          >
            {typeArr.map((type) => (
              <MenuItem key={type.id} value={type.name}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <Button variant="contained" size="large" onClick={handleFilter}>
          Filter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialogFilterTable.propTypes = {
  openFormDialogFilter: PropTypes.bool,
  setOpenFormDialogFilter: PropTypes.func,
};

export default FormDialogFilterTable;
