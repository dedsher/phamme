import ChatsItem from "@components/Chats/ChatsItem/ChatsItem";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const chats = [
  {
    id: 1,
    name: "Марк Автосервис",
    img: "https://via.placeholder.com/40",
    text: "хахахахахахахахахахахахаха",
    time: "22:50",
  },
  {
    id: 2,
    name: "Оксана Шамова",
    img: "https://via.placeholder.com/40",
    text: "привет!",
    time: "22:50",
  },
  {
    id: 3,
    name: "Ваня Петрович",
    img: "https://via.placeholder.com/40",
    text: "хахахахахахахахахахахахаха",
    time: "22:50",
  },
];

const ChatsList = () => {
  const currentChatId = useParams<{ chatId: string }>().chatId;
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(Number(currentChatId));
  const handleChatClick = (id: number) => {
    setActiveChat(id);
    navigate(`${id}`);
  }

  return (
    <div>
      {chats.map((chat) => (
        <ChatsItem
          key={chat.id}
          id={chat.id}
          img={chat.img}
          name={chat.name}
          text={chat.text}
          time={chat.time}
          isActive={activeChat === chat.id}
          handleClick={() => handleChatClick(chat.id)}
        />
      ))}
    </div>
  );
};

export default ChatsList;
