import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]+$/, "Имя должно содержать только буквы")
    .min(2, "Имя должно быть не менее 2 символов")
    .required("Введите имя"),
  lastname: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]+$/, "Фамилия должна содержать только буквы")
    .min(2, "Фамилия должна быть не менее 2 символов")
    .required("Введите фамилию"),
  email: Yup.string().email("Некорректная почта").required("Введите почту"),
  password: Yup.string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .max(32, "Пароль должен быть не более 32 символов")
    .required("Введите пароль"),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли должны совпадать")
    .required("Повторите пароль"),
});

export const loginValidationSchema = Yup.object().shape({
  login: Yup.string().required("Введите имя пользователя или почту"),
  password: Yup.string().required("Введите пароль"),
});
