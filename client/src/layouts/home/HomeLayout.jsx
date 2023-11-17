import { Outlet } from 'react-router-dom';
//@mui
import Header from './header/Header';
import Footer from './footer/Footer';
import { Box } from '@mui/material';
//component
import ChatBox from '../../section/@dashboard/chatbot/ChatBot';
//----------------------------------------------------

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
      <ChatBox />
    </div>
  );
};

export default HomeLayout;
