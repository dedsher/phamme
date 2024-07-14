import { useEffect, useState } from "react";
import api from "./utils/axios";
import { getToken } from "./utils/token";

export const useAuth = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return auth;
};
