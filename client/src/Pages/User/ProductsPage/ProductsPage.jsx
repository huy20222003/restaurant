import { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography, Box } from '@mui/material';
// components
import {
  ProductSort,
  ProductCartWidget,
  ProductFilterSidebar,
  ProductPagnition,
} from '../../../section/@dashboard/products';
const ProductList = lazy(() =>
  import('../../../section/@dashboard/products/ProductList')
);
// context
import { useProduct } from '../../../hooks/context';
//Loader
import Loader from '../../../Components/Loader';
// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const {
    productsState: { products },
    handleGetAllProducts,
  } = useProduct();

  useEffect(() => {
    handleGetAllProducts();
  }, [handleGetAllProducts]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <Suspense fallback={<Loader />}>
          <ProductList products={products} />
        </Suspense>
        <ProductCartWidget />
        <Box sx={{mt: '0.8rem'}}>
          <ProductPagnition />
        </Box>
      </Container>
    </>
  );
}
