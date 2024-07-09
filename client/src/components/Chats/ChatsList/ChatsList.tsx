import ChatsItem from "@components/Chats/ChatsItem/ChatsItem";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserId } from "@hooks/useUserId";
import { useDispatch } from "@hooks/useRedux";
import { Empty, Spin } from "antd";
import "./ChatsList.scss";
import ReloadButton from "@components/ReloadButton/ReloadButton";
import { setCurrentFriendId } from "@store/features/friendSlice";
import { useGetUserChatsQuery } from "@store/apiSlice";

const ChatsList = () => {
  const currentChatId = useParams<{ chatId: string }>().chatId || null;
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useUserId();

  const { data: chats = [], isLoading } = useGetUserChatsQuery(userId);

  const handleChatClick = (chatId: number, userId: number) => {
    setActiveChat(chatId);
    navigate(`${chatId}`);
    dispatch(setCurrentFriendId(userId));
  };

  useEffect(() => {
    setActiveChat(Number(currentChatId) || null);
  }, [currentChatId]);

  return (
    <div className="chats-list">
      {isLoading && <Spin />}
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
