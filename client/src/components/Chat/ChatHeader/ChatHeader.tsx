import { useSelector } from "@hooks/useRedux";
import "./ChatHeader.scss";

const ChatHeader = ({ friend }: { friend: any }) => {
  const { firstname, lastname, status } = friend;
  return (
    <div className="chat-header">
      <p className="chat-header__name">{`${firstname} ${lastname}`}</p>
      <span className="chat-header__status">{status}</span>
    </div>
  );
};

export default ChatHeader;
