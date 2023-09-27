import { memo } from 'react';
import PropTypes from 'prop-types';
//@mui
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
//component
import OrderTimeLine from './OrderTimeLine';
//--------------------------------------------------------------

const OrderDetail = ({ orderInfo }) => {
  if (!orderInfo) {
    return null;
  }

  const {
    items: [firstItem],
    totalPrices,
    shippingFee,
  } = orderInfo;

  const displaySize = firstItem?.property?.size || '';
  const displayColor = firstItem?.property?.color || '';

  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '12px',
          my: '1rem',
          p: '1rem',
        }}
      >
        <Box>
          <Typography variant="h6">Details</Typography>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box sx={{ p: '16px 0', width: '100%' }}>
              <Stack
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: '80px',
                      height: '80px',
                      borderRadius: '4px',
                      border: '0.5px solid rgb(238, 238, 238)',
                      backgroundImage: `url(${firstItem?.product?.image_url[0]})`,
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '100%',
                      objectFit: 'cover',
                      position: 'relative',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        color: 'rgb(128, 128, 137)',
                        backgroundColor: 'rgb(235, 235, 240)',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopLeftRadius: '10px',
                      }}
                    >
                      x{firstItem?.quantity}
                    </Typography>
                  </Box>
                  <Stack sx={{ mx: '12px' }}>
                    <Typography variant="body2">
                      {firstItem?.product?.name}
                    </Typography>
                    <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                      {displaySize && (
                        <Typography
                          variant="caption"
                          sx={{ color: 'rgb(128, 128, 137)' }}
                        >
                          size: {displaySize}
                        </Typography>
                      )}
                      {displayColor && (
                        <Typography
                          variant="caption"
                          sx={{ color: 'rgb(128, 128, 137)' }}
                        >
                          màu: {displayColor}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="body2">
                    {firstItem?.product?.priceSale ||
                      firstItem?.product?.price}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
          <Divider />
          <Box sx={{ p: '12px 0' }}>
            <Stack sx={{ gap: '12px', alignItems: 'flex-end' }}>
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: { xs: '60%', md: '40%' },
                }}
              >
                <Typography variant="subtitle2">Sub Total:</Typography>
                <Typography variant="subtitle2">{totalPrices}</Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: { xs: '60%', md: '40%' },
                }}
              >
                <Typography variant="subtitle2">Shipping Fee:</Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'rgb(255, 86, 48)' }}
                >
                  {shippingFee}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: { xs: '60%', md: '40%' },
                }}
              >
                <Typography variant="subtitle2">Discount:</Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'rgb(255, 86, 48)' }}
                >
                  0
                </Typography>
              </Stack>
              <Divider />
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: { xs: '60%', md: '40%' },
                }}
              >
                <Typography variant="subtitle2">Total:</Typography>
                <Typography variant="subtitle2">
                  {totalPrices + shippingFee}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Paper>
      <Paper
        elevation={1}
        sx={{
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '12px',
          my: '1rem',
          p: '1rem',
        }}
      >
        <OrderTimeLine status={orderInfo?.status} />
      </Paper>
    </Box>
  );
};

OrderDetail.propTypes = {
  orderInfo: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        product: PropTypes.shape({
          name: PropTypes.string,
          priceSale: PropTypes.number,
          price: PropTypes.number,
          image_url: PropTypes.arrayOf(PropTypes.string),
        }),
        property: PropTypes.shape({
          size: PropTypes.string,
          color: PropTypes.string,
        }),
        quantity: PropTypes.number,
      })
    ),
    totalPrices: PropTypes.number,
    shippingFee: PropTypes.number,
    status: PropTypes.array
  }),
};

export default memo(OrderDetail);
