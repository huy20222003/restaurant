import { memo } from 'react';
import PropTypes from 'prop-types';
//@mui
import { Avatar, Box, Divider, Paper, Stack, Typography } from '@mui/material';
//util
import { fDateTime } from '../../../utils/formatTime';
//---------------------------------------------------------------------------------

const OrderInfo = ({ orderInfo }) => {
  if (!orderInfo) {
    return null;
  }

  return (
    <Paper sx={{ my: '1rem', p: '1rem' }} elevation={1}>
      <Box>
        <Typography variant="h6">Customer info</Typography>
        <Stack sx={{ gap: '12px', flexDirection: 'row', py: '1rem' }}>
          <Avatar src="/assets/images/avatars/avatar_9.jpg" alt="avatar" />
          <Stack>
            <Typography variant="subtitle1">{orderInfo?.fullName}</Typography>
            <Typography variant="body2">{orderInfo?.shipAddress}</Typography>
          </Stack>
        </Stack>
      </Box>
      <Divider />
      <Stack sx={{ py: '1rem', gap: '12px' }}>
        <Typography variant="h6">Delivery</Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle2">Ship by</Typography>
          <Typography variant="body2">NQH</Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle2">Speedy</Typography>
          <Typography variant="body2">{orderInfo?.shippingUnit}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack sx={{ py: '1rem', gap: '12px' }}>
        <Typography variant="h6">Shipping</Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle2">Shipping Address</Typography>
          <Typography variant="body2">{orderInfo?.shipAddress}</Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle2">Phone Number</Typography>
          <Typography variant="body2">{orderInfo?.phoneNumber}</Typography>
        </Stack>
        <Divider />
        <Stack sx={{ py: '1rem', gap: '12px' }}>
          <Typography variant="h6">Payment</Typography>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle2">Method</Typography>
            <Typography variant="body2">{orderInfo?.paymentMethod}</Typography>
          </Stack>
        </Stack>
        <Stack sx={{ py: '1rem', gap: '12px' }}>
          <Typography variant="h6">Date</Typography>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle2">Order Date</Typography>
            <Typography variant="body2">{fDateTime(orderInfo?.createdAt)}</Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle2">Update Date</Typography>
            <Typography variant="body2">{fDateTime(orderInfo?.updatedAt)}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

OrderInfo.propTypes = {
  orderInfo: PropTypes.shape({
    fullName: PropTypes.string,
    shipAddress: PropTypes.string,
    shippingUnit: PropTypes.string,
    phoneNumber: PropTypes.string,
    paymentMethod: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};

export default memo(OrderInfo);
