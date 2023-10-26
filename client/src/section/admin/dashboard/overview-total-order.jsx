import PropTypes from 'prop-types';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
//--------------------------------------------------------

const OverviewTotalOrder = (props) => {
  const { sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Total order
            </Typography>
            <Typography variant="h4">
              24.6k
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <AddShoppingCartIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalOrder.propTypes = {
  sx: PropTypes.object
};

export default OverviewTotalOrder;