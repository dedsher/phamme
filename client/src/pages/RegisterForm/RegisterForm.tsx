import React from "react";
import Button from "@components/Button/Button";
import FormItem from "@components/FormItem/FormItem";
import "./RegisterForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import { registerUser } from "@api/api";
import { RegisterData } from "@interfaces/entities";
import { registerValidationSchema } from "@utils/validationSchemas";

interface RegisterFormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const formikRef = React.useRef<any>(null);
  const [errorResponse, setErrorResponse] = React.useState<string>("");
  const initialValues: RegisterFormValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting, setStatus }: FormikHelpers<RegisterFormValues>
  ) => {
    setSubmitting(true);

    const registerData: RegisterData = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
    };

    try {
      const response = await registerUser(registerData);
      if (response?.message === "Registered") {
        setStatus({ success: true });
        setTimeout(() => {
          navigate("/auth/signin");
        }, 2000);
      } else {
        setStatus({ success: false });
        setErrorResponse("Ошибка регистрации");
      }
    } catch (error: any) {
      setStatus({ success: false });
      if (error.message === "User already exists") {
        setErrorResponse("Пользователь с таким email уже существует");
      }
    } finally {
      setSubmitting(false);
    }
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
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({
          errors,
          touched,
          isSubmitting,
          status,
        }: FormikProps<RegisterFormValues>) => (
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
