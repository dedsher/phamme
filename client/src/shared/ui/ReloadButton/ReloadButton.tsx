import { handleReloadClick } from "@utils/helpers";
import "./ReloadButton.scss";

const ReloadButton = () => {
  return (
    <button className="reload-button" onClick={handleReloadClick}>
      Обновить страницу
    </button>
  );
};

export default ReloadButton;
