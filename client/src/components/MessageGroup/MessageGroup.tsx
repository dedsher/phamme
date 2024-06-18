import Message from "@components/Message/Message";
import "./MessageGroup.scss";

const MessageGroup = ({
  img,
  messages,
  isAuthor,
}: {
  img: string;
  messages: {
    text: string;
    time: string;
    replyTo?: string;
    attachments?: {
      type: string;
      url: string;
      width: number;
      height: number;
    }[];
  }[];
  isAuthor: boolean;
}) => {
  return (
    <div className="message-group">
      <div className="message-group__avatar">
        <img src={img} alt="Аватар пользователя" />
      </div>
      <div className="message-group__list">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            time={message.time}
            isAuthor={isAuthor}
            replyTo={message.replyTo}
            attachments={message.attachments}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageGroup;
