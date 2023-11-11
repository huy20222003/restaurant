import styled from '@emotion/styled';
import { memo } from 'react';
import PropTypes from 'prop-types';
//@mui
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Stack,
  Rating,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//context
import { useCommon } from '../../hooks/context';
//---------------------------------------------------------------------

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const FormDialogReview = ({ fields, formik, handleSave, item }) => {
  const { openFormDialog, setOpenFormDialog } = useCommon();

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <Dialog open={openFormDialog} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
        Review
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box sx={{ p: '16px 0', width: '100%' }}>
            <Stack
              key={item?.product?.name}
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                my: '1rem',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    flexShrink: 0,
                    width: '80px',
                    height: '80px',
                    borderRadius: '4px',
                    border: '0.5px solid rgb(238, 238, 238)',
                    backgroundImage: `url(${item?.product?.image_url[0]})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    objectFit: 'cover',
                    position: 'relative',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      color: 'rgb(128, 128, 137)',
                      backgroundColor: 'rgb(235, 235, 240)',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopLeftRadius: '10px',
                    }}
                  >
                    x{item?.quantity}
                  </Typography>
                </Box>
                <Stack sx={{ mx: '12px' }}>
                  <Typography variant="body2">
                    {item?.product?.name}
                  </Typography>
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {item?.property?.size && (
                      <Typography
                        variant="caption"
                        sx={{ color: 'rgb(128, 128, 137)' }}
                      >
                        size: {item?.property?.size}
                      </Typography>
                    )}
                    {item?.property?.color && (
                      <Typography
                        variant="caption"
                        sx={{ color: 'rgb(128, 128, 137)' }}
                      >
                        color: {item?.property?.color}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Box>
              <Box>
                <Typography variant="body2">
                  {item?.product?.priceSale || item?.product?.price}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
        <Box>
          <Typography variant="subtitle1">Rate</Typography>
          <Box
            sx={{
              display: 'flex',
              my: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <StyledRating
              name="rate"
              precision={1}
              value={formik.values.rate}
              {...formik.getFieldProps('rate')}
              error={!!(formik.touched.rate && formik.errors.rate)}
              helperText={
                formik.touched.rate && formik.errors.rate
              }
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
            <Typography variant="body1" sx={{ ml: '0.5rem' }}>
              {formik.values.rate}
            </Typography>
          </Box>
        </Box>
        <Box>
          {fields.map((field, index) => (
            <TextField
              key={index}
              autoFocus={index === 0}
              margin="dense"
              fullWidth
              {...field}
              value={formik.values[field.name] || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched[field.name] && formik.errors[field.name])}
              helperText={
                formik.touched[field.name] && formik.errors[field.name]
              }
              required
              multiline
              rows={field.row}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="large"
          sx={{ color: 'red', borderColor: 'red' }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button variant="contained" size="large" onClick={handleSave}>
          Add Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialogReview.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      row: PropTypes.number,
    })
  ).isRequired,
  formik: PropTypes.object,
  handleSave: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default memo(FormDialogReview);
