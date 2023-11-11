import { useContext } from 'react';
//@mui
import { Stack, Pagination } from '@mui/material';
//context
import { ProductsContext } from '../../../Contexts/ProductsContext';

const ProductPagination = () => {
  const {
    productsState: { currentPage, totalPages },
    handlePageChange,
  } = useContext(ProductsContext);

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages || 1}
        page={currentPage || 1}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

export default ProductPagination;
