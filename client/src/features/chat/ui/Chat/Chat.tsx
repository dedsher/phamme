import "./Chat.scss";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ChatHeader from "@features/chat/ui/ChatHeader/ChatHeader";
import Messages from "@features/chat/ui/Messages/Messages";
import MessageForm from "@features/chat/ui/MessageForm/MessageForm";
import useChat from "@features/chat/hooks/useChat";
import { TransactionForm } from "@features/transaction/ui/TransactionForm/TransactionForm";

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const {
    friend,
    localMessages,
    repliedMessage,
    onSendMessage,
    onSaveMessage,
    onReply,
    onEdit,
    setIsEdditing,
    isEditting,
    edittingMessage,
    onCancelEdit,
    onCancelReply,
    inputRef,
    isMessagesLoading,
    isFriendLoading,
  } = useChat(Number(chatId));
  const [isTransactionFormVisible, setIsTransactionFormVisible] = useState(false);

  const showTransactionModal = () => {
    setIsTransactionFormVisible(true);
  };

  const hideTransactionModal = () => {
    setIsTransactionFormVisible(false);
  };
  
  return (
    <div className="chat">
      {isFriendLoading ? <Spin /> : (
        <ChatHeader friend={friend} />
      )}
      {isMessagesLoading ? <Spin /> : (
        <Messages messages={localMessages} onReply={onReply} onEdit={onEdit} />
      )}
      <MessageForm
        inputRef={inputRef}
        onSendMessage={onSendMessage}
        onSaveMessage={onSaveMessage}
        onCancelReply={onCancelReply}
        repliedMessage={repliedMessage}
        onShowTransactionModal={showTransactionModal}
        edittingMessage={edittingMessage}
        onCancelEdit={onCancelEdit}
      />
      <TransactionForm isVisible={isTransactionFormVisible} onCancel={hideTransactionModal} recipient={friend} />
    </div>
  );
};

export default Chat;
