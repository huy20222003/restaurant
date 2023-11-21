import { useEffect, useState, useRef } from 'react';
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
//icon
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../../Components/Admin/DataTable';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//context
import { useProduct, useCategory, useCommon } from '../../../hooks/context';
//component
import Iconify from '../../../Components/User/iconify';
//sweetalert
import Swal from 'sweetalert2';
//htmlparse
import HTMLReactParser from 'html-react-parser';
//util
import { fDateTime } from '../../../utils/formatTime';
//pdf
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//component
import FormDialogViewProduct from '../../../Components/FormDialog/FormDialogViewProduct';
//---------------------------------------------------------

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: theme.customShadows.card,
  marginTop: '4rem',
  borderRadius: '0.75rem',
}));

const ProductManage = () => {
  const {
    productsState: { products },
    handleDeleteProduct,
    handleGetAllProducts,
    handleGetOneProduct,
  } = useProduct();

  const {setOpenFormDialog} = useCommon();
  const [product, setProduct] = useState({});

  const {
    categoryState: { categories },
  } = useCategory();

  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllProducts();
  }, [handleGetAllProducts]);

  const componentRef = useRef(null);

  const handleExportPDF = () => {
    const pdf = new jsPDF('l', 'pt', 'letter');
    const table = componentRef.current; 
  
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pageWidth = 612;
      const pageHeight = (canvas.height * pageWidth) / canvas.width;
  
      pdf.addImage(imgData, 'JPEG', 10, 10, pageWidth - 20, pageHeight - 20);
      pdf.save('datatable.pdf');
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 90 },
    {
      field: 'image_url',
      headerName: 'Image',
      type: 'String',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          style={{ width: '60%', height: '60%' }}
        />
      ),
    },
    { field: 'name', headerName: 'Name', type: 'String', width: 160 },
    {
      field: 'description',
      headerName: 'Description',
      type: 'String',
      width: 200,
    },
    { field: 'category', headerName: 'Category', type: 'String', width: 160 },
    { field: 'price', headerName: 'Price', type: 'Number', width: 100 },
    { field: 'priceSale', headerName: 'Price Sale', type: 'Number', width: 100 },
    { field: 'rate', headerName: 'Rate', type: 'Number', width: 70 },
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

  const rows = products.map((product) => {
    const description = HTMLReactParser(
      product?.description && typeof product.description === 'string'
        ? product.description
        : ''
    );
    const categoryName = categories.find(
      (item) => item?._id == product?.category
    );

    return {
      id: product?._id,
      image_url: product?.image_url[0],
      name: product?.name,
      description: description.props.children,
      category: categoryName?.name,
      price: product?.price,
      priceSale: product?.priceSale,
      rate: product?.rate,
      createdAt: fDateTime(product?.createdAt),
      updatedAt: fDateTime(product?.updatedAt),
    };
  });

  const handleView = async (productId) => {
    try {
      const response = await handleGetOneProduct(productId);
      setProduct(response.product);
      setOpenFormDialog(true);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/product-manage/edit/${productId}`);
  };

  const handleDelete = async (productId) => {
    Swal.fire({
      title: 'Delete this product?',
      text: 'Would you like to delete this product?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, of course!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handleDeleteProduct(productId);
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

  const handleNavigateCreateProductPage = () => {
    navigate('/admin/product-manage/create');
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
            <Container maxWidth="xl">
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
                      Products
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
                      <ButtonBase sx={{ p: '0.2rem' }} onClick={handleExportPDF}>
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
                      onClick={handleNavigateCreateProductPage}
                    >
                      Add
                    </Button>
                  </Stack>
                </Stack>
                <DataTable ref={componentRef} columns={columns} rows={rows} />
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
      <FormDialogViewProduct product={product} handleDelete={handleDelete} />
    </StyledPaper>
  );
};

export default ProductManage;
