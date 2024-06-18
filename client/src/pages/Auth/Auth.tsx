import { useLocation } from "react-router-dom";
import LoginForm from "@pages/LoginForm/LoginForm";
import RegisterForm from "@pages/RegisterForm/RegisterForm";
import "./Auth.scss";

const Auth = () => {
  const location = useLocation();
  return (
    <div className="auth">
      {location.pathname.includes("signin") && <LoginForm />}
      {location.pathname.includes("signup") && <RegisterForm />}
    </div>
  );
};

export default Auth;
