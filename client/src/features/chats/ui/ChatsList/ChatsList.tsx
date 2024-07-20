import "./ChatsList.scss";
import { Empty, Spin } from "antd";
import ChatsItem from "@features/chats/ui/ChatsItem/ChatsItem";
import ReloadButton from "@shared/ui/ReloadButton/ReloadButton";
import { useChatList } from "@features/chats/hooks/useChatList";

const ChatsList = () => {
  const { chats, isChatsLoading, activeChat, handleChatClick } = useChatList();

  if (isChatsLoading) {
    return <Spin />;
  }

  return (
    <div className="chats-list">
      {isChatsLoading && <Spin />}
      {chats.length ? (
        chats.map((chat: any) => (
          <ChatsItem
            key={chat.id}
            chat={chat}
            isActive={activeChat === chat.id}
            handleClick={() => handleChatClick(chat.id, chat.friend_id)}
          />
        ))
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<ReloadButton />}
          imageStyle={{ height: 60 }}
        />
      )}
    </div>
  );
};

export default ChatsList;
