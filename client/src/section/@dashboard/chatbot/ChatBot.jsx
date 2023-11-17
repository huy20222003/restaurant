import { useEffect } from 'react';

const ChatBox = () => {
  useEffect(() => {
    // Thêm style vào head của trang web
    const style = document.createElement('style');
    style.innerHTML = `
      df-messenger {
        --df-messenger-bot-message: #878fac;
        --df-messenger-button-titlebar-color: #df9b56;
        --df-messenger-chat-background-color: #fafafa;
        --df-messenger-font-color: white;
        --df-messenger-send-icon: #878fac;
        --df-messenger-user-message: #479b3d;
      }
    `;
    document.head.appendChild(style);

    // Thêm script vào body của trang web
    const script = document.createElement('script');
    script.src =
      'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup khi component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <df-messenger
      chat-title="Goc Bep Nho"
      agent-id="6d779a01-ea78-4d33-b352-e2b86a7f836c"
      language-code="en"
      chat-icon="/assets/images/Logo/logo.jpg"
    ></df-messenger>
  );
};

export default ChatBox;
