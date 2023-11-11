import PropTypes from 'prop-types';
import { useState } from 'react';
//@mui
import { Box, Tab } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
//component
import { Reservation, ReservationTable } from './index';
//--------------------------------------------------

const ReservationTabs = ({ isEdit, setIsEdit, formik }) => {
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
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="1" label="Reservations" />
          <Tab value="2" label="Tables" />
        </TabList>
        <TabPanel value="1">
          <Reservation />
        </TabPanel>
        <TabPanel value="2">
          <ReservationTable
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            formik={formik}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

ReservationTabs.propTypes = {
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
};

export default ReservationTabs;
