import "./ChatHeader.scss";

const ChatHeader = ({name, time}: { name: string, time: string }) => {
  return (
    <div className="chat-header">
      <p className="chat-header__name">{name}</p>
      <span className="chat-header__status">{time}</span>
    </div>
  );
};

export default ChatHeader;
