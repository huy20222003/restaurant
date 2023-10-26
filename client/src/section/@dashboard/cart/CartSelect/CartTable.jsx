import PropTypes from 'prop-types';
import { useEffect } from 'react';
//@mui
import {
  ButtonBase,
  Card,
  CardContent,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Box,
} from '@mui/material';
//component
import CartTableItem from './CartTableItem';
//context
import { useCart } from '../../../../hooks/context';
import Iconify from '../../../../Components/User/iconify';

//---------------------------------------------------------------

const CartTable = ({
  orderData,
  setOrderData,
  selectedProducts,
  setSelectedProducts,
}) => {
  const {
    cartState: { items }, handleGetCart,
  } = useCart();

  useEffect(()=> {
    handleGetCart();
  }, [handleGetCart]);

  const handleProductSelect = (product) => {
    const productIndex = selectedProducts.findIndex(
      (p) => p.product._id === product.product._id
    );
    if (productIndex === -1) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts.splice(productIndex, 1);
      setSelectedProducts(updatedSelectedProducts);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const selectedProduct of selectedProducts) {
      const { product, quantity } = selectedProduct;
      const price = product?.priceSale ? product?.priceSale : product?.price;
      totalPrice += (price * quantity) + orderData.shippingFee;
    }
    return totalPrice;
  };

  const totalPrices = calculateTotalPrice();

  useEffect(() => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      totalPrices: totalPrices,
      items: selectedProducts,
    }));
  }, [selectedProducts, setOrderData, totalPrices]);

  return (
    <>
      <Paper component={Card} sx={{ mb: '24px' }} elevation={0}>
        {/* <Box>
          <Typography variant="body1">
            Cart
            <Typography
              variant="body2"
              sx={{ m: 0, color: 'rgb(99, 115, 129)' }}
            >
              ({items?.length} items)
            </Typography>
          </Typography>
        </Box> */}
        <CardContent>
          <TableContainer
            sx={{
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ccc',
                borderRadius: '4px',
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <CartTableItem
                    key={item}
                    item={item}
                    onSelect={() => handleProductSelect(item)}
                    isSelected={selectedProducts.some(
                      (p) => p.product._id === item.product._id
                    )}
                    orderData={orderData}
                    setOrderData={setOrderData}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Paper>
      <ButtonBase component="a" href="/dashboard/products">
        <Iconify icon="eva:arrow-ios-back-fill" />
        Continue Shopping
      </ButtonBase>
    </>
  );
};

CartTable.propTypes = {
  orderData: PropTypes.object.isRequired,
  setOrderData: PropTypes.func.isRequired,
  selectedProducts: PropTypes.array.isRequired,
  setSelectedProducts: PropTypes.func.isRequired,
};

export default CartTable;
