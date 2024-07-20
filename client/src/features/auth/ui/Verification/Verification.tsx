import "./Verification.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useVerifyMutation } from "@features/auth/model/authApi";

const Verification = () => {
  const [verify] = useVerifyMutation();
  const token = window.location.pathname.split("/").at(-1);

  useEffect(() => {
    verify(token);
  }, [token, verify]);

  return (
    <div className="verification">
      <h1>Он че за лев, почту подтвердил😤😤😤</h1>
      <Link to="/auth/signin">Войти</Link>
    </div>
  );
};

export default Verification;
