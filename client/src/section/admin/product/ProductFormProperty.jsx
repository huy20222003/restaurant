import { useEffect } from 'react';
import PropTypes from 'prop-types';
//@mui
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material';
//context
import { useCategory } from '../../../hooks/context';
//-----------------------------------------------------------

const ProductFormProperty = ({ formik }) => {
  const {
    values,
    handleChange,
    errors,
    touched,
    handleBlur
  } = formik;

  const {
    categoryState: { categories },
    handleGetAllCategory,
  } = useCategory();

  useEffect(() => {
    handleGetAllCategory();
  }, [handleGetAllCategory]);

  const renderCategories = () => {
    return categories.map((category) => (
      <MenuItem key={category._id} value={category._id}>
        {category.name}
      </MenuItem>
    ));
  };

  return (
    <>
      <Paper elevation={0} component={Card}>
        <Stack sx={{ gap: '24px', padding: '24px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  label="Status"
                  name="status"
                  error={!!(touched.status && errors.status)}
                  onBlur={handleBlur}
                  value={values.status}
                  onChange={handleChange}
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="sale">Sale</MenuItem>
                </Select>
                {touched.status && errors.status && (
                  <span style={{ color: 'red' }}>{errors.status}</span>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="quantity"
                label="Quantity"
                fullWidth
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.quantity && errors.quantity)}
                helperText={touched.quantity && errors.quantity}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  label="Category"
                  name="category"
                  value={values.category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!(touched.category && errors.category)}
                >
                  {renderCategories()}
                </Select>
                {touched.category && errors.category && (
                  <span style={{ color: 'red' }}>{errors.category}</span>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="size"
                label="Sizes"
                fullWidth
                multiline
                rows={3}
                value={values.size}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.size && errors.size)}
                helperText={touched.size && errors.size}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="color"
                label="Colors"
                fullWidth
                multiline
                rows={3}
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.color && errors.color)}
                helperText={touched.color && errors.color}
              />
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </>
  );
};

ProductFormProperty.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default ProductFormProperty;
