import { useCallback } from 'react';
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

const FormDialogCategory = ({ fields, formik, handleSave, isEdit }) => {
  const { openFormDialog, setOpenFormDialog } = useCommon();

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  const handleChangeFile = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          formik.values.imageUrl = reader.result;
        };
        reader.onerror = () => {
          console.error('Error occurred while reading the file.');
        };
        reader.readAsDataURL(file);
      }
    },
    [formik.values]
  );

  return (
    <Dialog open={openFormDialog} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
        {isEdit ? 'Update category' : 'Add category'}
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
            error={formik.touched[field.name] && formik.errors[field.name]}
            helperText={formik.touched[field.name] && formik.errors[field.name]}
            required
          />
        ))}

        <input
          type="file"
          name="imageUrl"
          accept="image/*"
          onChange={handleChangeFile}
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
        <Button variant="contained" size="large" onClick={handleSave}>
          {isEdit ? 'Update category' : 'Add category'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialogCategory.propTypes = {
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
};

export default FormDialogCategory;
