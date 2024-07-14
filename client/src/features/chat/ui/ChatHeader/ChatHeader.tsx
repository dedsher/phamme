import { parseTimeForChat } from "@utils/helpers";
import "./ChatHeader.scss";

const ChatHeader = ({ friend }: { friend: any }) => {
  const { firstname, lastname, status, last_seen } = friend;
  return (
    <div className="chat-header">
      <p className="chat-header__name">{`${firstname} ${lastname}`}</p>
      <span className="chat-header__status">{status === "online" ? status : `Был в сети ${parseTimeForChat(last_seen)}`}</span>
    </div>
  );
};

export default ChatHeader;
