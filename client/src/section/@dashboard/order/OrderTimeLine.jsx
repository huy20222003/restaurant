import PropTypes from 'prop-types';
import { memo } from 'react';
//@mui
import { Box, Typography } from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineOppositeContent,
} from '@mui/lab';
//component
import Iconify from '../../../Components/User/iconify';
//util
import { fDateTime } from '../../../utils/formatTime';
//---------------------------------------------------------------

const OrderTimeLine = ({ orderInfo }) => {
  const orderStatus = [
    { icon: 'mdi-light:cart', text: 'ordered' },
    { icon: 'line-md:circle-to-confirm-circle-twotone-transition', text: 'confirmed' },
    { icon: 'noto:delivery-truck', text: 'delivering' },
    { icon: 'mdi:package-variant-closed-delivered', text: 'delivered' },
  ];

  let slicedArray = [];

  const index = orderStatus.findIndex((item) => item.text === orderInfo?.status);

  if (index !== -1) {
    slicedArray = orderStatus.slice(0, index + 1);
  } else {
    console.log('Không tìm thấy giá trị status trong mảng.');
  }

  return (
    <>
      <Typography variant="h6">History</Typography>
      <Box>
        <Timeline position="alternate">
          {slicedArray.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                {fDateTime(new Date())} {/* Thêm thời gian ở đây */}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color={index === 0 ? 'primary' : 'secondary'} variant={index === 0 ? undefined : 'outlined'}>
                  <Iconify icon={item.icon} />
                </TimelineDot>
                {index !== slicedArray.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="subtitle1" component="span">
                  {item.text}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </>
  );
};

OrderTimeLine.propTypes = {
  orderInfo: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(OrderTimeLine);
