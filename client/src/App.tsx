import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import setupAxiosInterceptors from "./axiosConfig";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors(navigate);
    if (localStorage.getItem("token")) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="main">
      <Outlet />
    </div>
  );
}

export default App;
