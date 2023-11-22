import { useNavigate } from 'react-router-dom';
// @mui
import PropTypes from 'prop-types';
import { Box, Card, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../Components/User/label';
import ProductRating from './ProductRating';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { _id, name, status, price, priceSale, image_url, rate } = product;
  const navigate = useNavigate();

  const handleNavigateToProductDetail = (productId) => {
    navigate(`/dashboard/products/${productId}`);
  };

  return (
    <Card
      onClick={() => handleNavigateToProductDetail(_id)}
      sx={{ cursor: 'pointer' }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={image_url[0]} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle1" color="inherit">
          <Typography variant="subtitle2" noWrap>
            {name} 
          </Typography>
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: priceSale ? 'text.disabled' : '#000',
                textDecoration: priceSale ? 'line-through' : 'none',
              }}
            >
              {fCurrency(price)}
            </Typography>
            &nbsp;
            {priceSale && fCurrency(priceSale)}
          </Typography>
        </Stack>
        <ProductRating rate={rate} />
      </Stack>
    </Card>
  );
}
