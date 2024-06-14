import MessageGroup from "@components/MessageGroup/MessageGroup";

import "./Messages.scss";
import Message from "@components/Message/Message";

export type Attachment = {
  message_id: number,
  type: string,
  url: string,
};


export type Message = {
  id: number,
  chat_id: number,
  sender_id: number,
  content: string,
  timestamp: string,
  status: string,
  reply_to?: number,
};

const Messages = ({messages}) => {
  return (
    <div className="messages">
      <div className="messages__wrapper">
        {messages.map((message) => (
          // <MessageGroup img={messageGroup.img} messages={messageGroup.messages} isAuthor={messageGroup.isAuthor} />
          <Message key={message.id} text={message.content} time={message.timestamp} isAuthor={message.sender_id === 1} replyTo={message.reply_to} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
