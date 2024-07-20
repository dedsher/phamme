import "./Settings.scss";
import { Modal, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { useModal } from "@features/modal/ui/ModalContext";
import { useLogoutMutation } from "@features/settings/model/settingsApi";
import { useDispatch } from "@shared/hooks/useRedux";
import { clearUser } from "@entities/user/model/userSlice";
import { logout as tokenLogout } from "@features/auth/model/authSlice";
import { useUserId } from "@entities/user/hooks/useUserId";
import { useSocket } from "@shared/sockets/socketContext";
import { ConnectWallet } from "@features/transaction/ui/ConnectWallet/ConnectWallet";

const Settings: React.FC = () => {
  const { modals, hideModal } = useModal();
  const { visible, confirmLoading } = modals.settings || {};
  const userId = useUserId();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleOk = () => {
    setTimeout(() => {
      hideModal("settings");
    }, 2000);
  };

  const handleCancel = () => {
    hideModal("settings");
  };

  const handleConfirmOk = async () => {
    const response = await logout(userId);
    if (response.error) {
      return;
    }
    handleOk();
    dispatch(clearUser());
    dispatch(tokenLogout());
    socket?.disconnect();
    navigate("/auth/signin");
  };

  return (
    <Modal
      title="Настройки"
      open={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      classNames={{ body: "settings" }}
      footer={null}
    >
      <ConnectWallet />
      <Popconfirm
        title="Вы уверены, что хотите выйти?"
        onConfirm={handleConfirmOk}
        okText="Да"
        cancelText="Нет"
      >
        <button className="settings__button settings__logout">
          Выйти из аккаунта
        </button>
      </Popconfirm>
    </Modal>
  );
};

export default Settings;
