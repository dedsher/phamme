import "./Navbar.scss";
import IconButton from "@components/IconButton/IconButton";
import { ChatIcon, FrensIcon, TransesIcon, SettingsIcon } from "@assets/icons";
import { useState } from "react";

const navbarItems = [
  { icon: ChatIcon, label: "Чаты", path: "chats" },
  { icon: FrensIcon, label: "Друзья", path: "friends" },
  { icon: TransesIcon, label: "Переводы", path: "transactions" },
  { icon: SettingsIcon, label: "Настройки" },
];

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleItemClick = (index: number) => setActiveIndex(index);

  return (
    <div className="navbar">
      <div className="navbar__links">
        {navbarItems.map((item, index) => (
          <IconButton
            key={index}
            icon={item.icon}
            label={item.label}
            to={item.path}
            isActive={activeIndex === index}
            handleClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
