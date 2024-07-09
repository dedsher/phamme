import ChatHeader from "@components/Chat/ChatHeader/ChatHeader";
import Messages from "@components/Messages/Messages";
import MessageForm from "@components/Chat/MessageForm/MessageForm";
import "./Chat.scss";
import useChat from "@hooks/useChat";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const {
    friend,
    messages,
    repliedMessage,
    onSendMessage,
    onReply,
    onCancelReply,
  } = useChat(Number(chatId));
  
  return (
    <div className="chat">
      <ChatHeader friend={friend} />
      <Messages messages={messages} onReply={onReply} />
      <MessageForm
        onSendMessage={onSendMessage}
        onCancelReply={onCancelReply}
        repliedMessage={repliedMessage}
      />
    </div>
  );
};

export default Chat;
