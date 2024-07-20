import "./Navbar.scss";
import { useState } from "react";
import IconButton from "@shared/ui/IconButton/IconButton";
import { ChatIcon, TransesIcon, SettingsIcon, UserIcon } from "@shared/assets/icons";
import { useModal, ModalProvider } from '@features/modal/ui/ModalContext';
import Settings from '@features/settings/ui/Settings/Settings';
import Profile from "@features/profile/ui/Profile/Profile";
import { SvgComponent } from "@interfaces/utils";

interface NavbarItem {
  icon: SvgComponent;
  label: string;
  path: string;
}

const navbarItems: NavbarItem[] = [
  { icon: ChatIcon, label: "Чаты", path: "chats" },
  { icon: TransesIcon, label: "Переводы", path: "transactions" },
  { icon: UserIcon, label: "Профиль", path: "profile" },
  { icon: SettingsIcon, label: "Настройки", path: "settings" },
];

const Navbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { showModal } = useModal();

  const handleItemClick = (index: number, path: string) => {
    if (index === activeIndex) return;

    if (path === "settings") {
      showModal('settings', { modalText: 'Настройки пользователя', confirmLoading: false });
      return;
    }

    if (path === "profile") {
      showModal('profile', { modalText: 'Профиль пользователя', confirmLoading: false });
      return;
    }

    setActiveIndex(index);
  };

  const parsePath = (path: string) => {
    if (path === "settings" || path === "profile") {
      return undefined;
    }

    return path;
  };

  return (
    <div className="navbar">
      <div className="navbar__links">
        {navbarItems.map((item, index) => (
          <IconButton
            key={index}
            icon={item.icon}
            label={item.label}
            to={parsePath(item.path)}
            isActive={activeIndex === index}
            handleClick={() => handleItemClick(index, item.path)}
          />
        ))}
      </div>
      <Settings />
      <Profile />
    </div>
  );
};

const NavbarWithProvider: React.FC = () => (
  <ModalProvider>
    <Navbar />
  </ModalProvider>
);

export default NavbarWithProvider;
