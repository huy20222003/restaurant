import PropTypes from 'prop-types';
// @mui
import { Box, Grid, Typography } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.length > 0 ? (
        products.map((product) => (
          <Grid key={product._id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '20rem',
          }}
        >
          <Typography variant="body1">Product not found!</Typography>
        </Box>
      )}
    </Grid>
  );
}
