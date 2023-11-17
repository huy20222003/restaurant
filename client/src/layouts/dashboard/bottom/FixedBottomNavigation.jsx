import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
//icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2 from '@mui/icons-material/Inventory2';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Person from '@mui/icons-material/Person';
//---------------------------------------------------------

export default function FixedBottomNavigation() {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  const handleNavigate = useCallback(() => {
    switch (value) {
      case 0:
        navigate('/dashboard/app');
        break;
      case 1:
        navigate('/dashboard/products');
        break;
      case 2:
        navigate('/dashboard/cart');
        break;
      case 3:
        navigate('/dashboard/profile');
        break;
      default:
        navigate('/dashboard/app');
    }
  }, [navigate, value]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }}
        elevation={6}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={handleNavigate}
            label="Dashboard"
            icon={<DashboardIcon />}
          />
          <BottomNavigationAction
            onClick={handleNavigate}
            label="Products"
            icon={<Inventory2 />}
          />
          <BottomNavigationAction
            onClick={handleNavigate}
            label="Cart"
            icon={<AddShoppingCart />}
          />
          <BottomNavigationAction
            onClick={handleNavigate}
            label="Me"
            icon={<Person />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
