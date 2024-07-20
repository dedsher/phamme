import "./RegisterForm.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, FormikProps } from "formik";
import Button from "@shared/ui/Button/Button";
import FormItem from "@features/auth/ui/FormItem/FormItem";
import { useRegister } from "@features/auth/hooks/useRegister";
import { RegisterData } from "@interfaces/entities";

const RegisterForm = () => {
  const { initialValues, validationSchema, handleSubmit, errorResponse } =
    useRegister();

  const formikRef = React.useRef<any>(null);

  formikRef.current?.resetForm();

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
        {({
          errors,
          touched,
          isSubmitting,
          status,
        }: FormikProps<RegisterData>) => (
          <Form className="login-form">
            <div className="login-form__group">
              <FormItem
                error={errors.firstname}
                touched={touched.firstname}
                name="firstname"
              />
              <FormItem
                error={errors.lastname}
                touched={touched.lastname}
                name="lastname"
              />
            </div>
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
            <div>
              {status && status.success && (
                <div className="login-form__success">
                  Вы успешно зарегестрированы!
                </div>
              )}
              {status && !status.success && (
                <div className="login-form__error">{errorResponse}</div>
              )}
            </div>
            <Button handleClick={onSubmitButtonClick} disabled={isSubmitting}>
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
