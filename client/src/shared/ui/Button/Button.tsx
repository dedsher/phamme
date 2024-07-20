import { ReactNode } from "react";
import { Button as AntButton } from "antd";

const Button = ({
  children,
  className,
  handleClick,
  disabled,
}: {
  children: ReactNode;
  className?: string;
  handleClick: () => void;
  disabled: boolean;
}) => {
  return (
    <AntButton
      type="primary"
      className={className}
      onClick={handleClick}
      disabled={disabled}
      loading={disabled}
    >
      {children}
    </AntButton>
  );
};

export default Button;
