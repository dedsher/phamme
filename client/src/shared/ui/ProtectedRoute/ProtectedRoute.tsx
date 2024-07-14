import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth"; // предположим, что у вас есть такой хук

const ProtectedRoute = () => {
  const auth = useAuth(); // этот хук возвращает true, если пользователь аутентифицирован

  return auth ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default ProtectedRoute;
