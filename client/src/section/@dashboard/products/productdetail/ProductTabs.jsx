import PropTypes from 'prop-types';
import { useState } from 'react';
//@mui
import { Tab, Box } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
//component
import ProductDescription from './ProductDescription';
import { ReviewList, ReviewSumary } from '../../reviews';
//-----------------------------------------------

const ProductTabs = ({ product }) => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <TabList
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="1" label="Description" />
          <Tab value="2" label="Review" />
        </TabList>
        <TabPanel value="1">
          <ProductDescription product={product} />
        </TabPanel>
        <TabPanel value="2">
          <Box>
            <ReviewSumary productId={product?._id} />
            <ReviewList productId={product?._id} />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

ProductTabs.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

export default ProductTabs;
