import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
//@mui
import { Box, Container, Stack } from '@mui/system';
import { ButtonBase, Grid, Typography } from '@mui/material';
//icon
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
//component
import { OrderDetail, OrderInfo } from '../../../section/@dashboard/order';
//context
import { useOrder, usePayment } from '../../../hooks/context';
//Swal
import Swal from 'sweetalert2';
//----------------------------------------------------------

const OrderPageDetail = () => {
  const handleBack = () => {
    history.back();
  };

  const { _id } = useParams();
  const {
    ordersState: { order },
    handleGetOneOrder,
    handleUpdateOrder,
  } = useOrder();
  const [orderInfo, setOrderInfo] = useState(order);
  const {handleUpdatePayment} = usePayment();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleGetOneOrder(_id);
        setOrderInfo(response.order);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchData();
  }, [_id, handleGetOneOrder]);

  const handleUpdate = useCallback(
    async () => {
      const response = await handleUpdateOrder(_id, { status: 'delivered' });
      if (!response.success) {
        Swal.fire('', `Delivered failed`, 'error');
      } else {
        Swal.fire('', `Delivered success`, 'success');
      }
      window.location.reload();
    },
    [_id, handleUpdateOrder]
  );

  return (
    <Box
      component={'main'}
      sx={{
        flexGrow: 1,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container>
        <Stack sx={{ gap: '8px', alignItems: 'center', flexDirection: 'row' }}>
          <ButtonBase onClick={handleBack}>
            <ArrowBackIosIcon sx={{ fontSize: '12px' }} />
          </ButtonBase>
          {orderInfo && (
            <Stack sx={{ gap: '4px' }}>
              <Stack
                sx={{ flexDirection: 'row', gap: '8px', alignItems: 'center' }}
              >
                <Typography variant="h5">Order #{orderInfo._id.substring(0, 100)}{orderInfo._id.length > 100 && '...'}</Typography>
                <Typography
                  variant="overline"
                  sx={{
                    height: '24px',
                    minWidth: '24px',
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap',
                    textTransform: 'capitalize',
                    padding: '0px 6px',
                    color:
                      orderInfo.status ===
                      'cancelled'
                        ? 'error.main'
                        : 'primary.main',
                    backgroundColor:
                      orderInfo.status ===
                      'cancelled'
                        ? 'error.lighter'
                        : 'primary.lighter',
                  }}
                >
                  {orderInfo.status}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {orderInfo && <OrderDetail orderInfo={orderInfo} handleUpdate={handleUpdate} />}
          </Grid>
          <Grid item xs={12} md={4}>
            {orderInfo && <OrderInfo orderInfo={orderInfo} />}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OrderPageDetail;
