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
//icon
import Iconify from '../../../Components/User/iconify';
//---------------------------------------------

const OrderTimeLine = () => {
  const status = [
    { time: '9:30 am', icon: 'mdi-light:cart', text: 'Ordered' },
    { time: '10:00 am', icon: 'line-md:circle-to-confirm-circle-twotone-transition', text: 'Confirmed' },
    { time: '10:00 am', icon: 'noto:delivery-truck', text: 'Delivering' },
    { time: '10:00 am', icon: 'mdi:package-variant-closed-delivered', text: 'Delivered' },
  ];
  console.log(status);
  return (
    <>
      <Typography variant="h6">History</Typography>
      <Box>
        <Timeline position="alternate">
          {status.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                variant="body2"
                color="text.secondary"
              >
                {item.time}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot
                  color={index === 0 ? 'primary' : 'secondary'}
                  variant={index === 0 ? undefined : 'outlined'}
                >
                  <Iconify icon={item.icon} />
                </TimelineDot>
                {index !== status.length - 1 && <TimelineConnector />}
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

export default OrderTimeLine;
