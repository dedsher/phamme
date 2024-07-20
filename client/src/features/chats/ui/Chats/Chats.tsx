import "./Chats.scss";
import Search from "@features/search/ui/Search/Search";
import ChatsList from "@features/chats/ui/ChatsList/ChatsList";

const Chats = () => {
  return (
    <div className="chats-wrapper">
      <Search />
      <ChatsList />
    </div>
  );
};

export default Chats;
