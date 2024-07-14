import ChatsItem from "@features/chats/ui/ChatsItem/ChatsItem";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserId } from "@entities/user/hooks/useUserId";
import { useDispatch } from "@shared/hooks/useRedux";
import { Empty, Spin } from "antd";
import "./ChatsList.scss";
import ReloadButton from "@shared/ui/ReloadButton/ReloadButton";
import { setCurrentFriendId } from "@store/features/friendSlice";
import useSocket from "@shared/sockets/socket";
import { useGetUserChatsQuery } from "@entities/chat/api/chatApi";

const ChatsList = () => {
  const currentChatId = useParams<{ chatId: string }>().chatId || null;
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useUserId();
  const socket = useSocket()!;

  const {
    data: chats = [],
    isLoading: isChatsSuccess,
    refetch: refetchChats,
  } = useGetUserChatsQuery(userId);

  const handleChatClick = (chatId: number, userId: number) => {
    setActiveChat(chatId);
    navigate(`${chatId}`);
    dispatch(setCurrentFriendId(userId));
  };

  useEffect(() => {
    setActiveChat(Number(currentChatId) || null);
  }, [currentChatId]);

  useEffect(() => {
    if (!isChatsSuccess) {
      chats.forEach((chat: any) => {
        socket.emit("join room", chat.id);
      });

      const handleNewMessage = (message: any) => {
        refetchChats();
        console.log("new message", message);
      };

      socket.on("new message", handleNewMessage);

      return () => {
        chats.forEach((chat: any) => {
          socket.emit("leave room", chat.id);
        });
        socket.off("new message", handleNewMessage);
      };
    }
  }, [chats, isChatsSuccess, refetchChats]);

  if (isChatsSuccess) {
    return <Spin />;
  }

  return (
    <div className="chats-list">
      {isChatsSuccess && <Spin />}
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
