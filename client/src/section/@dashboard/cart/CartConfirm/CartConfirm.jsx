import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
//@mui
import { Paper, Card, Typography, Stack, ButtonBase } from '@mui/material';
import styled from '@emotion/styled';
//component
import CartConfirmProductItem from './CartConfirmProductItem';
import Iconify from '../../../../Components/User/iconify';
//context
import { useCommon, useOrder, usePayment } from '../../../../hooks/context';
//sweetalert
import Swal from 'sweetalert2';
//---------------------------------------------------------------

const StyledButtonBaseConfirm = styled(ButtonBase)`
  && {
    font-weight: 700;
    line-height: 1.71429;
    font-size: 0.875rem;
    text-transform: capitalize;
    font-family: __Public_Sans_66e638, __Public_Sans_Fallback_66e638, Helvetica,
      Arial, sans-serif;
    min-width: 64px;
    width: 80%;
    padding: 6px 12px;
    border-radius: 8px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    color: rgb(255, 255, 255);
    background-color: rgb(33, 43, 54);
  }
`;

const CartConfirm = ({ orderData }) => {
  const navigate = useNavigate();
  const { setActiveStep } = useCommon();
  const { handleCreateOrder } = useOrder();
  const { handleCreatePayment, handlePaymentWithVnPay } = usePayment();

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreate = async () => {
    switch (orderData.paymentMethod) {
      case 'Cash':
        try {
          const createData = await handleCreateOrder(orderData);
          if (!createData.success) {
            Swal.fire('Faield', 'Order failed!', 'error');
          } else {
            const paymentData = await handleCreatePayment({
              sender: orderData.fullName,
              description: `Payment for orderId #${createData.order._id}`,
              amount: orderData.totalPrices,
              paymentMethod: orderData.paymentMethod,
            });
            if (!paymentData.success) {
              Swal.fire('Faield', 'Order failed!', 'error');
            } else {
              Swal.fire('Success', 'Order Success!', 'success');
              navigate('/dashboard/cart');
              setActiveStep(0);
            }
          }
        } catch (error) {
          Swal.fire('Error', 'Server Error', 'error');
        }
        break;
      case 'VNPay':
        try {
          const response = await handlePaymentWithVnPay({
            amount: orderData.totalPrices,
            orderInfo: orderData,
          });
          const newLink = document.createElement('a');
          newLink.href = response.url;
          newLink.target = '_blank';
          newLink.click();
        } catch (error) {
          Swal.fire('Error', 'Server Error', 'error');
        }
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        component={Card}
        sx={{ width: '40rem', margin: '0 auto' }}
      >
        <Typography variant="h5" sx={{ p: '1rem', textAlign: 'center' }}>
          Order Confirm
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'left', p: '1rem 0.5rem' }}>
          Detail
        </Typography>
        <Stack sx={{ alignItems: 'center' }}>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              px: '1rem',
              pb: '0.5rem',
            }}
          >
            <Typography variant="body1">FullName</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {orderData?.fullName}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              px: '1rem',
              pb: '0.5rem',
            }}
          >
            <Typography variant="body1">Phone Number</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {orderData?.phoneNumber}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              px: '1rem',
              pb: '0.5rem',
            }}
          >
            <Typography variant="body1">Address</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {orderData?.shipAddress}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              px: '1rem',
              pb: '0.5rem',
            }}
          >
            <Typography variant="body1">Shipping Unit</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {orderData?.shippingUnit}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              px: '1rem',
              pb: '0.5rem',
            }}
          >
            <Typography variant="body1">Sub Total Prices</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {orderData?.totalPrices - orderData?.shippingFee}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              px: '1rem',
              pb: '0.5rem',
            }}
          >
            <Typography variant="body1">Shipping Fee</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {orderData?.shippingFee}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              px: '1rem',
              pb: '0.5rem',
            }}
          >
            <Typography variant="body1">Total Prices</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {orderData?.totalPrices}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="h6" sx={{ textAlign: 'left', p: '1rem 0.5rem' }}>
          Products
        </Typography>
        <Stack sx={{ alignItems: 'center' }}>
          {orderData.items.map((item) => {
            return (
              <CartConfirmProductItem key={item.product._id} item={item} />
            );
          })}
        </Stack>
        <Stack
          sx={{
            m: '1rem 0',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <StyledButtonBaseConfirm onClick={handleCreate}>
            Confirm Order
          </StyledButtonBaseConfirm>
        </Stack>
      </Paper>
      <ButtonBase onClick={handleBack}>
        <Iconify icon="eva:arrow-ios-back-fill" />
        Back
      </ButtonBase>
    </>
  );
};

CartConfirm.propTypes = {
  orderData: PropTypes.object.isRequired,
  setOrderData: PropTypes.func.isRequired,
};

export default CartConfirm;
