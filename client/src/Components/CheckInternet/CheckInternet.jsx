import { useEffect } from "react";
//toast
import { toast } from 'react-toastify';
//@mui icon
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
//---------------------------------------------

const CheckInternet = () => {
  const handleOnline = () => {
    toast.success('Internet connected', {
      position: "top-right",
      icon: <WifiIcon />, 
      style: { color: '#54D62C' },
    });
  };

  const handleOffline = () => {
    toast.error('Internet disconnected', {
      position: "top-right",
      icon: <WifiOffIcon />,
      style: { color: '#FF4842' }, 
    });
  };

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return null;
};

export default CheckInternet;
