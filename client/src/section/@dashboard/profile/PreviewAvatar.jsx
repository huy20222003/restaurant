import { memo } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
//@mui
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
//sweetalert
import Swal from 'sweetalert2';
//context
import { useUser } from '../../../hooks/context';
//------------------------------------------------------

const PreviewAvatar = ({ previewAvatar, open, setOpen, avatarUpdate }) => {
  const { handleUpdateAvatar } = useUser();

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      if (!avatarUpdate) {
        Swal.fire('', 'Please upload an avatar before saving.', 'error');
        return;
      } else {
        const updateData = await handleUpdateAvatar({ avatarUpdate });

        if (!updateData.success) {
          Swal.fire('', 'Error updating avatar.', 'error');
        } else {
          Swal.fire('', 'Avatar updated successfully!', 'success');
        }
        handleClose();
      }
    } catch (error) {
      Swal.fire('', 'Server Error', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>{'Preview Avatar'}</DialogTitle>
      <DialogContent sx={{ px: '4.5rem' }}>
        <Avatar
          src={previewAvatar}
          alt="Avatar"
          sx={{ width: '7rem', height: '7rem', mt: '1rem' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleUpdate} autoFocus variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Define PropTypes for your component
PreviewAvatar.propTypes = {
  previewAvatar: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  avatarUpdate: PropTypes.string,
};

export default memo(PreviewAvatar);
