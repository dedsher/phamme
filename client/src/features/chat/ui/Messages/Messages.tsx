import MessageGroup from "@features/chat/ui/MessageGroup/MessageGroup";
import Message from "@features/chat/ui/Message/Message";
import { IMessage } from "@interfaces/entities";
import "./Messages.scss";
import { useEffect, useRef } from "react";
import { useUserId } from "@entities/user/hooks/useUserId";

interface IMessageGroup {
  messages: IMessage[];
  isAuthor: boolean;
}

const messagesToGroups = (messages: IMessage[]) => {

  const groups: IMessageGroup[] = [];
  let currentGroup: IMessageGroup = { messages: [], isAuthor: false };
  const userId = useUserId();

  for (let i = 0; i < messages.length; i++) {
    const currentMessage = messages[i];
    const previousMessage = messages[i - 1];

    if (
      previousMessage &&
      (currentMessage.sender_id !== previousMessage.sender_id ||
        new Date(currentMessage.created_at).getTime() -
          new Date(previousMessage.created_at).getTime() >
          5 * 60 * 1000)
    ) {
      groups.push(currentGroup);
      currentGroup = { messages: [], isAuthor: false };
    }

    currentGroup.messages.push(currentMessage);
    currentGroup.isAuthor = currentMessage.sender_id === userId;
  }

  groups.push(currentGroup);

  return groups;
};

const Messages = ({
  messages,
  onReply,
}: {
  messages: IMessage[];
  onReply: (messageId: number, content: string, author: string) => void;
}) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const messageGroups = messagesToGroups(messages);

  return (
    <div className="messages">
      <div className="messages__wrapper" ref={messagesRef}>
        {messageGroups.map((messageGroup) => (
          <MessageGroup messages={messageGroup.messages} isAuthor={messageGroup.isAuthor} onReply={onReply} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
