import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import {
  Box,
  Button,
  Typography,
  Popover,
  Menu,
  MenuItem,
  Stack,
  ButtonBase,
  Container,
  IconButton,
  Paper,
} from '@mui/material';
import styled from '@emotion/styled';
//mui icon
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
//component
import Iconify from '../../../Components/User/iconify';
import DataTable from '../../../Components/Admin/DataTable';
import FormDialogCategory from '../../../Components/FormDialog/FormDialogCategory';
//context
import { useCategory, useCommon, useProduct } from '../../../hooks/context';
//sweetalert
import Swal from 'sweetalert2';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
//util
import { fDateTime } from '../../../utils/formatTime';
//------------------------------------------------------------------------

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: theme.customShadows.card,
  marginTop: '4rem',
  borderRadius: '0.75rem',
}));

const CategoryManage = () => {
  let countProduct = 0;
  const {
    categoryState: { categories },
    handleGetAllCategory,
    handleGetOneCategory,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  } = useCategory();

  const {
    productsState: { products },
    handleGetAllProducts,
  } = useProduct();

  useEffect(() => {
    handleGetAllProducts();
  }, [handleGetAllProducts]);

  useEffect(() => {
    handleGetAllCategory();
  }, [handleGetAllCategory]);

  const { setOpenFormDialog } = useCommon();
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      imageUrl: '',
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Username is required')
        .max(100, 'Maximum characters are 100'),
      description: yup.string().max(3000, 'Maximum characters are 3000'),
      imageUrl: yup.string().required('Image is required'),
    }),
    onSubmit: async (values) => {
      try {
        if (isEdit) {
          const editData = await handleUpdateCategory(values._id, values);
          if (!editData.success) {
            Swal.fire({
              title: 'Update category failed!',
              icon: 'error',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Update category successful!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          }
        } else {
          const createData = await handleCreateCategory(values);
          if (!createData.success) {
            Swal.fire({
              title: 'Add category failed!',
              icon: 'error',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Add category Successful!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'OK',
            });
          }
        }
        formik.setValues({});
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
    { field: 'id', headerName: 'ID', type: 'String', width: 100 },
    {
      field: 'imageUrl',
      headerName: 'Image',
      type: 'String',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Category"
          style={{ width: '60%', height: '60%' }}
        />
      ),
    },
    { field: 'name', headerName: 'Name', type: 'String', width: 200 },
    {
      field: 'description',
      headerName: 'Description',
      type: 'String',
      width: 300,
    },
    {
      field: 'quantity',
      headerName: 'The number of products',
      type: 'number',
      width: 120,
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
            <MenuItem onClick={() => handleEdit(params.row.id)}>
              <EditIcon sx={{ paddingRight: '0.5rem' }} />
              Edit
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

  const rows =
    categories &&
    categories.map((category) => {
      const countItem = products.find((item) => item.category == category._id);
      if (countItem) {
        countProduct++;
      }

      return {
        id: category?._id,
        imageUrl: category?.imageUrl,
        name: category?.name,
        description: category?.description,
        quantity: countProduct,
        createdAt: fDateTime(category?.createdAt),
        updatedAt: fDateTime(category?.updatedAt),
      };
    });

  const fields = [
    { name: 'name', label: 'Name', type: 'text', row: 1 },
    { name: 'description', label: 'Description', type: 'text', row: 5 },
  ];

  const handleView = useCallback(
    (categoryId) => {
      navigate(`/admin/category-manage/${categoryId}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    async (categoryId) => {
      Swal.fire({
        title: 'Delete this category?',
        text: 'Would you like to delete this category?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, of course!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await handleDeleteCategory(categoryId);
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
    },
    [handleDeleteCategory]
  );

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleEdit = useCallback(
    async (categoryId) => {
      const response = await handleGetOneCategory(categoryId);
      if (response.success) {
        formik.setValues(response.category);
      }
      setIsEdit(true);
    },
    [formik, handleGetOneCategory]
  );

  useEffect(() => {
    if (isEdit) {
      setOpenFormDialog(true);
    }
  }, [isEdit, setOpenFormDialog]);

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
                      Categories
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
                <FormDialogCategory
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

export default CategoryManage;
