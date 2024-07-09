import { useEffect, useRef, useState } from "react";
import "./Message.scss";
import classNames from "classnames";
import Photos from "@components/Photos/Photos";
import { parseTimeForMessage } from "@utils/helpers";
import { IMessage } from "@interfaces/entities";
import { useUserId } from "@hooks/useUserId";
import { Button, Dropdown, MenuProps } from "antd";
import {
  MessageOutlined,
  SignatureOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const userId = useUserId();

const items: MenuProps["items"] = [
  { key: "reply", icon: <MessageOutlined />, label: "Ответить" },
  { key: "edit", icon: <SignatureOutlined />, label: "Редактировать" },
];

const getMenuItems = (isAuthor: boolean) => {
  if (isAuthor) {
    return items;
  }
  return items.filter((item: any) => item.key !== "edit");
}

const Message = ({
  message,
  onReply,
}: {
  message: IMessage;
  onReply: (messageId: number, content: string) => void;
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLDivElement>(null);
  const [replyWidth, setReplyWidth] = useState<number | null>(null);
  const { id, sender_id, content, created_at, attachments, reply_to } = message;

  useEffect(() => {
    if (messageRef.current) {
      setReplyWidth(messageRef.current.offsetWidth);
    }
  }, [content, reply_to]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "edit") {
      // message.info("Payment feature is not implemented yet.");
      return;
    } else if (key === "reply") {
      onReply(id, content);
    }
  };

  return (
    <div
      className={classNames(
        "message",
        userId === sender_id ? "message--author" : ""
      )}
    >
      <div className="message__content">
        <div className="message__bubble">
          {attachments && (
            <div className="message__attachments">
              <Photos attachments={attachments} />
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
          menu={{ items: getMenuItems(userId === sender_id), onClick: handleMenuClick }}
          trigger={["click"]}
        >
          <Button className="chat-input__more" icon={<EllipsisOutlined />} />
        </Dropdown>
      </div>
    </div>
  );
};

export default Message;
