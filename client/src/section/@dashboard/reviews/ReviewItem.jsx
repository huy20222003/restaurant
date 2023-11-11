import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
//@mui
import { Avatar, Box, Paper, Rating, Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//context
import { useUser, useOrder } from '../../../hooks/context';
//util
import { fDateTime } from '../../../utils/formatTime';
//----------------------------------------------------

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const ReviewItem = ({ review }) => {
  
  const {handleGetOneUser} = useUser();
  const {handleGetOneOrder} = useOrder();
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const responseUser = await handleGetOneUser(review?.userId);
        const responseOrder = await handleGetOneOrder(review?.orderId);
        setUser(responseUser.user);
        setOrder(responseOrder.order);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Xử lý lỗi theo cách bạn muốn
      }
    };

    fetchReviews();
  }, [handleGetOneUser, review?.userId]);

  return (
    <Paper elevation={2} sx={{ p: '1rem', my: '1rem' }}>
      <Stack sx={{ gap: '0.75rem', alignItems: 'flex-start' }}>
        <Stack sx={{ flexDirection: 'row', gap: '0.5rem' }}>
          <Avatar src="/assets/images/avatars/avatar_2.jpg"></Avatar>
          <Stack sx={{ gap: '0.25rem', alignItems: 'flex-start' }}>
            <Typography variant="body2">{user?.username}</Typography>
            <Box sx={{ display: 'flex' }}>
              <StyledRating
                name="rate"
                precision={0.1}
                value={review?.rate}
                readOnly
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
              <Typography variant="body1" sx={{ ml: '0.5rem' }}>
                {review?.rate}
              </Typography>
            </Box>
            <Stack sx={{ gap: '0.25rem', flexDirection: 'row' }}>
              <Typography variant="body2">
                {fDateTime(review?.createdAt)} |{' '}
              </Typography>
              {order?.items?.property?.size && <Typography variant="body2">size: {order?.items?.property?.size}</Typography>}
              {order?.items?.property?.color && <Typography variant="body2">color: {order?.items?.property?.color}</Typography>}
            </Stack>
          </Stack>
        </Stack>
        <Typography>{review?.review}</Typography>
      </Stack>
    </Paper>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.shape({
    rate: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewItem;
