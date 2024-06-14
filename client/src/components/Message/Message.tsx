import { useEffect, useRef, useState } from "react";
import "./Message.scss";
import classNames from "classnames";
import Photos from "@components/Photos/Photos";

const formatTime = (datetimeString: string) => {
  const date = new Date(datetimeString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const Message = ({
  text,
  time,
  isAuthor,
  replyTo,
  attachments,
}: {
  text: string;
  time: string;
  isAuthor: boolean;
  replyTo?: string;
  attachments?: { type: string; url: string; width: number; height: number }[];
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [replyWidth, setReplyWidth] = useState<number | null>(null);

  useEffect(() => {
    if (messageRef.current) {
      setReplyWidth(messageRef.current.offsetWidth);
    }
  }, [text, replyTo]);

  return (
    <div className={classNames("message", isAuthor ? "message--author" : "")}>
      <div className="message__content">
        <div className="message__bubble">
          {attachments && (
            <div className="message__attachments">
              <Photos attachments={attachments} />
            </div>
          )}
          {replyTo && (
            <div
              className="message__reply"
              style={{ maxWidth: replyWidth ? `${replyWidth}px` : "auto" }}
            >
              <div className="message__reply-text">{replyTo}</div>
            </div>
          )}
          <div className="message__text-wrapper" ref={messageRef}>
            <div className="message__text">
              {text}
            </div>
            <div className="message__time">{formatTime(time)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
