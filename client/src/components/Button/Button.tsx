import { useState, ReactNode } from "react";
import { Button as AntButton } from "antd";

const Button = ({ children, className, handleClick }: { children: ReactNode, className?: string, handleClick: (() => void) }) => {
  const [loadings, setLoadings] = useState([]);

  return (
    <AntButton
      type="primary"
      loading={loadings[0]}
      className={className}
      onClick={handleClick}
    >
      {children}
    </AntButton>
  );
};

export default Button;
