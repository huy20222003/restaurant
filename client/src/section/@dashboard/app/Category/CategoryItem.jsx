import { useNavigate } from 'react-router-dom';
//@mui
import { Box, Stack, Typography } from '@mui/material';
//proptype
import PropTypes from 'prop-types';
//context
import {useProduct} from '../../../../hooks/context';
//--------------------------------------------------

const CategoryItem = ({ id, name, image }) => {
  const navigate = useNavigate();
  const {handleFilterProductsByCategory} = useProduct();

  const fetchProducts = async () => {
    try {
      await handleFilterProductsByCategory(id);
      navigate('/dashboard/products');
    } catch (error) {
      console.error('Error fetching products:', error);
      // Xử lý lỗi theo cách bạn muốn
    }
  };

  return (
    <Box sx={{ cursor: 'pointer' }}>
      <Stack sx={{ alignItems: 'center', gap: '0.75rem' }}>
        <Box
          component={'img'}
          src={image}
          sx={{ width: '3rem', height: '3rem', objectFit: 'cover' }}
          alt={name}
        ></Box>
        <Typography variant="body1">{name}</Typography>
      </Stack>
    </Box>
  );
};

CategoryItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CategoryItem;
