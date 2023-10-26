import PropTypes from 'prop-types';
import { useState } from 'react';
//@mui
import { Box, Card, CardHeader, Paper, Stack, Typography } from '@mui/material';
//component
import Iconify from '../../../../Components/User/iconify';
//-------------------------------------------------

const paymentMethods = [
  {
    id: 'Cash',
    label: 'Pay with cash',
    description: 'Pay with cash when your order is delivered.',
    icon: 'mdi:cash',
  },
  {
    id: 'VNPay',
    label: 'Pay with VNPay',
    description: 'Pay with VNPay.',
    icon: 'arcticons:v-vnpay',
  },
  
];

const CartPaymentInfo = ({ orderData, setOrderData }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSelectPayment = (method) => {
    setSelectedPayment(method);
    setOrderData({ ...orderData, paymentMethod: method });
  };

  return (
    <Paper elevation={0} component={Card}>
      <CardHeader>
        <Typography component="span" sx={{ p: '0.3rem' }}>Payment</Typography>
      </CardHeader>
      <Stack sx={{ p: '0 24px 24px 24px' }}>
        {paymentMethods.map((method) => (
          <Paper
            key={method.id}
            sx={{
              color: 'rgb(33, 43, 54)',
              transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              borderRadius: '8px',
              border: `1px solid ${
                selectedPayment === method.id ? 'black' : 'rgba(145, 158, 171, 0.16)'
              }`,
              backgroundImage: 'none',
              padding: '10px',
              marginTop: '20px',
              cursor: 'pointer',
            }}
            onClick={() => handleSelectPayment(method.id)}
          >
            <Stack sx={{ alignItems: 'center', flexDirection: 'row' }}>
              <Box component="span" sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">{method.label}</Typography>
                <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
                  {method.description}
                </Typography>
              </Box>
              <Stack
                sx={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}
              >
                <Iconify icon={method.icon} />
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
};

CartPaymentInfo.propTypes = {
  orderData: PropTypes.object.isRequired, 
  setOrderData: PropTypes.func.isRequired, 
};

export default CartPaymentInfo;
