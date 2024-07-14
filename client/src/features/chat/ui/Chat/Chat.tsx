import ChatHeader from "@features/chat/ui/ChatHeader/ChatHeader";
import Messages from "@features/chat/ui/Messages/Messages";
import MessageForm from "@features/chat/ui/MessageForm/MessageForm";
import "./Chat.scss";
import useChat from "@entities/chat/hooks/useChat";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const {
    friend,
    localMessages,
    repliedMessage,
    onSendMessage,
    onReply,
    onCancelReply,
    inputRef,
  } = useChat(Number(chatId));
  
  return (
    <div className="chat">
      <ChatHeader friend={friend} />
      <Messages messages={localMessages} onReply={onReply} />
      <MessageForm
        inputRef={inputRef}
        onSendMessage={onSendMessage}
        onCancelReply={onCancelReply}
        repliedMessage={repliedMessage}
      />
    </div>
  );
};

export default Chat;
