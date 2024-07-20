import "./ReloadButton.scss";
import { handleReloadClick } from "@utils/helpers";

const ReloadButton = () => {
  return (
    <button className="reload-button" onClick={handleReloadClick}>
      Обновить страницу
    </button>
  );
};

export default ReloadButton;
