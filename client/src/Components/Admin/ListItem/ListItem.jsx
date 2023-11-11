import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Tooltip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
//@mui icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import styled from '@emotion/styled';
//context
import { useRole, useAuth } from '../../../hooks/context';
//-------------------------------------------------------------

const NavLinkCustom = styled(NavLink)`
  && {
    margin: 0;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 0.7rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    display: block;
    text-decoration: none;
    color: #fff;
  }
`;

const MainListItems = () => {
  const {
    authState: { user },
  } = useAuth();
  const { handleGetOneRole } = useRole();
  const [role, setRole] = useState('');
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await handleGetOneRole(user?.roles);
        setRole(response.role.name);
      } catch (error) {
        console.error('Error fetching Role:', error);
        // Xử lý lỗi theo cách bạn muốn
      }
    };

    user?.roles && fetchRole();
  }, [handleGetOneRole, user?.roles]);
  return (
    <>
      <Tooltip title="Dashboard" placement="right">
        <NavLinkCustom to="/admin">
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText sx={{ fontSize: '0.7rem' }} primary="Dashboard" />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
      <Tooltip title="Customers Manage" placement="right">
        <NavLinkCustom to="customer-manage">
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Customers Manage" />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
      {role === 'admin' ? (
        <Tooltip title="Employees Manage" placement="right">
          <NavLinkCustom to="employee-manage">
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Employees Manage" />
            </ListItemButton>
          </NavLinkCustom>
        </Tooltip>
      ) : (
        ''
      )}
      <Tooltip title="Products Manage" placement="right">
        <NavLinkCustom to="product-manage">
          <ListItemButton>
            <ListItemIcon>
              <FastfoodIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Products Manage" />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
      <Tooltip title="Categories Manage" placement="right">
        <NavLinkCustom to="category-manage">
          <ListItemButton>
            <ListItemIcon>
              <FormatListBulletedIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Categories Manage" />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
      <Tooltip title="Orders Manage" placement="right">
        <NavLinkCustom to="order-manage">
          <ListItemButton>
            <ListItemIcon>
              <AddShoppingCartIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Orders Manage" />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
      <Tooltip title="Payments" placement="right">
        <NavLinkCustom to="payment-manage">
          <ListItemButton>
            <ListItemIcon>
              <PaymentIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
      <Tooltip title="Reservations" placement="right">
        <NavLinkCustom to="reservation-manage">
          <ListItemButton>
            <ListItemIcon>
              <TableRestaurantIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Reservations" />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
    </>
  );
};

const SecondaryListItems = () => {
  return (
    <>
      <Tooltip title="Logout" placement="right">
        <NavLinkCustom to="/auth/admin/login">
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
    </>
  );
};

export { MainListItems, SecondaryListItems };
