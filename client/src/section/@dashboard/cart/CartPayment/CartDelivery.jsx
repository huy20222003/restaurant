import PropTypes from 'prop-types';
import { useState } from 'react';
//@mui
import styled from '@emotion/styled';
import {
  Box,
  Card,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
//component
import Iconify from '../../../../Components/User/iconify';
//-------------------------------------------------------------

const StyledPaper = styled(Paper)`
  && {
    color: rgb(33, 43, 54);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 8px;
    border: 1px solid rgba(145, 158, 171, 0.16);
    background-image: none;
    padding: 10px;
    cursor: pointer;
    display: flex;

    &:active {
      box-shadow: rgb(33, 43, 54) 0px 0px 0px 2px;
    }
  }
`;

const deliveryOptions = [
  {
    id: 'standard',
    name: 'Standard',
    description: '5-7 hours delivery',
    price: 20000,
    icon: 'eva:paper-plane-fill',
  },
  {
    id: 'express',
    name: 'Express',
    description: '3-5 hours delivery',
    price: 25000,
    icon: 'mdi:truck',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: '4-5 hours delivery',
    price: 22000,
    icon: 'mdi:bird',
  },
];

const CartDelivery = ({ orderData, setOrderData }) => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const handleDeliveryClick = (selectedId) => {
    setSelectedDelivery(selectedId);
    const selectedOption = deliveryOptions.find(
      (option) => option.id === selectedId
    );
    setOrderData({
      ...orderData,
      shippingUnit: selectedOption.name,
      shippingFee: selectedOption.price,
    });
  };

  return (
    <Paper elevation={1} component={Card}>
      <Typography variant="subtitle2" sx={{ p: '0.3rem' }}>
        Delivery
      </Typography>
      <Box
        sx={{ display: 'flex', p: '24px', gap: '20px 16px', flexWrap: 'wrap' }}
      >
        {deliveryOptions.map((option) => (
          <StyledPaper
            key={option.id}
            component={Card}
            onClick={() => handleDeliveryClick(option.id)}
            sx={
              selectedDelivery === option.id
                ? {
                    boxShadow: 'rgb(33, 43, 54) 0px 0px 0px 2px',
                  }
                : {}
            }
          >
            <Iconify
              icon={option.icon}
              sx={{ width: '28px', height: '28px', mr: '0.8rem' }}
            />
            <ListItemText>
              <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <Box component="span" sx={{ flexGrow: 1 }}>
                  {option.name}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgb(99, 115, 129)',
                      fontWeight: 400,
                      m: '0 0 4px',
                    }}
                  >
                    {option.description}
                  </Typography>
                </Box>
                <Box component="span" sx={{ ml: '2rem' }}>
                  {option.price}
                </Box>
              </Stack>
            </ListItemText>
          </StyledPaper>
        ))}
      </Box>
    </Paper>
  );
};

CartDelivery.propTypes = {
  orderData: PropTypes.object.isRequired,
  setOrderData: PropTypes.func.isRequired,
};

export default CartDelivery;
