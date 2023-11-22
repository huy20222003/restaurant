//@mui
import { Box, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

//---------------------------------------

const AccountCoin = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '2rem',
        borderRadius: '0.25rem',
        backgroundColor: '#919EAB',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem',
      }}
    >
      <MonetizationOnIcon />
      <Typography variant="subtitle1" sx={{ml: '0.5rem'}}>9999999</Typography>
    </Box>
  );
};

export default AccountCoin;
