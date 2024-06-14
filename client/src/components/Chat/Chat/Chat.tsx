import ChatHeader from "@components/Chat/ChatHeader/ChatHeader";
import Messages from "@components/Messages/Messages";
import ChatInput from "@components/Chat/ChatInput/ChatInput";
import "./Chat.scss";
import { useParams } from "react-router-dom";
import { Attachment, Message } from "@components/Messages/Messages";
import messages from "@mocks/messages.json";
import attachments from "@mocks/attachments.json";

const mergeMessagesAndAttachments = (
  messages: Message[],
  attachments: Attachment[]
) => {
  const messagesWithAttachments = messages.map((message) => {
    const messageAttachments = attachments.filter(
      (attachment) => attachment.message_id === message.id
    );
    return {
      ...message,
      attachments: messageAttachments,
    };
  });
  return messagesWithAttachments;
};

const mergedMessages = mergeMessagesAndAttachments(messages, attachments);

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const currentMessages = mergedMessages.filter(
    (message) => String(message.chat_id) === chatId
  );

  return (
    <div className="chat">
      <ChatHeader name="Марк Автосервис" time="last seen recently" />
      <Messages messages={currentMessages} />
      <ChatInput />
    </div>
  );
};

export default Chat;
