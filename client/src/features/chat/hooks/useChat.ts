import { useEffect, useRef, useState } from "react";
import { useSelector } from "@shared/hooks/useRedux";
import { useSocket } from "@shared/sockets/socketContext";
import {
  useGetChatMessagesQuery,
  useGetChatAttachmentsQuery,
  useSendMessageMutation,
  useSaveMessageMutation,
} from "@features/chat/model/chatApi";
import {
  useGetUserProfileQuery,
} from "@entities/user/model/userApi";
import { useUserId } from "@entities/user/hooks/useUserId";
import { mergeMessages } from "@utils/helpers";

const useChat = (chatId: number) => {
  const currentFriendId = useSelector((state) => state.friend.currentFriendId)!;
  const myId = useUserId();
  const [repliedMessage, setRepliedMessage] = useState<any>(null);
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const inputRef = useRef<any>(null);
  const [isEditting, setIsEdditing] = useState(false);
  const [edittingMessage, setEdittingMessage] = useState<any>(null);
  const socket = useSocket();

  const {
    data: messages = [],
    refetch: refetchMessages,
    isSuccess: isMessagesSuccess,
    isLoading: isMessagesLoading,
  } = useGetChatMessagesQuery(chatId);

  const {
    data: attachments = [],
    refetch: refetchAttachments,
    isSuccess: isAttachmentsSuccess,
    isLoading: isAttachmentsLoading,
  } = useGetChatAttachmentsQuery(chatId);

  const { data: friend = {}, refetch: refetchFriend, isSuccess: isFriendSuccess } =
  useGetUserProfileQuery(currentFriendId);

  const isChatMessagesLoading = isMessagesLoading || isAttachmentsLoading;
  const isChatMessagesSuccess = isMessagesSuccess && isAttachmentsSuccess;
  const isFriendLoading = !isFriendSuccess;

  const [sendMessage] = useSendMessageMutation();
  const [saveMessage] = useSaveMessageMutation();

  useEffect(() => {
    refetchMessages();
    refetchAttachments();
  }, [chatId]);

  useEffect(() => {
    if (isChatMessagesLoading || !isChatMessagesSuccess) return;
    const mergedMessages = mergeMessages(messages, attachments);
    setLocalMessages(mergedMessages);
  }, [
    isChatMessagesLoading,
    isChatMessagesSuccess,
    messages,
    attachments,
    chatId,
  ]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join active room", { roomId: chatId, userId: myId });

    return () => {
      socket.emit("leave active room", { roomId: chatId, userId: myId });
    };
  }, [chatId, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on("new message", (message) => {
      if (message?.updated) {
        if (message.chat_id !== chatId) return;
      } else {
        if (message.message.chat_id !== chatId) return;
      }
      refetchMessages();
      refetchAttachments();
    });
  }, [chatId, socket, refetchMessages, refetchAttachments]);

  useEffect(() => {
    if (isFriendSuccess && socket) {
      const handleUserStatusUpdated = (userId: number, status: string) => {
        refetchFriend();
      };

      socket.on("user status updated", handleUserStatusUpdated);
    }
  }, [isFriendSuccess, socket, refetchFriend]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message read", (messageChatId) => {
      if (messageChatId !== chatId) return;
      refetchMessages();
      refetchAttachments();
    });
  }, [chatId, socket, refetchMessages, refetchAttachments]);

  const markMessagesAsRead = () => {
    if (!socket) return;
    localMessages.forEach((message) => {
      if (message.sender_id !== myId && message.status !== "read") {
        socket.emit("message read", message.id);
      }
    });
  };

  useEffect(() => {
    if (localMessages.length) {
      markMessagesAsRead();
    }
  }, [localMessages]);

  // useEffect(() => {
  //   return () => {
  //     if (socket) {
  //       socket.off("new message");
  //       socket.off("message read");
  //     }
  //   }
  // }, [])

  const getRoomUserCount = (roomId: string) => {
    return new Promise((resolve) => {
      socket!.emit("get room users count", roomId, (userCount: any) => {
        resolve(userCount);
      });
    });
  };

  const onSendMessage = async (
    content: string,
    replyTo: number | null,
    attachments: File[] | null
  ) => {
    const isFriendInChat = await getRoomUserCount(`room-${chatId}`).then(
      (count) => count === 2
    );
    const formData = new FormData();
    formData.append(
      "message",
      JSON.stringify({
        chat_id: chatId,
        sender_id: myId,
        content,
        created_at: new Date().toISOString(),
        reply_to: replyTo,
        status: isFriendInChat ? "read" : "delivered",
      })
    );
    if (attachments) {
      attachments.forEach((file) => {
        formData.append(`attachments`, file);
      });
    }

    sendMessage({ chatId, formData });
  };

  const onSaveMessage = (content: string, messageId: number) => {
    setEdittingMessage(null);
    setIsEdditing(false);

    saveMessage({id: messageId, chatId, content});
  };

  const onReply = (messageId: number, content: string, author: string) => {
    setRepliedMessage({ replyTo: messageId, replyToName: author, content });
    inputRef.current?.focus();
  };

  const onEdit = (messageId: number, content: string) => {
    setIsEdditing(true);
    setRepliedMessage(null);
    setEdittingMessage({ messageId, content });
    inputRef.current.focus();
  }

  const onCancelReply = () => {
    setRepliedMessage(null);
  };

  const onCancelEdit = () => {
    setIsEdditing(false);
    setEdittingMessage(null);
  }

  return {
    friend,
    localMessages,
    repliedMessage,
    onSendMessage,
    onSaveMessage,
    onReply,
    onEdit,
    setIsEdditing,
    isEditting,
    edittingMessage,
    onCancelEdit,
    onCancelReply,
    inputRef,
    isMessagesLoading,
    isFriendLoading,
  };
};

export default useChat;
