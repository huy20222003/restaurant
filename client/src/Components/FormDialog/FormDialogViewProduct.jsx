import PropTypes from 'prop-types';
import styled from '@emotion/styled';
//@mui
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Card,
  Stack,
  Typography,
  Button,
} from '@mui/material';

//CommonContext
import { useCommon } from '../../hooks/context';
//utils
import { fCurrency } from '../../utils/formatNumber';
//component
import Label from '../User/label/Label';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';
//---------------------------------------------------------------------------

const StyledProductImg = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const FormDialogViewProduct = (props) => {
  const { product, handleDelete } = props;
  const { openFormDialog, setOpenFormDialog } = useCommon();
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value || '');
  };

  const handleColorChange = (e) => {
    setColor(e.target.value || '');
  };

  const handleDeleteProduct = ()=> {
    handleDelete(product?._id);
    setOpenFormDialog(false);
  }

  return (
    <div>
      <Dialog open={openFormDialog} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
          {product?.name}
        </DialogTitle>
        <DialogContent>
          <Card>
            <Box sx={{ position: 'relative' }}>
              {product?.status && (
                <Label
                  variant="filled"
                  color={(product?.status === 'sale' && 'error') || 'info'}
                  sx={{
                    zIndex: 9,
                    top: 16,
                    right: 16,
                    position: 'absolute',
                    textTransform: 'uppercase',
                  }}
                >
                  {product?.status}
                </Label>
              )}
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Navigation]}
              >
                {product?.image_url &&
                  product?.image_url.map((image) => {
                    return (
                      <SwiperSlide key={image}>
                        <StyledProductImg alt={product?.name} src={image} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
              <Typography variant="subtitle1" color="inherit">
                <Typography variant="subtitle1" noWrap>
                  {product?.name}
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
                      color: product?.priceSale ? 'text.disabled' : '#000',
                      textDecoration: product?.priceSale
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    {fCurrency(product?.price)}
                  </Typography>
                  &nbsp;
                  {product?.priceSale && fCurrency(product?.priceSale)}
                </Typography>
              </Stack>
              <FormControl fullWidth>
                <InputLabel id="select-size">Size</InputLabel>
                <Select
                  labelId="select-size"
                  id="select-size"
                  label="Size"
                  value={size || ''}
                  onChange={handleSizeChange}
                >
                  {product?.size &&
                    product?.size.map((size) => (
                      <MenuItem key={size}>{size}</MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="select-color">Color</InputLabel>
                <Select
                  labelId="select-color"
                  id="select-color"
                  label="Color"
                  value={color || ''}
                  onChange={handleColorChange}
                >
                  {product?.color &&
                    product?.color.map((color) => (
                      <MenuItem key={color}>{color}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
          </Card>
        </DialogContent>
        <DialogActions>
          <Box sx={{ p: 1 }}>
            <Button
              variant="contained"
              color="error"
              size="medium"
              onClick={handleDeleteProduct}
            >
              Delete
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FormDialogViewProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    image_url: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    priceSale: PropTypes.number,
    size: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.arrayOf(PropTypes.string),
  }),
  handleDelete: PropTypes.func,
};

export default FormDialogViewProduct;
