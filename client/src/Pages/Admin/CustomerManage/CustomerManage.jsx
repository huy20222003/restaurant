import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Stack,
  Typography,
  Popover,
  MenuItem,
  Menu,
  Paper,
} from '@mui/material';
import styled from '@emotion/styled';
//@mui icon
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../../Components/Admin/DataTable';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//iconify
import Iconify from '../../../Components/User/iconify';
//context
import { useCommon, useUser } from '../../../hooks/context';
//component
import FormDialogCustomer from '../../../Components/FormDialog/FormDialogCustomer';
//sweetalert
import Swal from 'sweetalert2';
//-------------------------------------------------------

const StyledPaper = styled(Paper)(({theme})=> ({
  boxShadow: theme.customShadows.card,
  marginTop: '4rem',
  borderRadius: '0.75rem',
}));

const CustomerManage = () => {
  const {
    usersState: { users },
    handleGetAllUser,
    handleCreateUser,
    handleDeleteUser,
    handleGetOneUser,
  } = useUser();

  const { setOpenFormDialog } = useCommon();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllUser();
  }, [handleGetAllUser]);

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 70 },
    {
      field: 'avatar',
      headerName: '',
      type: 'String',
      width: 80,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          style={{ width: '70%', height: '70%', borderRadius: '50%' }}
        />
      ),
    },
    { field: 'username', headerName: 'Username', type: 'String', width: 100 },
    { field: 'fullName', headerName: 'FullName', type: 'String', width: 160 },
    { field: 'email', headerName: 'Email', type: 'String', width: 130 },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'String',
      width: 130,
    },
    { field: 'address', headerName: 'Address', type: 'String', width: 200 },
    {
      field: 'shipAddress',
      headerName: 'Ship Address',
      type: 'String',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 90,
      renderCell: ActionsCell,
    },
  ];

  function ActionsCell(params) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          onClick={handleClick}
          aria-label="More"
          aria-controls="menu-actions"
          aria-haspopup="true"
        >
          <MoreVertIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{ style: { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}
        >
          <Menu
            id="menu-actions"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleView(params.row.id)}>
              <VisibilityIcon sx={{ paddingRight: '0.5rem' }} />
              View
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon sx={{ paddingRight: '0.5rem' }} />
              Delete
            </MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }

  const rows = users.map((user) => {
    return {
      id: user?._id,
      avatar: user?.avatar,
      username: user?.username,
      fullName: user?.fullName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      shipAddress: user?.shipAddress,
    };
  });

  const fiels = [
    { name: 'fullName', label: 'FullName', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
  ];

  const handleView = (userId) => {
    navigate(`/admin/customer-manage/${userId}`);
    handleGetOneUser(userId);
  };

  const handleDelete = async (userId) => {
    Swal.fire({
      title: 'Delete this user?',
      text: 'Would you like to delete this user?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, of course!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handleDeleteUser(userId);
          if (response.success) {
            Swal.fire('', 'Delete Successful!', 'success');
          } else {
            Swal.fire('', 'Delete failed!', 'error');
          }
        } catch (error) {
          Swal.fire('', 'Server error!', 'error');
        }
      }
    });
  };

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleCreate = async () => {
    try {
      const createData = await handleCreateUser(formData);
      if (!createData.success) {
        Swal.fire({
          title: 'Add user failed!',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Add user Successful!',
          text: 'Default password is 1234567',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      }
      setOpenFormDialog(false);
      setFormData({});
    } catch (error) {
      Swal.fire({
        title: 'Server Error',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <StyledPaper>
      <Box sx={{ display: 'flex', flex: '1 1 auto', maxWidth: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            width: '100%',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flexGrow: 1, py: '2.5rem' }}>
            <Container>
              <Stack>
                <Stack
                  sx={{ flexDirection: 'row', justifyContent: 'space-between', mb: '1rem' }}
                >
                  <Stack>
                    <Typography variant="h5" color="primary">
                      Customers
                    </Typography>
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        mt: '0.5rem',
                      }}
                    >
                      <ButtonBase sx={{p: '0.2rem'}}>
                        <Iconify
                          icon="material-symbols:upload"
                          sx={{ mr: '0.3rem' }}
                        />
                        Upload
                      </ButtonBase>
                      <ButtonBase sx={{p: '0.2rem'}}>
                        <Iconify icon="uil:import" sx={{ mr: '0.3rem' }} />
                        Export
                      </ButtonBase>
                    </Stack>
                  </Stack>
                  <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{ borderRadius: '0.375rem' }}
                      onClick={handleOpenFormDialog}
                    >
                      Add
                    </Button>
                  </Stack>
                </Stack>
                <FormDialogCustomer
                  fields={fiels}
                  handleCreate={handleCreate}
                  formData={formData}
                  setFormData={setFormData}
                />
                <DataTable columns={columns} rows={rows} />
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default CustomerManage;
