import PropTypes from 'prop-types';
//@mui
import { Box, Divider, Stack, Typography } from '@mui/material';
//-----------------------------------------

const CartConfirmProductItem = ({ item }) => {
  const { product, quantity, property } = item;

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        px: '1rem',
        pb: '0.5rem',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <Box
            component="img"
            src={product?.image_url[0]}
            sx={{
              width: '70px',
              height: '70px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          ></Box>
          <Stack sx={{ pl: '0.5rem' }}>
            <Typography variant="body1">{product?.name}</Typography>
            <Stack
              sx={{
                alignItems: 'center',
                fontWeight: 400,
                color: 'rgb(99, 115, 129)',
                flexDirection: 'row',
              }}
            >
              {property?.size ? (
                <Box sx={{display: 'flex'}}>
                  <Typography variant="body2">size</Typography>
                  <Box
                    component="span"
                    sx={{
                      height: '24px',
                      minWidth: '24px',
                      lineHeight: '0',
                      borderRadius: '6px',
                      cursor: 'default',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      textTransform: 'capitalize',
                      padding: '0px 6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                      color: 'rgb(99, 115, 129)',
                      backgroundColor: 'rgba(145, 158, 171, 0.16)',
                      marginLeft: '4px',
                    }}
                  >
                    {property?.size}
                  </Box>
                </Box>
              ) : (
                ''
              )}
              <Divider orientation="vertical" variant="middle" flexItem />
              {property?.color ? (
                <Box sx={{display: 'flex'}}>
                  <Typography variant="body2">color</Typography>
                  <Box
                    component="span"
                    sx={{
                      height: '24px',
                      minWidth: '24px',
                      lineHeight: '0',
                      borderRadius: '6px',
                      cursor: 'default',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      textTransform: 'capitalize',
                      padding: '0px 6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                      color: 'rgb(99, 115, 129)',
                      backgroundColor: 'rgba(145, 158, 171, 0.16)',
                      marginLeft: '4px',
                    }}
                  >
                    {property?.color}
                  </Box>
                </Box>
              ) : (
                ''
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '20%',
          }}
        >
          <Typography variant="body2">x{quantity}</Typography>
          <Typography variant="body2">
            {product?.priceSale ? product?.priceSale : product?.price}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

CartConfirmProductItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartConfirmProductItem;
