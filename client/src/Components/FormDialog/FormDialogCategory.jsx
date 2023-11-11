import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ButtonBase,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCommon } from '../../hooks/context';
import { useDropzone } from 'react-dropzone';

const CategoryFormImageItem = ({ imageUrl, handleDeleteImage }) => {
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: '4px',
        width: '80px',
        height: '80px',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(145, 158, 171, 0.16)',
      }}
    >
      <Stack
        component={'span'}
        sx={{
          flexShrink: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component={'img'}
          src={imageUrl}
          sx={{
            width: '100%',
            height: '100%',
            flexShrink: 0,
            objectFit: 'cover',
            position: 'absolute',
          }}
        ></Box>
      </Stack>
      <ButtonBase
        sx={{
          position: 'absolute',
          top: '0.25rem',
          right: '0.25rem',
          p: '0.25rem',
          color: 'rgb(255, 255, 255)',
          backgroundColor: 'rgba(22, 28, 36, 0.48)',
          fontSize: '1.125rem',
          borderRadius: '50%',
        }}
        onClick={handleDeleteImage}
      >
        <CloseIcon sx={{ width: '1rem', height: '1rem' }} />
      </ButtonBase>
    </Stack>
  );
};

const CategoryFormImage = ({ formik }) => {
  const { setFieldValue } = formik;
  const [imageUrl, setImageUrl] = useState('');

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = () => {
      setFieldValue('imageUrl', reader.result);
      setImageUrl(URL.createObjectURL(file));
    };
    reader.onerror = () => {
      console.error('Error occurred while reading the file.');
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  return (
    <>
      <Stack sx={{ gap: '12px', p: '1rem' }}>
        <Typography variant="subtitle2">Images</Typography>
        <Box sx={{ width: '100%', position: 'relative' }}>
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <Stack
              sx={{
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component={'img'}
                sx={{ width: '50%', height: '50%', maxWidth: '100px' }}
                src="/assets/images/chooseFile.svg"
              ></Box>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography variant="h6">Drop or Select file</Typography>
                <Typography variant="body2">
                  Drop files here or click browse through your machine
                </Typography>
              </Stack>
            </Stack>
          </div>
          {imageUrl && (
            <Box
              sx={{
                my: '1.5rem',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                flex: 1,
              }}
            >
              <CategoryFormImageItem imageUrl={imageUrl} handleDeleteImage={() => setImageUrl('')} />
            </Box>
          )}
        </Box>
      </Stack>
    </>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '8px',
  padding: '40px',
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: 'rgba(145, 158, 171, 0.08)',
  transition:
    'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
};

CategoryFormImage.propTypes = {
  formik: PropTypes.object,
};

CategoryFormImageItem.propTypes = {
  imageUrl: PropTypes.string,
  handleDeleteImage: PropTypes.func,
};

const FormDialogCategory = ({ fields, formik, isEdit }) => {
  const { openFormDialog, setOpenFormDialog } = useCommon();

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <Dialog open={openFormDialog} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem' }}>
        {isEdit ? 'Update category' : 'Add category'}
      </DialogTitle>
      <DialogContent>
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
            error={formik.touched[field.name] && formik.errors[field.name]}
            helperText={formik.touched[field.name] && formik.errors[field.name]}
            required
          />
        ))}

        <CategoryFormImage formik={formik} />
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
        <Button variant="contained" size="large" onClick={formik.handleSubmit}>
          {isEdit ? 'Update category' : 'Add category'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialogCategory.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      row: PropTypes.number,
    })
  ).isRequired,
  formik: PropTypes.object,
  isEdit: PropTypes.string.isRequired,
};

export default FormDialogCategory;
