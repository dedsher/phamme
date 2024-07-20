import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUserId } from "@entities/user/hooks/useUserId";
import { useSocket } from "@shared/sockets/socketContext";
import { useGetUserChatsQuery } from "@features/chat/model/chatApi";
import { setCurrentFriendId } from "@features/chat/model/friendSlice";

export const useChatList = () => {
  const currentChatId = useParams<{ chatId: string }>().chatId || null;
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useUserId();
  const socket = useSocket();
  const connectedRooms = useRef<Set<number>>(new Set());

  const {
    data: chats = [],
    isLoading: isChatsLoading,
    isSuccess: isChatsSuccess,
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
    console.log("isChatsSuccess", isChatsSuccess);
    if (isChatsSuccess && socket) {
      const chatIds = new Set(chats.map((chat: any) => String(chat.id)));

      chatIds.forEach((chatId: any) => {
        if (connectedRooms.current.has(chatId)) return;
        socket.emit("join room", chatId);
        console.log("join room", chatId);
        connectedRooms.current.add(chatId);
      });
    }
  }, [isChatsSuccess, socket, chats, userId]);

  useEffect(() => {
    if (isChatsSuccess && socket) {
      const handleUserStatusUpdated = (userId: number, status: string) => {
        refetchChats();
      };

      socket.on("user status updated", handleUserStatusUpdated);
    }
  }, [isChatsSuccess, socket, refetchChats]);

  useEffect(() => {
    if (isChatsSuccess && socket) {
      const handleNewMessage = (message: any) => {
        console.log("new message", message);
        refetchChats();
      };

      socket.on("new message", handleNewMessage);
    }
  }, [currentChatId, isChatsSuccess, socket, refetchChats]);

  useEffect(() => {
    if (isChatsSuccess && socket) {
      const handleMessageRead = (message: any) => {
        refetchChats();
      };

      socket.on("message read", handleMessageRead);
    }
  }, [isChatsSuccess, socket, refetchChats]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.off("user status updated");
        socket.off("new message");
        socket.off("message read");
        connectedRooms.current.forEach((chatId: any) => {
          socket.emit("leave room", chatId);
          connectedRooms.current.delete(chatId);
        });
      }
    };
  }, []);

  return {
    chats,
    isChatsLoading,
    activeChat,
    handleChatClick,
  };
};
