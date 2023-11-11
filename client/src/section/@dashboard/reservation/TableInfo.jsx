//@mui
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
//util
import {fCurrency} from '../../../utils/formatNumber';
//---------------------------------------

const TableInfo = () => {
  return (
    <Paper sx={{ my: '1rem', p: '1rem' }} elevation={1}>
      <Typography variant="h6" sx={{mb: '1rem'}}>Table Info</Typography>
      <Stack sx={{ gap: '1rem' }}>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            component={'img'}
            src="/assets/images/reservation/table-empty.png"
            sx={{ width: '2rem', height: '2rem' }}
          ></Box>
          <Typography variant="subtitle1">Empty</Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            component={'img'}
            src="/assets/images/reservation/table-ordered.png"
            sx={{ width: '2rem', height: '2rem' }}
          ></Box>
          <Typography variant="subtitle1">Ordered</Typography>
        </Stack>
      </Stack>
      <Divider/>
      <Stack sx={{ py: '1rem', gap: '12px' }}>
          <Typography variant="h6">Price</Typography>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1">Normal</Typography>
            <Typography variant="subtitle2">
              {fCurrency(100000)}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1">VIP</Typography>
            <Typography variant="subtitle2">
            {fCurrency(500000)}
            </Typography>
          </Stack>
        </Stack>
    </Paper>
  );
};

export default TableInfo;
