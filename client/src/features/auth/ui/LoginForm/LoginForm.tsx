import "./LoginForm.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, FormikProps } from "formik";
import Button from "@shared/ui/Button/Button";
import FormItem from "@features/auth/ui/FormItem/FormItem";
import { useLogin } from "@features/auth/hooks/useLogin";
import { LoginData } from "@interfaces/entities";


const LoginForm = () => {
  const { initialValues, validationSchema, handleSubmit, errorResponse } =
    useLogin();

  const loginFormikRef = React.useRef<any>(null);

  const onSubmitButtonClick = () => {
    loginFormikRef.current?.submitForm();
  };

  return (
    <div className="login">
      <h1>Welcome Back</h1>
      <p>Предсказание дня: </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={loginFormikRef}
      >
        {({
          errors,
          touched,
          isSubmitting,
          setFieldTouched
        }: FormikProps<LoginData>) => (
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
              {!touched.password && errorResponse && (
                <div className="login-form__error">{errorResponse}</div>
              )}
            </div>
            <div className="login-form__item">
              <a className="login-form__forgot" href="">
                Забыл пароль
              </a>
            </div>
            <Button handleClick={() => {
              onSubmitButtonClick();
              setFieldTouched("login", false);
              setFieldTouched("password", false);
            }} disabled={isSubmitting}>
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
