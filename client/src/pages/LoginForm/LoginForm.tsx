import React from "react";
import Button from "@components/Button/Button";
import FormItem from "@components/FormItem/FormItem";
import "./LoginForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, FormikProps, FormikHelpers } from "formik";
import { loginValidationSchema } from "@utils/validationSchemas";
import { loginUser } from "@api/api";
import { LoginData } from "@interfaces/entities";

const errorResponses: { [key: string]: string } = {
  "User not found": "Пользователь не найден",
  "Invalid password": "Неверный пароль",
};

interface LoginFormValues {
  login: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const loginFormikRef = React.useRef<any>(null);
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = React.useState<string>("");
  const initialValues: LoginFormValues = { login: "", password: "" };

  const handleSubmit = async (
    values: LoginData,
    { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>
  ) => {
    setSubmitting(true);

    const loginData: LoginData = {
      login: values.login,
      password: values.password,
    };

    try {
      const response = await loginUser(loginData);
      localStorage.setItem('token', response.token);
      setStatus({ success: true });
      navigate('/home/chats');
    } catch (error: any) {
      console.error(error);
      setErrorResponse(errorResponses[error.message]);
      setStatus({ success: false });
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmitButtonClick = () => {
    loginFormikRef.current?.submitForm();
  };

  return (
    <div className="login">
      <h1>Welcum Back</h1>
      <p>Предсказание дня: </p>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
        innerRef={loginFormikRef}
      >
        {({
          errors,
          touched,
          isSubmitting,
          status,
        }: FormikProps<LoginFormValues>) => (
          <Form className="login-form">
            <FormItem
              error={errors.login}
              touched={touched.login}
              name="login"
            />
            <FormItem
              error={errors.password}
              touched={touched.password}
              name="password"
            />
            <div>
              {status && status.success && (
                <div className="login-form__success">Вы успешно вошли!</div>
              )}
              {status && !status.success && (
                <div className="login-form__error">{errorResponse}</div>
              )}
            </div>
            <div className="login-form__item">
              <a className="login-form__forgot" href="">
                Забыл пароль
              </a>
            </div>
            <Button handleClick={onSubmitButtonClick} disabled={isSubmitting}>
              Войти
            </Button>
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
