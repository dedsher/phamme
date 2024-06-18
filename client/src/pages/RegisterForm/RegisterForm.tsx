import React from "react";
import Button from "@components/Button/Button";
import "./RegisterForm.scss";
import { Link } from "react-router-dom";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import FormItem from "@components/FormItem/FormItem";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const RegisterForm: React.FC = () => {
  const formikRef = React.useRef<any>(null);
  const initialValues: RegisterFormValues = {
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .matches(/^[a-zA-Zа-яА-Я]+$/, "Имя пользователя должно содержать только буквы")
      .min(4, "Имя пользователя должно быть не менее 4 символов")
      .max(32, "Имя пользователя должно быть не более 32 символов")
      .required("Введите имя"),
    email: Yup.string()
      .email('Некорректная почта')
      .required('Введите почту'),
    password: Yup.string()
      .min(8, "Пароль должен быть не менее 8 символов")
      .max(32, "Пароль должен быть не более 32 символов")
      .required("Введите пароль"),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
      .required("Повторите пароль"),
  });

  const handleSubmit = (values: RegisterFormValues) => {
    // Обработка данных формы
    console.log(values);
  };

  const onSubmitButtonClick = () => {
    formikRef.current?.submitForm();
  };

  return (
    <div className="register">
      <h1>Регистрация</h1>
      <p>Вы - скибиди туалет</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ errors, touched }: FormikProps<RegisterFormValues>) => (
          <Form className="login-form">
            <FormItem
              error={errors.username}
              touched={touched.username}
              name="username"
            />
            <FormItem
              error={errors.email}
              touched={touched.password}
              name="email"
            />
            <FormItem
              error={errors.password}
              touched={touched.password}
              name="password"
            />
            <FormItem
              error={errors.passwordRepeat}
              touched={touched.passwordRepeat}
              name="passwordRepeat"
            />
            <Button handleClick={onSubmitButtonClick}>
              Зарегестрироваться
            </Button>
            <div className="login-form__addon">
              Уже есть аккаунт? <Link to="/auth/signin">Войти</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
