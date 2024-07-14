import Message from "@features/chat/ui/Message/Message";
import "./MessageGroup.scss";
import { IMessage } from "@interfaces/entities";

const MessageGroup = ({
  messages,
  isAuthor,
  onReply,
}: {
  messages: IMessage[];
  isAuthor: boolean;
  onReply: (messageId: number, content: string, author: string) => void;
}) => {
  return (
    <div className="message-group">
      <div className="message-group__avatar">
        <img src={messages[0]?.sender_avatar_url} alt="Аватар пользователя" />
      </div>
      <div className="message-group__list">
        {messages.map((message) => (
          <Message key={message.id} message={message} onReply={onReply} />
        ))}
      </div>
    </div>
  );
};


export default MessageGroup;
