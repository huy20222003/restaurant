import PropTypes from 'prop-types';
//@mui
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
//context
import { useCommon } from '../../hooks/context';

//-------------------------------------------------------------

const FormDialogCustomer = ({ fields, formik, handleCreate }) => {
  const { openFormDialog, setOpenFormDialog } = useCommon();

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <div>
      <Dialog open={openFormDialog} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
          {'Add Customer'}
        </DialogTitle>
        <DialogContent>
          {fields.map((field, index) => {
            return (
              <TextField
                key={index}
                autoFocus={index === 0}
                margin="dense"
                id={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                fullWidth
                value={formik.values[field.name] || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field.name] && formik.errors[field.name]}
                helperText={
                  formik.touched[field.name] && formik.errors[field.name]
                }
                required
              />
            );
          })}
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
          <Button variant="contained" size="large" onClick={handleCreate}>
            {'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FormDialogCustomer.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      row: PropTypes.number,
    })
  ).isRequired,
  formik: PropTypes.object,
  handleCreate: PropTypes.func.isRequired,
};

export default FormDialogCustomer;
