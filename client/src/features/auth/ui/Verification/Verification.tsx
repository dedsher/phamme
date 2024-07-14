import { Link } from "react-router-dom";
import "./Verification.scss";

const Verification = () => {
  return (
    <div className="verification">
      <h1>Он че за лев, почту подтвердил😤😤😤</h1>
      <Link to="/signin">Войти</Link>
    </div>
  );
};

export default Verification;
