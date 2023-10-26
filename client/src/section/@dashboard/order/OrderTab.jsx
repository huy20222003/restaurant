import { useCallback, useEffect, useState } from 'react';
//@mui
import { Box, Paper } from '@mui/material';
import { Tab } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
//component
import OrderTabPanel from './OrderTabPanel';
//Context
import { useOrder } from '../../../hooks/context';
//------------------------------------------------------

const OrderTab = () => {
  const [value, setValue] = useState('all');
  const { handleFilterOrderByStatus } = useOrder();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilter = useCallback((value) => {
    handleFilterOrderByStatus(value);
  }, [handleFilterOrderByStatus]);  

  useEffect(() => {
    handleFilter(value);
  }, [handleFilter, value]);
  
  return (
    <Box>
      <TabContext value={value}>
        <Paper elevation={3}>
          <TabList
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab value="all" label="All" onClick={handleFilter} />
            <Tab value="ordered" label="Ordered" onClick={handleFilter} />
            <Tab value="confirm" label="Confirm" onClick={handleFilter} />
            <Tab value="delivering" label="Delivering" onClick={handleFilter} />
            <Tab value="delivered" label="Delivered" onClick={handleFilter} />
            <Tab value="canceled" label="Canceled" onClick={handleFilter} />
          </TabList>
        </Paper>

        <TabPanel sx={{ p: '24px 0' }} value="all">
          <OrderTabPanel />
        </TabPanel>
        <TabPanel sx={{ p: '24px 0' }} value="ordered">
          <OrderTabPanel />
        </TabPanel>
        <TabPanel sx={{ p: '24px 0' }} value="confirm">
          <OrderTabPanel />
        </TabPanel>
        <TabPanel sx={{ p: '24px 0' }} value="delivering">
          <OrderTabPanel />
        </TabPanel>
        <TabPanel sx={{ p: '24px 0' }} value="delivered">
          <OrderTabPanel />
        </TabPanel>
        <TabPanel sx={{ p: '24px 0' }} value="canceled">
          <OrderTabPanel />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default OrderTab;
