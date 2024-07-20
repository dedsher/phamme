import "./ChatsItem.scss";
import classNames from "classnames";
import { parseTimeForChat } from "@utils/helpers";
import { IChatPreview } from "@interfaces/entities";
import { useUserId } from "@entities/user/hooks/useUserId";

interface ChatsItemProps {
  chat: IChatPreview;
  isActive: boolean;
  handleClick?: () => void;
}

const ChatsItem = ({ chat, isActive = false, handleClick }: ChatsItemProps) => {
  const {
    last_message,
    last_message_at,
    last_message_author_id,
    unread_count,
    firstname,
    lastname,
    avatar_url,
    status,
  } = chat;
  const userId = useUserId();

  return (
    <div
      className={classNames("chats-item", isActive ? "active" : "")}
      onClick={handleClick}
    >
      <div
        className={classNames(
          "chats-item__avatar",
          status === "online" && "chats-item__avatar--online"
        )}
      >
        <div className="chats-item__avatar-wrapper">
          <img src={avatar_url} alt="Аватар юзера" />
        </div>
      </div>
      <div className="chats-item__wrapper">
        <div className="chats-item__header">
          <h3 className="chats-item__name">{`${firstname} ${lastname}`}</h3>
          <span className="chats-item__time">
            {parseTimeForChat(last_message_at)}
          </span>
        </div>
        <div className="chats-item__content">
          <p className="chats-item__text">{last_message}</p>
          {unread_count > 0 && last_message_author_id !== userId && (
            <span className="chats-item__unread">{unread_count}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsItem;
