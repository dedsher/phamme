import { useUserId } from "@hooks/useUserId";
import { useSelector } from "./useRedux";
import { useEffect, useState } from "react";
import socket from "@sockets/socket";
import {
  useGetChatMessagesQuery,
  useGetUserQuery,
  useSendMessageMutation,
} from "@store/apiSlice";

interface RepliedMessage {
  replyTo: number;
  content: string;
}

const useChat = (chatId: number) => {
  const currentFriendId = useSelector((state) => state.friend.currentFriendId)!;
  const myId = useUserId();
  const [repliedMessage, setRepliedMessage] = useState<RepliedMessage | null>(
    null
  );
  const [localMessages, setLocalMessages] = useState<any[]>([]);

  const {
    data: messages = [],
    refetch: refetchMessages,
    isSuccess: isMessagesSuccess,
  } = useGetChatMessagesQuery(chatId);
  const {
    data: friend = {},
  } = useGetUserQuery(currentFriendId);

  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (isMessagesSuccess) {
      setLocalMessages(messages);
    }
  }, [isMessagesSuccess, messages]);

  useEffect(() => {
    socket.emit("join room", String(chatId));

    socket.on("new message", (message) => {
      console.log("new message", message);
      setLocalMessages((prevMessages) => [...prevMessages, message]);
      if (isMessagesSuccess) {
        refetchMessages();
      }
    });

    return () => {
      socket.emit("leave room", chatId);
    };
  }, [chatId, isMessagesSuccess, refetchMessages]);

  const onSendMessage = (
    content: string,
    replyTo: number | null,
    attachments: File[] | null
  ) => {
    const formData = new FormData();
    formData.append(
      "message",
      JSON.stringify({
        chat_id: chatId,
        sender_id: myId,
        content,
        created_at: new Date().toISOString(),
        reply_to: replyTo,
      })
    );
    if (attachments) {
      attachments.forEach((file, index) => {
        formData.append(`attachment_${index}`, file);
      });
    }

    const formDataValues: { [key: string]: {} | string } = {};
    formData.forEach((value, key) => (formDataValues[key] = value));
    console.log(formDataValues);
    sendMessage({ chatId, formData });
  };

  const onReply = (messageId: number, content: string) => {
    setRepliedMessage({ replyTo: messageId, content });
  };

  const onCancelReply = () => {
    setRepliedMessage(null);
  };

  return {
    friend,
    messages,
    repliedMessage,
    onSendMessage,
    onReply,
    onCancelReply,
  };
};

export default useChat;
