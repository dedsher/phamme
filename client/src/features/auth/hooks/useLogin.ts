import { LoginData } from "@interfaces/entities";
import { useAuthForm } from "./useAuthForm";
import { FormikHelpers } from "formik";
import { loginValidationSchema } from "@utils/validationSchemas";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@entities/user/model/userApi";

const errorResponses: { [key: string]: string } = {
  "User not found": "Пользователь не найден",
  "Invalid password": "Неверный пароль",
};

export const useLogin = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/home/chats");
  }

  const handleSubmit = async (
    values: LoginData,
    { setStatus }: FormikHelpers<LoginData>
  ) => {
    const response = await login(values).unwrap();
    localStorage.setItem("token", response.token);
    setStatus({ success: true });
  };

  return useAuthForm<LoginData>({
    initialValues: { login: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
    errorResponses,
    onSuccess,
  });
};
