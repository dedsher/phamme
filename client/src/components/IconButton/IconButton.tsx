import { Link } from "react-router-dom";
import classNames from "classnames";
import { IconButtonProps } from "@interfaces/utils";
import "./IconButton.scss";

const IconButton = ({
  icon: Icon,
  label,
  isActive,
  handleClick,
  to = "",
}: IconButtonProps) => {
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
