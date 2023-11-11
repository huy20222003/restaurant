import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//@mui
import { Box, Button, Container, Typography } from '@mui/material';
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
          setOrder(orderData);
        } catch (error) {
          console.error('Error fetching order:', error);
          // Handle error as needed
        }
      };

      fetchOrder();
    }
  }, [handleGetOneOrder, payment]);

  var count = 500;
  var defaults = {
    scalar: 2,
    spread: 180,
    particleCount: 30,
    origin: { y: 0.6 },
    //startVelocity: -45,
  };

  var tree = confetti.shapeFromPath({
    path: 'M120 240c-41,14 -91,18 -120,1 29,-10 57,-22 81,-40 -18,2 -37,3 -55,-3 25,-14 48,-30 66,-51 -11,5 -26,8 -45,7 20,-14 40,-30 57,-49 -13,1 -26,2 -38,-1 18,-11 35,-25 51,-43 -13,3 -24,5 -35,6 21,-19 40,-41 53,-67 14,26 32,48 54,67 -11,-1 -23,-3 -35,-6 15,18 32,32 51,43 -13,3 -26,2 -38,1 17,19 36,35 56,49 -19,1 -33,-2 -45,-7 19,21 42,37 67,51 -19,6 -37,5 -56,3 25,18 53,30 82,40 -30,17 -79,13 -120,-1l0 41 -31 0 0 -41z',
    matrix: [
      0.03597122302158273, 0, 0, 0.03597122302158273, -4.856115107913669,
      -5.071942446043165,
    ],
  });

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      shapes: [tree],
      colors: ['#8d960f', '#be0f10', '#445404'],
      particleCount: Math.floor(count * particleRatio),
    });
  }

  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();

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

  const productsFilter = products.filter((product) => {
    return product.name.includes('Milk');
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
            size="medium"
            variant="contained"
            sx={{ width: '40%', my: '1rem' }}
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
