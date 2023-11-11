import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
//@mui
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
//component
import OrderTimeLine from './OrderTimeLine';
import FormDialogReview from '../../../Components/FormDialog/FormDialogReview';
//context
import { useCommon, useReview } from '../../../hooks/context';
//sweetalert
import Swal from 'sweetalert2';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//-------------------------------------------------

const OrderDetail = ({ orderInfo, handleUpdate }) => {
  const { setOpenFormDialog } = useCommon();
  const { handleCreateReview, handleUpdateOrderAfterReview } = useReview();
  const { _id } = useParams();
  const { items, totalPrices, shippingFee, status } = orderInfo;

  const formik = useFormik({
    initialValues: {
      rate: 1,
      review: '',
      productId: '',
      orderId: _id,
    },
    validationSchema: yup.object({
      rate: yup.number('Rate must number').required('Rate is required'),
      review: yup.string().max(1000, 'The maxium character is 10000'),
      productId: yup.string().required('Product Id is required'),
      orderId: yup.string().required('Order Id is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await handleCreateReview(values);
        if (!response.success) {
          Swal.fire('', 'Add review failed', 'error');
        } else {
          const updateOrderData = await handleUpdateOrderAfterReview({
            orderId: formik.values.orderId,
            productId: formik.values.productId,
          });
          if (!updateOrderData.success) {
            Swal.fire('', 'Add review failed', 'error');
          } else {
            Swal.fire('', 'Add review successful', 'success');
          }
        }
        setTimeout(window.location.reload(), 3000);
      } catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
      setOpenFormDialog(false);
      formik.setValues({});
    },
  });

  if (!orderInfo) {
    return null;
  }
  const fields = [{ name: 'review', label: 'Review', type: 'text', row: 5 }];

  const handleOpenFormDialog = (item) => {
    setOpenFormDialog(true);
    formik.setFieldValue('productId', item.product._id);
  };

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
          {items.map((item) => (
            <Stack
              key={item.product._id}
              sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Box sx={{ p: '16px 0', width: '100%' }}>
                <Stack
                  key={item?.product?.name}
                  sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    my: '1rem',
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
                        backgroundImage: `url(${item?.product?.image_url[0]})`,
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
                        x{item?.quantity}
                      </Typography>
                    </Box>
                    <Stack sx={{ mx: '12px' }}>
                      <Typography variant="body2">
                        {item?.product?.name}
                      </Typography>
                      <Stack
                        sx={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {item?.property?.size && (
                          <Typography
                            variant="caption"
                            sx={{ color: 'rgb(128, 128, 137)' }}
                          >
                            size: {item?.property?.size}
                          </Typography>
                        )}
                        {item?.property?.color && (
                          <Typography
                            variant="caption"
                            sx={{ color: 'rgb(128, 128, 137)' }}
                          >
                            color: {item?.property?.color}
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      {item?.product?.priceSale || item?.product?.price}
                    </Typography>
                    {item.isReview === false && status === 'delivered' ? (
                      <Button
                        variant="contained"
                        color="warning"
                        size="medium"
                        sx={{ color: '#fff' }}
                        onClick={() => handleOpenFormDialog(item)}
                      >
                        Review
                      </Button>
                    ) : (
                      ''
                    )}
                  </Box>
                </Stack>
                <FormDialogReview
                  fields={fields}
                  formik={formik}
                  handleSave={formik.handleSubmit}
                  item={item}
                />
              </Box>
              <Divider />
            </Stack>
          ))}
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
                <Typography variant="subtitle2">
                  {parseFloat(totalPrices - shippingFee)}
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
                <Typography variant="subtitle2">Shipping Fee:</Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'rgb(255, 86, 48)' }}
                >
                  {parseFloat(shippingFee)}
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
                  {parseFloat(totalPrices)}
                </Typography>
              </Stack>
              {status !== 'return' ? (
                <Stack
                  sx={{
                    flexDirection: 'row',
                    gap: '0.75rem',
                    alignItems: 'center',
                    pt: '1rem',
                  }}
                >
                  {status !== 'delivered' && (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={orderInfo?.status !== 'confirmed'}
                      onClick={handleUpdate}
                    >
                      Delivered
                    </Button>
                  )}
                </Stack>
              ) : (
                <Button variant="outlined" color="error">
                  Cancelled
                </Button>
              )}
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
        <OrderTimeLine orderInfo={orderInfo} />
      </Paper>
    </Box>
  );
};

OrderDetail.propTypes = {
  orderInfo: PropTypes.shape({
    items: PropTypes.objectOf(
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
    isReview: PropTypes.bool,
    status: PropTypes.arrayOf(PropTypes.string),
  }),
  handleUpdate: PropTypes.func,
};

export default OrderDetail;
