import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import {
  OverviewTotalQuantity,
  OverviewLatestOrders,
  OverviewLatestProducts,
  OverviewSales,
  OverviewTotalOrder,
  OverviewTotalCustomers,
  OverviewTotalProfit,
  OverviewTraffic,
  AppWebsiteVisits,
} from '../../../section/admin/dashboard';
//context hook
import {
  useProduct,
  useOrder,
  usePayment,
  useUser,
} from '../../../hooks/context';
//utils
import { fCurrency } from '../../../utils/formatNumber';
//moment
import { parse } from 'date-fns';
//------------------------------------------------------------------

const AdminDashboard = () => {
  const {
    productsState: { products },
    handleGetAllProducts,
  } = useProduct();

  const {
    ordersState: { orders },
    handleGetAllOrders,
  } = useOrder();
  const {
    paymentState: { payments },
    handleGetAllPayments,
  } = usePayment();
  const {
    usersState: { users },
    handleGetAllUser,
  } = useUser();

  useEffect(() => {
    handleGetAllPayments();
  }, [handleGetAllPayments]);

  useEffect(() => {
    handleGetAllProducts();
  }, [handleGetAllProducts]);

  useEffect(() => {
    handleGetAllOrders();
  }, [handleGetAllOrders]);

  useEffect(() => {
    handleGetAllUser();
  }, [handleGetAllUser]);

  const profitArr = payments.filter((payment) => payment.status == 'success');

  const profit = profitArr.reduce((total, curr) => {
    return total + curr.amount;
  }, 0);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const lastMonth = currentDate.getMonth();

  const usersInCurrentMonth = users.filter((user) => {
    const createdAtDate = parse(
      user.createdAt,
      "EEE MMM dd yyyy HH:mm:ss 'GMT'xxxx",
      new Date()
    );
    const createdAtMonth = createdAtDate.getMonth() + 1;
    return createdAtMonth === currentMonth;
  });

  const usersInLastMonth = users.filter((user) => {
    const createdAtDate = parse(
      user.createdAt,
      "EEE MMM dd yyyy HH:mm:ss 'GMT'xxxx",
      new Date()
    );
    const createdLastMonth = createdAtDate.getMonth();
    return createdLastMonth === lastMonth;
  });

  const difference = isNaN(
    (usersInCurrentMonth.length / usersInLastMonth.length) * 100
  )
    ? (usersInCurrentMonth.length / usersInLastMonth.length) * 100
    : '0';

  const ordersArr = orders.filter((order)=>order.status !== 'cancelled');

  const totalQuantity = ordersArr.reduce((total, curr)=> {
    const items = curr.items.reduce((total, curr)=> {
      return total + curr.quantity
    }, 0);
    return total + items;
  }, 0);

  return (
    <>
      <Helmet>
        <title>Overview</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalQuantity
                difference={12}
                positive
                sx={{ height: '100%' }}
                value={totalQuantity}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={difference}
                positive={usersInCurrentMonth > usersInLastMonth ? true : false}
                sx={{ height: '100%' }}
                value={users.length}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalOrder
                sx={{ height: '100%' }}
                value={orders.length}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit
                sx={{ height: '100%' }}
                value={fCurrency(profit) + 'đ'}
              />
            </Grid>
            <Grid xs={12} lg={12}>
              <OverviewSales
                chartSeries={[
                  {
                    name: 'This month',
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: 'Last month',
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={['Desktop', 'Tablet', 'Phone']}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title="Website Visits"
                subheader="(+43%) than last year"
                chartLabels={[
                  '01/01/2003',
                  '02/01/2003',
                  '03/01/2003',
                  '04/01/2003',
                  '05/01/2003',
                  '06/01/2003',
                  '07/01/2003',
                  '08/01/2003',
                  '09/01/2003',
                  '10/01/2003',
                  '11/01/2003',
                ]}
                chartData={[
                  {
                    name: 'Viet Nam',
                    type: 'column',
                    fill: 'solid',
                    data: [
                      2300, 1100, 2200, 2723, 1332, 2245, 3721, 2156, 4467,
                      2232, 3054,
                    ],
                  },
                  {
                    name: 'USA',
                    type: 'area',
                    fill: 'gradient',
                    data: [
                      4443, 5543, 4165, 7667, 2872, 4983, 9821, 4991, 5766,
                      2877, 4973,
                    ],
                  },
                  {
                    name: 'Orther',
                    type: 'line',
                    fill: 'solid',
                    data: [
                      3405, 6525, 3765, 3760, 8459, 3435, 5634, 5532, 2159,
                      3546, 3649,
                    ],
                  },
                ]}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <OverviewLatestProducts
                products={products}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <OverviewLatestOrders orders={orders} sx={{ height: '50%' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AdminDashboard;
