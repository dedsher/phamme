import Chats from "@features/chats/ui/Chats/Chats";
import "./ChatLayout.scss";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  return (
    <div className="chat-layout">
      <Chats />
      <Outlet />
    </div>
  );
};

export default ChatLayout;
