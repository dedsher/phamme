import { message } from "antd";
import { FormikHelpers } from "formik";
import { RegisterData } from "@interfaces/entities";
import { useAuthForm } from "./useAuthForm";
import { registerValidationSchema } from "@utils/validationSchemas";
import { useRegisterMutation } from "@features/auth/model/authApi";

const errorResponses: { [key: string]: string } = {
  "User already exists": "Пользователь с таким email уже существует",
};

export const useRegister = () => {
  const [register] = useRegisterMutation();

  const handleSubmit = async (
    values: RegisterData,
    { setStatus }: FormikHelpers<RegisterData>
  ) => {
    const { passwordRepeat, ...data } = values;
    const response = await register(data).unwrap();
    if (response?.message === "Registered") {
      setStatus({ success: true });
    } else {
      throw new Error("Ошибка регистрации");
    }
  };

  const onSuccess = () => {
    message.success("Подтвердите регистрацию на почте");
  };

  return useAuthForm<RegisterData>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: handleSubmit,
    errorResponses,
    onSuccess,
  });
};
