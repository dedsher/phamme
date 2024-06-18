import "./ChatsItem.scss";
import classNames from "classnames";

interface ChatsItemProps {
  id: number;
  img: string;
  name: string;
  text: string;
  time: string;
  isActive?: boolean;
  handleClick?: () => void;
}

const ChatsItem = ({
  img,
  name,
  text,
  time,
  isActive,
  handleClick,
}: ChatsItemProps) => {
  return (
    <div
      className={classNames("chats-item", isActive ? "active" : "")}
      onClick={handleClick}
    >
      <div className="chats-item__avatar">
        <img src={img} alt="Аватар юзера" />
      </div>
      <div className="chats-item__content">
        <div className="chats-item__header">
          <h3 className="chats-item__name">{name}</h3>
          <span className="chats-item__time">{time}</span>
        </div>
        <p className="chats-item__text">{text}</p>
      </div>
    </div>
  );
};

export default ChatsItem;
