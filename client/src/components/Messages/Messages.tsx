import MessageGroup from "@components/MessageGroup/MessageGroup";
import Message from "@components/Message/Message";
import { IMessage } from "@interfaces/entities";
import "./Messages.scss";
import { useEffect, useRef } from "react";

const Messages = ({
  messages,
  onReply,
}: {
  messages: IMessage[];
  onReply: (messageId: number, content: string) => void;
}) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="messages">
      <div className="messages__wrapper" ref={messagesRef}>
        {messages.map((message) => (
          // <MessageGroup img={messageGroup.img} messages={messageGroup.messages} isAuthor={messageGroup.isAuthor} />
          <Message key={message.id} message={message} onReply={onReply} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
