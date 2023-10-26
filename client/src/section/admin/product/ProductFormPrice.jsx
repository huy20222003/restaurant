import PropTypes from 'prop-types';
//@mui
import { Card, Grid, Paper, Stack, TextField } from '@mui/material';
//---------------------------------------------------------------

const ProductFormPrice = ({ formik }) => {
  return (
    <Paper elevation={0} component={Card}>
      <Stack sx={{ gap: '24px', padding: '24px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name="price"
              label="Regular Price"
              id='priceSale'
              fullWidth
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.price && formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="priceSale"
              label="Price Sale"
              id='priceSale'
              fullWidth
              value={formik.values.priceSale}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.priceSale && formik.errors.priceSale)}
              helperText={formik.touched.priceSale && formik.errors.priceSale}
            />
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

ProductFormPrice.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default ProductFormPrice;
