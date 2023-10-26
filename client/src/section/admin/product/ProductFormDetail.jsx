import PropTypes from 'prop-types';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Import ClassicEditor from the CKEditor build

const ProductFormDetail = ({ formik }) => {
  const { values, setFieldValue, errors, touched } = formik;

  return (
    <>
      <Stack sx={{ gap: '24px', padding: '24px' }}>
        <TextField
          required
          name="name"
          label="Product Name"
          fullWidth
          value={values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          required
          name="subDescription"
          label="Sub Description"
          fullWidth
          multiline
          rows={4}
          value={values.subDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!(formik.touched.subDescription && formik.errors.subDescription)}
          helperText={formik.touched.subDescription && formik.errors.subDescription}
        />
      </Stack>
      <Stack sx={{ gap: '12px', p: '1rem' }}>
        <Typography variant="subtitle2">Content</Typography>
        <Box
          sx={{
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '8px',
            border: '1px solid rgba(145, 158, 171, 0.2)',
          }}
        >
          <CKEditor
            editor={ClassicEditor}
            data={values.description} 
            onReady={(editor) => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFieldValue('description', data); 
            }}
          />
          {touched.description && errors.description && (
            <span style={{ color: 'red' }}>{errors.description}</span>
          )}
        </Box>
      </Stack>
    </>
  );
};

ProductFormDetail.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default ProductFormDetail;
