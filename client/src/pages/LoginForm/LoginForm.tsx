import React from "react";
import Button from "@components/Button/Button";
import "./LoginForm.scss";
import { Link } from "react-router-dom";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import FormItem from "@components/FormItem/FormItem";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const formikRef = React.useRef<any>(null);
  const initialValues: LoginFormValues = { username: "", password: "" };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Введите имя"),
    password: Yup.string().required("Введите пароль"),
  });

  const handleSubmit = (values: LoginFormValues) => {
    // Обработка данных формы
    console.log(values);
  };

  const onSubmitButtonClick = () => {
    formikRef.current?.submitForm();
  };

  return (
    <div className="login">
      <h1>Welcome Back</h1>
      <p>Предсказание дня: </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ errors, touched }: FormikProps<LoginFormValues>) => (
          <Form className="login-form">
            <FormItem
              error={errors.username}
              touched={touched.username}
              name="username"
            />
            <FormItem
              error={errors.password}
              touched={touched.password}
              name="password"
            />
            <div className="login-form__item">
              <a className="login-form__forgot" href="">
                Забыл пароль
              </a>
            </div>
            <Button handleClick={onSubmitButtonClick}>Войти</Button>
            <div className="login-form__addon">
              Еще не зарегестрированы?{" "}
              <Link to="/auth/signup">Зарегестрироваться</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
