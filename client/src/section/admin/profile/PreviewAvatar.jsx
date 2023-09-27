import { memo } from 'react';
//@mui
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
//toast
import { toast } from 'react-toastify';
//context
import { useUser } from '../../../hooks/context';

//------------------------------------------------------

const PreviewAvatar = ({ previewAvatar, open, setOpen, avatarUpdate }) => {
  const { handleUpdateAvatar } = useUser();

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = async ()=> {
    try {
        const updateData = await handleUpdateAvatar({avatarUpdate});
        if(!updateData.success) {
            toast.error('Error update avatar');
        } else {
            toast.success('Update avatar successfull!');
        }
        handleClose();
    } catch (error) {
        toast.error('Server Error');
    }
  }

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

export default memo(PreviewAvatar);
