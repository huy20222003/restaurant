import { useCallback, useEffect, useState } from 'react';
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
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../../Components/Admin/DataTable';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//component
import Iconify from '../../../Components/User/iconify';
import FormDialogCustomer from '../../../Components/FormDialog/FormDialogCustomer';
//context
import { useCommon, useUser, useRole } from '../../../hooks/context';
//sweetalert2
import Swal from 'sweetalert2';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
//util
import { fDateTime } from '../../../utils/formatTime';
//------------------------------------------------------

const StyledPaper = styled(Paper)(({ theme }) => ({
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
    handleUpdateRole,
  } = useUser();

  const { setOpenFormDialog } = useCommon();

  const {
    roleState: { roles },
    handleGetAllRole,
  } = useRole();
  const [roleData, setRoleData] = useState({ id: null, roleId: null });

  useEffect(() => {
    handleGetAllRole();
  }, [handleGetAllRole]);

  const renderRoles = () => {
    return roles.map((role) => (
      <MenuItem key={role?._id} value={role?._id}>
        {role?.name}
      </MenuItem>
    ));
  };

  const handleChangeRole = (e, rowData) => {
    setRoleData({ id: rowData.id, roleId: e.target.value });
    updateRole();
  };

  const updateRole = useCallback(() => {
    Swal.fire({
      title: 'Update',
      text: 'Are you sure you want to update?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes',
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await handleUpdateRole(roleData);
            if (!response.success) {
              Swal.fire('', 'Update role failed', 'error');
            } else {
              Swal.fire('', 'Updated role successful', 'success');
            }
          } catch (error) {
            Swal.fire('', 'Server Error', 'error');
          }
        } else {
          Swal.fire('', 'Update role failed', 'error');
        }
      })
      .catch(() => {
        Swal.fire('', 'Server Error', 'error');
      });
  }, [handleUpdateRole, roleData]);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllUser();
  }, [handleGetAllUser]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .required('FullName is required')
        .max(200, 'Maximum characters are 200'),
      username: yup
        .string()
        .required('Username is required')
        .max(100, 'Maximum characters are 100'),
      email: yup.string().required('Email is required').email(),
    }),
    onSubmit: async (values) => {
      try {
        const createData = await handleCreateUser(values);
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
      } catch (error) {
        Swal.fire({
          title: 'Server Error',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      }
    },
  });

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
      field: 'role',
      headerName: 'Role',
      type: 'String',
      width: 150,
      renderCell: (params) => {
        return (
          <FormControl fullWidth size="small">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              label="Role"
              labelId="role-label"
              value={params.value}
              onChange={(e) => handleChangeRole(e, params)}
            >
              {renderRoles()}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'String',
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor:
              params.value === 'Verified'
                ? 'success.light'
                : params.value === 'Banned'
                ? 'error.light'
                : 'info.light',
            p: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
          }}
        >
          <Typography sx={{ color: '#fff' }}>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Create Date',
      type: 'String',
      width: 200,
    },
    {
      field: 'updatedAt',
      headerName: 'Update Date',
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
      role: user?.roles,
      status: user?.status,
      createdAt: fDateTime(user?.createdAt),
      updatedAt: fDateTime(user?.updatedAt),
    };
  });

  const fields = [
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
                  sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mb: '1rem',
                  }}
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
                      <ButtonBase sx={{ p: '0.2rem' }}>
                        <Iconify
                          icon="material-symbols:upload"
                          sx={{ mr: '0.3rem' }}
                        />
                        Upload
                      </ButtonBase>
                      <ButtonBase sx={{ p: '0.2rem' }}>
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
                  fields={fields}
                  handleCreate={formik.handleSubmit}
                  formik={formik}
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
