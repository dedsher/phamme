import { useUserId } from "@entities/user/hooks/useUserId";
import { useSelector } from "@shared/hooks/useRedux";
import { useEffect, useRef, useState } from "react";
import useSocket from "@shared/sockets/socket";
import { mergeMessages } from "@utils/helpers";
import { useGetChatAttachmentsQuery, useGetChatMessagesQuery, useSendMessageMutation } from "../api/chatApi";
import { useGetUserQuery } from "@entities/user/model/userApi";

interface RepliedMessage {
  replyTo: number;
  replyToName: string;
  content: string;
}

const useChat = (chatId: number) => {
  const currentFriendId = useSelector((state) => state.friend.currentFriendId)!;
  const myId = useUserId();
  const [repliedMessage, setRepliedMessage] = useState<RepliedMessage | null>(
    null
  );
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const inputRef = useRef<any>(null);
  const socket = useSocket()!;

  const {
    data: messages = [],
    refetch: refetchMessages,
    isSuccess: isMessagesSuccess,
  } = useGetChatMessagesQuery(chatId);
  const {
    data: attachments = [],
    refetch: refetchAttachments,
    isSuccess: isAttachmentsSuccess,
  } = useGetChatAttachmentsQuery(chatId);
  const { data: friend = {} } = useGetUserQuery(currentFriendId);

  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (isMessagesSuccess && isAttachmentsSuccess) {
      const mergedMessages = mergeMessages(messages, attachments);
      setLocalMessages(mergedMessages);
    }
  }, [isMessagesSuccess, isAttachmentsSuccess, messages, attachments]);

  useEffect(() => {
    socket.emit("join room", String(chatId));

    socket.on("new message", (message) => {
      if (isMessagesSuccess && isMessagesSuccess) {
        refetchMessages();
        refetchAttachments();
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
      attachments.forEach((file) => {
        formData.append(`attachments`, file);
      });
    }

    const formDataValues: { [key: string]: {} | string } = {};
    formData.forEach((value, key) => (formDataValues[key] = value));
    sendMessage({ chatId, formData });
    // socket.emit("new message", formData);
  };

  const onReply = (messageId: number, content: string, author: string) => {
    setRepliedMessage({ replyTo: messageId, replyToName: author, content });
    inputRef.current?.focus();
  };

  const onCancelReply = () => {
    setRepliedMessage(null);
  };

  return {
    friend,
    localMessages,
    repliedMessage,
    onSendMessage,
    onReply,
    onCancelReply,
    inputRef,
  };
};

export default useChat;
