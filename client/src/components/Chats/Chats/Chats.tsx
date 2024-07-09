import Search from "@components/Search/Search";
import ChatsList from "@components/Chats/ChatsList/ChatsList";
import "./Chats.scss";

const Chats = () => {
  return (
    <div className="chats-wrapper">
      <Search />
      <ChatsList />
    </div>
  );
};

export default Chats;
