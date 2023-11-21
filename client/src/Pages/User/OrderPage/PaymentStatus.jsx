import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//@mui
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
//context
import { usePayment, useOrder, useProduct } from '../../../hooks/context';
//component
import { ProductList } from '../../../section/@dashboard/products';
//iconify
import Iconify from '../../../Components/User/iconify/Iconify';
//confetti
import confetti from 'canvas-confetti';
//---------------------------------------------------------------

const PaymentStatus = () => {
  const { handleGetOnePayment } = usePayment();
  const { _id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [order, setOrder] = useState(null);
  const { handleGetOneOrder } = useOrder();
  const {
    productsState: { products },
    handleGetAllProducts,
  } = useProduct();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    handleGetAllProducts();
  }, [handleGetAllProducts]);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const paymentData = await handleGetOnePayment(_id);
        setPayment(paymentData);
      } catch (error) {
        console.error('Error fetching payment:', error);
        // Handle error as needed
      }
    };

    fetchPayment();
  }, [_id, handleGetOnePayment]);

  useEffect(() => {
    if (payment) {
      const paymentDescription = payment.payment.description.split(' ');
      const orderId = paymentDescription[3];

      const fetchOrder = async () => {
        try {
          const orderData = await handleGetOneOrder(orderId);
          setOrder(orderData.order);
        } catch (error) {
          console.error('Error fetching order:', error);
          // Handle error as needed
        }
      };

      fetchOrder();
    }
  }, [handleGetOneOrder, payment]);

  var count = 200;
  var defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  if (
    payment?.payment?.status === 'success' ||
    payment?.payment?.status === 'pending'
  ) {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  const productsFilter = products?.filter((product) => {
    return order?.items.some(orderProduct => orderProduct.product.name.includes(product.name));
  });

  return (
    <Container>
      <Box>
        <Box
          sx={{
            width: '100%',
            height: '16.875rem',
            backgroundColor: '#D1E9FC',
            borderRadius: '0.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Iconify
            icon={
              payment?.payment.status === 'success' ||
              payment?.payment.status === 'pending'
                ? 'simple-line-icons:check'
                : 'carbon:close-outline'
            }
            sx={{
              width: '3.5rem',
              height: '3.5rem',
              color:
                payment?.payment.status === 'success'
                  ? '#54D62C'
                  : payment?.payment.status === 'pending'
                  ? '#54D62C'
                  : '#FF4842',
            }}
          />
          <Typography variant="h6">
            {payment?.payment.status === 'success' ||
            payment?.payment.status === 'pending'
              ? 'Thank you for your purchase'
              : 'An error has occurred'}
          </Typography>
          <Button
            size={isSmallScreen ? 'small' : 'medium'}
            variant="contained"
            fullWidth
            sx={{ width: '40%', my: '1rem', fontSize: {xs: '0.75rem', sm: '0.75rem'} }}
            onClick={() => navigate('/dashboard/products')}
          >
            Continue Shopping
          </Button>
        </Box>
        <Box sx={{ my: '1rem' }}>
          <Typography variant="h4">Related products</Typography>
          <Box sx={{ my: '1rem' }}>
            <ProductList products={productsFilter} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PaymentStatus;
