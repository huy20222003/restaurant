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
//---------------------------------------------------------------------

const FormDialogTable = ({ fields, formik, handleSave, isEdit, setIsEdit }) => {
  const { openFormDialog, setOpenFormDialog } = useCommon();

  const handleClose = () => {
    setOpenFormDialog(false);
    setIsEdit(false);
  };

  return (
    <Dialog open={openFormDialog} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
        {isEdit ? 'Update table' : 'Add table'}
      </DialogTitle>
      <DialogContent>
        {fields.map((field, index) => (
          <TextField
            key={index}
            autoFocus={index === 0}
            margin="dense"
            fullWidth
            {...field}
            value={formik.values[field.name] || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched[field.name] && formik.errors[field.name])}
            helperText={formik.touched[field.name] && formik.errors[field.name]}
            required
          />
        ))}

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
        <Button variant="contained" size="large" onClick={handleSave}>
          {isEdit ? 'Update table' : 'Add table'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialogTable.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      row: PropTypes.number,
    })
  ).isRequired,
  formik: PropTypes.object,
  handleSave: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  setIsEdit: PropTypes.func.isRequired,
};

export default FormDialogTable;
