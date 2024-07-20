import "./ChatHeader.scss";
import { parseTimeForStatus } from "@utils/helpers";

const ChatHeader = ({ friend }: { friend: any }) => {
  const { firstname, lastname, status, last_seen } = friend;
  return (
    <div className="chat-header">
      <p className="chat-header__name">{`${firstname} ${lastname}`}</p>
      <span className="chat-header__status">{status === "online" ? "Онлайн" : parseTimeForStatus(last_seen)}</span>
    </div>
  );
};

export default ChatHeader;
