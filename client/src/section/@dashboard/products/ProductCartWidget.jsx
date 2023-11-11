import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
//context
import { useCart } from '../../../hooks/context';
// component
import Iconify from '../../../Components/User/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const navigate = useNavigate();
  const {cartState: {items}, handleGetCart} = useCart();
  useEffect(() => {
    handleGetCart();
  }, [handleGetCart]);
  const handleNavigateToCartPage = ()=> {
    navigate('/dashboard/cart');
  }

  return (
    <StyledRoot>
      <Badge showZero badgeContent={items.length} color="error" max={99} onClick={handleNavigateToCartPage}>
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>
    </StyledRoot>
  );
}
