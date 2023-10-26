import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
//component
import Label from '../../../../Components/User/label';
import ProductQuantity from './ProductQuantity';
import ProductRating from '../ProductRating';
//ulti
import { fCurrency } from '../../../../utils/formatNumber';
import { useProduct, useCart } from '../../../../hooks/context';
//sweetalert
import Swal from 'sweetalert2';
//-------------------------------------------------------------

const ProductInfo = ({ product }) => {
  const { quantity, setQuantity, property, setProperty } = useProduct();
  const navigate = useNavigate();
  const { handleUpdateCart } = useCart();

  useEffect(() => {
    setQuantity(1);
  }, [setQuantity]);

  const handleUpdate = useCallback(async () => {
    try {
      const updateData = await handleUpdateCart({
        productId: product?._id,
        quantity,
        property,
      });
      if (updateData.success) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          showCancelButton: true,
          text: 'Add to cart success',
          confirmButtonText:
            '<a href="/dashboard/cart" style="color: #fff; text-decoration: none;">Go to Cart page</a>',
          cancelButtonText:
            '<a href="/dashboard/products" style="color: #fff; text-decoration: none;">Continue Shopping</a>',
          cancelButtonColor: 'error',
        });
      } else {
        Swal.fire('', 'Add to cart failed!', 'error');
      }
      setQuantity(1);
    } catch (error) {
      Swal.fire('', 'Server Error', 'error');
    }
  }, [handleUpdateCart, product?._id, property, quantity, setQuantity]);

  const handleNavigateCart = () => {
    handleUpdate();
    navigate('/dashboard/cart');
  };

  const renderSelectOptions = (options) => {
    return options.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));
  };

  const hasColor = product?.color && product.color.length > 0;
  const hasSize = product?.size && product.size.length > 0;

  const [isColorSelected, setColorSelected] = useState(false);
  const [isSizeSelected, setSizeSelected] = useState(false);

  return (
    <Box component="div" paddingLeft={{ xs: 0, sm: '2rem', md: '2rem' }}>
      {product?.status && (
        <Label
          variant="filled"
          sx={{
            width: '3rem',
            height: '1.5rem',
            mb: '0.8rem',
            color: '#fff',
            backgroundColor:
              product?.status === 'sale' ? 'error.main' : 'info.main',
          }}
        >
          {product?.status}
        </Label>
      )}

      <Typography variant="subtitle1" sx={{ mb: '0.8rem' }}>
        {product?.name}
      </Typography>
      <ProductRating rate={product?.rate} />
      <Typography variant="subtitle1" sx={{ my: '1rem' }}>
        {fCurrency(product?.priceSale || product?.price)}
      </Typography>
      <Typography variant="caption" sx={{ py: '2rem' }}>
        {product?.subDescription}
      </Typography>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" sx={{ mb: '0.4rem' }}>
          Quantity
        </Typography>
        <ProductQuantity />
      </Stack>
      {hasColor ? (
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            my: '1rem',
          }}
        >
          <Typography>Colors</Typography>
          <FormControl sx={{ width: '80px' }}>
            <InputLabel id="color-label">Colors</InputLabel>
            <Select
              labelId="color-label"
              label="Colors"
              size="small"
              value={property.color || ''}
              onChange={(e) => {
                setProperty({
                  ...property,
                  color: e.target.value,
                });
                setColorSelected(true);
              }}
            >
              {renderSelectOptions(product?.color || [])}
            </Select>
          </FormControl>
        </Stack>
      ) : null}
      {hasSize ? (
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            my: '1rem',
          }}
        >
          <Typography>Size</Typography>
          <FormControl sx={{ width: '80px' }}>
            <InputLabel id="size-label">Size</InputLabel>
            <Select
              id="size-label"
              label="Size"
              size="small"
              value={property.size || ''}
              onChange={(e) => {
                setProperty({
                  ...property,
                  size: e.target.value,
                });
                setSizeSelected(true);
              }}
            >
              {renderSelectOptions(product?.size || [])}
            </Select>
          </FormControl>
        </Stack>
      ) : null}
      <Box sx={{ my: '1rem' }}>
        <Button
          size="medium"
          variant="outlined"
          sx={{ mr: '1rem' }}
          onClick={handleUpdate}
          startIcon={<AddShoppingCartIcon />}
          disabled={
            (hasColor && !isColorSelected) || (hasSize && !isSizeSelected)
          }
        >
          Add to cart
        </Button>
        <Button
          size="medium"
          variant="contained"
          onClick={handleNavigateCart}
          disabled={
            (hasColor && !isColorSelected) || (hasSize && !isSizeSelected)
          }
        >
          Buy now
        </Button>
      </Box>
    </Box>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    status: PropTypes.string,
    name: PropTypes.string,
    rate: PropTypes.number,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    subDescription: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.arrayOf(PropTypes.string),
    size: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default ProductInfo;
