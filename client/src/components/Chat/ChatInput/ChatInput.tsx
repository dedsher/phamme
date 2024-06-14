import { MoreIcon } from "@assets/icons";
import { Input } from "antd";
import "./ChatInput.scss";

const ChatInput = () => {
  return (
    <div className="chat-input">
      <div className="chat-input__more">
        <MoreIcon />
      </div>
      <Input className="chat-input__input" placeholder="Aa" />
    </div>
  );
};

export default ChatInput;
