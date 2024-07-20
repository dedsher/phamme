import "./Message.scss";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Button, Dropdown, MenuProps, message as antMessage } from "antd";
import {
  MessageOutlined,
  SignatureOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import Attachments from "@features/chat/ui/Attachments/Attachments";
import { parseTimeForMessage } from "@utils/helpers";
import { IMessage } from "@interfaces/entities";
import { useUserId } from "@entities/user/hooks/useUserId";
import { DeliveredIcon, ReadIcon } from "@shared/assets/icons";

const items: MenuProps["items"] = [
  { key: "reply", icon: <MessageOutlined />, label: "Ответить" },
  { key: "edit", icon: <SignatureOutlined />, label: "Редактировать" },
];

const getMenuItems = (isAuthor: boolean) => {
  if (isAuthor) {
    return items;
  }
  return items.filter((item: any) => item.key !== "edit");
};

const Message = ({
  message,
  onReply,
  onEdit,
}: {
  message: IMessage;
  onReply: (messageId: number, content: string, author: string) => void;
  onEdit: (messageId: number, content: string) => void;
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const userId = useUserId();
  const [replyWidth, setReplyWidth] = useState<number | null>(null);
  const {
    id,
    sender_id,
    content,
    created_at,
    attachments,
    reply_to,
    sender_name,
    status,
  } = message;

  useEffect(() => {
    if (messageRef.current) {
      setReplyWidth(messageRef.current.offsetWidth);
    }
  }, [content, reply_to]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "edit") {
      // antMessage.info("Payment feature is not implemented yet.");
      onEdit(id, content);
    } else if (key === "reply") {
      onReply(id, content, sender_name);
    }
  };

  const onDoubleClick = () => {
    onReply(id, content, sender_name);
  };

  return (
    <div
      className={classNames(
        "message",
        userId === sender_id ? "message--author" : ""
      )}
    >
      <div className="message__content" onDoubleClick={onDoubleClick}>
        <div className="message__bubble">
          {attachments && (
            <div className="message__attachments">
              <Attachments attachments={attachments} />
            </div>
          )}
          {reply_to && (
            <div
              className="message__reply"
              style={{ maxWidth: replyWidth ? `${replyWidth}px` : "auto" }}
            >
              <div className="message__reply-text">{reply_to}</div>
            </div>
          )}
          <div className="message__text-wrapper" ref={messageRef}>
            <div className="message__text">{content}</div>
            <div className="message__time">
              {parseTimeForMessage(created_at)}
            </div>
          </div>
        </div>
      </div>
      <div className="message__reply-button">
        <Dropdown
          menu={{
            items: getMenuItems(userId === sender_id),
            onClick: handleMenuClick,
          }}
          trigger={["click"]}
        >
          <Button className="chat-input__more" icon={<EllipsisOutlined />} />
        </Dropdown>
      </div>
      {userId === sender_id && (
        <div className="message__status-icon">
          {status === "read" ? <ReadIcon /> : <DeliveredIcon />}
        </div>
      )}
    </div>
  );
};

export default Message;
