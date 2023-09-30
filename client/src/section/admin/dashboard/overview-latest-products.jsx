import { useNavigate } from 'react-router-dom';
//date format
import { formatDistanceToNow } from 'date-fns';
//propType
import PropTypes from 'prop-types';
//hero icon
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
//@mui
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from '@mui/material';
//--------------------------------------------------------------------------

const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('product-manage');
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Products" />
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const updatedAt = new Date(product?.updatedAt);
          const ago = formatDistanceToNow(updatedAt);

          return (
            <ListItem divider={hasDivider} key={product?._id}>
              <ListItemAvatar>
                {product?.image_url[0] ? (
                  <Box
                    component="img"
                    src={product?.image_url[0]}
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: 'neutral.200',
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={product?.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
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
          onClick={handleNavigate}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};

export default OverviewLatestProducts;
