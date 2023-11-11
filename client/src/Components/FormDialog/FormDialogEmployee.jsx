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
} from '@mui/material';
//CommonContext
import { useCommon } from '../../hooks/context';
//---------------------------------------------------------------------------

const FormDialogEmployee = ({ fields, formik, handleSave, isEdit }) => {
  const { openFormDialog, setOpenFormDialog } = useCommon();

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <div>
      <Dialog open={openFormDialog} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
          {isEdit ? 'Update Employee' : 'Add Employee'}
        </DialogTitle>
        <DialogContent>
          {fields.map((field, index) => {
            return (
              <TextField
                key={index}
                autoFocus={index === 0}
                margin="dense"
                {...field}
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
          <FormControl autoFocus sx={{ margin: '2rem 0', display: 'block' }}>
            <InputLabel id="demo-simple-select-label">Position</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="position"
              value={formik.values.position || 'employee'}
              label="Vị trí"
              onChange={formik.handleChange}
              error={formik.touched.position && formik.errors.position}
              helperText={formik.touched.position && formik.errors.position}
              sx={{ minWidth: 400 }}
            >
              <MenuItem value={'admin'}>Admin</MenuItem>
              <MenuItem value={'employee'}>Employee</MenuItem>
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
          <Button variant="contained" size="large" onClick={handleSave}>
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FormDialogEmployee.propTypes = {
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
  isEdit: PropTypes.string.isRequired,
};

export default FormDialogEmployee;
