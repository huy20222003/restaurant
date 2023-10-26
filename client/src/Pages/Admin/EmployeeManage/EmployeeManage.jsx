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
  Menu,
  MenuItem,
  Popover,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import styled from '@emotion/styled';
//icon
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//component
import DataTable from '../../../Components/Admin/DataTable';
import FormDialogEmployee from '../../../Components/FormDialog/FormDialogEmployee';
import Iconify from '../../../Components/User/iconify';
//context
import { useCommon, useEmployee, useRole } from '../../../hooks/context';
//sweetalert
import Swal from 'sweetalert2';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
//util
import { fDateTime } from '../../../utils/formatTime';
//----------------------------------------------------------------------

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: theme.customShadows.card,
  marginTop: '4rem',
  borderRadius: '0.75rem',
}));

const EmployeeManage = () => {
  const {
    employeesState: { employees },
    handleGetAll,
    handleGetOneEmployee,
    handleCreateEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    handleUpdateRole,
  } = useEmployee();

  const navigate = useNavigate();

  const { setOpenFormDialog } = useCommon();
  const [isEdit, setIsEdit] = useState(false);
  const [roleData, setRoleData] = useState({ id: null, roleId: null });

  useEffect(() => {
    handleGetAll();
  }, [handleGetAll]);

  const {
    roleState: { roles },
    handleGetAllRole,
  } = useRole();

  useEffect(() => {
    handleGetAllRole();
  }, [handleGetAllRole]);

  const renderRoles = () => {
    return roles.map((role) => (
      <MenuItem key={role._id} value={role._id}>
        {role.name}
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

  useEffect(() => {
    if (isEdit) {
      setOpenFormDialog(true);
    }
  }, [isEdit, setOpenFormDialog]);

  const formik = useFormik({
    initialValues: {
      _id: '',
      fullName: '',
      username: '',
      email: '',
      salary: '',
      position: 'employee',
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
      salary: yup.number().required('Salary is required'),
      position: yup.string().required('Position is required'),
    }),
    onSubmit: async (values) => {
      try {
        if (isEdit) {
          const editData = await handleUpdateEmployee(values._id, values);
          if (!editData.success) {
            Swal.fire({
              title: 'Update employee failed!',
              icon: 'error',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Update employee successful!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          }
        } else {
          const createData = await handleCreateEmployee(values);
          if (!createData.success) {
            Swal.fire({
              title: 'Add employee failed!',
              icon: 'error',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Add employee Successful!',
              text: 'Default password is 1234567',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          }
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
      headerName: 'Ảnh đại diện',
      type: 'String',
      width: 90,
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
    { field: 'email', headerName: 'Email', type: 'String', width: 150 },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'String',
      width: 120,
    },
    { field: 'address', headerName: 'Address', type: 'String', width: 160 },
    { field: 'position', headerName: 'Position', type: 'String', width: 130 },
    { field: 'salary', headerName: 'Salary', type: 'Number', width: 100 },
    {
      field: 'role',
      headerName: 'Role',
      type: 'String',
      width: 150,
      renderCell: (params) => (
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
              Xem
            </MenuItem>
            <MenuItem onClick={() => handleEdit(params.row.id)}>
              <EditIcon sx={{ paddingRight: '0.5rem' }} />
              Sửa
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon sx={{ paddingRight: '0.5rem' }} />
              Xoá
            </MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }

  const rows = employees.map((employee) => {
    return {
      id: employee?._id,
      avatar: employee?.avatar,
      username: employee?.username,
      fullName: employee?.fullName,
      email: employee?.email,
      phoneNumber: employee?.phoneNumber,
      address: employee?.address,
      position: employee?.position,
      salary: employee?.salary,
      role: employee?.roles,
      createdAt: fDateTime(employee?.createdAt),
      updatedAt: fDateTime(employee?.updatedAt),
    };
  });

  const fields = [
    { name: 'fullName', label: 'FullName', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'salary', label: 'Salary', type: 'text' },
  ];

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleView = (employeeId) => {
    navigate(`/admin/employee-manage/${employeeId}`);
  };

  const handleEdit = async (employeeId) => {
    const response = await handleGetOneEmployee(employeeId);
    if (response.success) {
      formik.setValues(response.employee);
    }
    setIsEdit(true);
  };

  const handleDelete = async (employeeId) => {
    Swal.fire({
      title: 'Delete this employee?',
      text: 'Would you like to delete this employee?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, of course!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handleDeleteEmployee(employeeId);
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
                      Employees
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
                <FormDialogEmployee
                  fields={fields}
                  isEdit={isEdit}
                  formik={formik}
                  handleSave={formik.handleSubmit}
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

export default EmployeeManage;
