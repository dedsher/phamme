import "./IconButton.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { IconButtonProps } from "@interfaces/utils";

const IconButton = ({
  icon: Icon,
  label,
  isActive,
  handleClick,
  to,
}: IconButtonProps) => {
  if (!to) {
    return (
      <button className="button" onClick={handleClick}>
        <Icon
          className={classNames(
            "button__icon",
            isActive ? "button__icon--active" : ""
          )}
        />
        <span className="button__label">{label}</span>
      </button>
    );
  }

  return (
    <Link className="button" to={to} onClick={handleClick}>
      <Icon
        className={classNames(
          "button__icon",
          isActive ? "button__icon--active" : ""
        )}
      />
      <span className="button__label">{label}</span>
    </Link>
  );
};

export default IconButton;
