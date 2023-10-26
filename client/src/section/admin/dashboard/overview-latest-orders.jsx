import PropTypes from 'prop-types';
//@mui
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
//component
import Scrollbar from '../../../Components/User/scrollbar';
import { SeverityPill } from '../../../Components/Admin/severity-pill/severity-pill';
//util
import { fDateTime } from '../../../utils/formatTime';
//-----------------------------------------------------------------------------------

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error',
};

const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  const filterOrders = orders.slice(orders.length - 10);

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>FullName</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Ship Address</TableCell>
                <TableCell>Total Prices</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Shipping Fee</TableCell>
                <TableCell>Shipping Unit</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell sortDirection="desc">Order Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterOrders.map((order) => {
                const createdAt = fDateTime(order?.createdAt);

                return (
                  <TableRow hover key={order.id}>
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>{order?.fullName}</TableCell>
                    <TableCell>{order?.phoneNumber}</TableCell>
                    <TableCell>{order?.shipAddress}</TableCell>
                    <TableCell>{order?.totalPrices}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status[order?.status.length - 1]}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>{order?.shippingFee}</TableCell>
                    <TableCell>{order?.shippingUnit}</TableCell>
                    <TableCell>{order?.paymentMethod}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.propTypes = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};

export default OverviewLatestOrders;
