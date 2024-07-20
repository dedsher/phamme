import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { LoginData } from "@interfaces/entities";
import { useAuthForm } from "./useAuthForm";
import { loginValidationSchema } from "@utils/validationSchemas";
import { useLoginMutation } from "@features/auth/model/authApi";
import { useDispatch } from "@shared/hooks/useRedux";
import { setCredentials } from "@features/auth/model/authSlice";

const errorResponses: { [key: string]: string } = {
  "User not found": "Пользователь не найден",
  "Invalid password": "Неверный пароль",
};

export const useLogin = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = async () => {
    navigate("/home/chats");
  }

  const handleSubmit = async (
    values: LoginData,
    { setStatus }: FormikHelpers<LoginData>
  ) => {
    const response = await login(values).unwrap();
    dispatch(setCredentials({ token: response.accessToken }));
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
