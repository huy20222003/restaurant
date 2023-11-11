import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styled from '@emotion/styled';
//@mui
import {
  Box,
  Paper,
  Rating,
  Stack,
  Typography,
  LinearProgress,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//context
import { useProduct, useReview } from '../../../hooks/context';
//-----------------------------------------

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const ReviewSumary = ({ productId }) => {
  const {
    reviewState: { reviews },
    handleGetAllReviewsByProduct,
  } = useReview();
  const {
    productsState: { product },
    handleGetOneProduct,
  } = useProduct();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await handleGetOneProduct(productId);
      } catch (error) {
        console.error('Error fetching Product:', error);
        // Xử lý lỗi theo cách bạn muốn
      }
    };

    fetchProduct();
  }, [handleGetOneProduct, productId]);

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

  const productRate5Star = reviews?.filter((review) => review?.rate === 5);

  const productRate4Star = reviews?.filter((review) => review?.rate === 4);

  const productRate3Star = reviews?.filter((review) => review?.rate === 3);

  const productRate2Star = reviews?.filter((review) => review?.rate === 2);

  const productRate1Star = reviews?.filter((review) => review?.rate === 1);

  return (
    <Paper elevation={2} sx={{ my: '2rem', p: '2rem 1rem' }}>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4rem',
        }}
      >
        <Stack sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '5rem' }}>{product?.rate}</Typography>
          <Box sx={{ display: 'flex' }}>
            <StyledRating
              name="rate"
              precision={0.1}
              value={product?.rate}
              readOnly
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
            <Typography variant="body1" sx={{ ml: '0.5rem' }}>
              {product?.rate}
            </Typography>
          </Box>
        </Stack>
        <Stack sx={{ gap: '0.5rem', width: '40%' }}>
          <Stack sx={{ gap: '0.5rem' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Typography variant="subtitle2">5</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  color="success"
                  value={productRate5Star.length}
                  sx={{ height: '0.3rem' }}
                />
              </Box>
              <Typography variant="subtitle2">
                {productRate5Star.length}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ gap: '0.5rem' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Typography variant="subtitle2">4</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  color="success"
                  value={productRate4Star.length}
                  sx={{ height: '0.3rem' }}
                />
              </Box>
              <Typography variant="subtitle2">
                {productRate4Star.length}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ gap: '0.5rem' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Typography variant="subtitle2">3</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  color="success"
                  value={productRate3Star.length}
                  sx={{ height: '0.3rem' }}
                />
              </Box>
              <Typography variant="subtitle2">
                {productRate3Star.length}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ gap: '0.5rem' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Typography variant="subtitle2">2</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  color="success"
                  value={productRate2Star.length}
                  sx={{ height: '0.3rem' }}
                />
              </Box>
              <Typography variant="subtitle2">
                {productRate2Star.length}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ gap: '0.5rem' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Typography variant="subtitle2">1</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  color="success"
                  value={productRate1Star.length}
                  sx={{ height: '0.3rem' }}
                />
              </Box>
              <Typography variant="subtitle2">
                {productRate1Star.length}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

ReviewSumary.propTypes = {
  productId: PropTypes.string,
};

export default ReviewSumary;
