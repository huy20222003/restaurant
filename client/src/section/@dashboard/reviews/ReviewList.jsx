import PropTypes from 'prop-types';
import { useEffect } from 'react';
//@mui
import { Box, Typography } from '@mui/material';
//component
import ReviewItem from './ReviewItem';
//context
import { useReview } from '../../../hooks/context';
//-----------------------------------------------------

const ReviewList = ({ productId }) => {
  const {
    reviewState: { reviews },
    handleGetAllReviewsByProduct,
  } = useReview();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await handleGetAllReviewsByProduct(productId);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Xử lý lỗi theo cách bạn muốn
      }
    };

    fetchReviews();
  }, [handleGetAllReviewsByProduct, productId]);

  return (
    <Box>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))
      ) : (
        <Typography variant="body1">There are no reviews yet.</Typography>
      )}
    </Box>
  );
};

ReviewList.propTypes = {
  productId: PropTypes.string,
};

export default ReviewList;
