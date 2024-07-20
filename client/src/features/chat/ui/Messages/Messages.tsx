import "./Messages.scss";
import { useEffect, useRef } from "react";
import MessageGroup from "@features/chat/ui/MessageGroup/MessageGroup";
import { IMessage } from "@interfaces/entities";
import { useUserId } from "@entities/user/hooks/useUserId";

interface IMessageGroup {
  messages: IMessage[];
  isAuthor: boolean;
}

const messagesToGroups = (messages: IMessage[], userId: number) => {
  const groups: IMessageGroup[] = [];
  let currentGroup: IMessageGroup = { messages: [], isAuthor: false };

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
  onEdit,
}: {
  messages: IMessage[];
  onReply: (messageId: number, content: string, author: string) => void;
  onEdit: (messageId: number, content: string) => void;
}) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const userId = useUserId();

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const messageGroups = messagesToGroups(messages, userId);

  return (
    <div className="messages">
      <div className="messages__wrapper" ref={messagesRef}>
        {messageGroups.map((messageGroup) => (
          <MessageGroup
            key={`group-${messageGroup.messages[0]?.id}`}
            messages={messageGroup.messages}
            isAuthor={messageGroup.isAuthor}
            onReply={onReply}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Messages;
