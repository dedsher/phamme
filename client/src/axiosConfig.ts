import axios from "axios";
import { NavigateFunction } from "react-router-dom";

const setupAxiosInterceptors = (navigate: NavigateFunction) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("jwt")) {
          navigate("/auth/signin");
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
