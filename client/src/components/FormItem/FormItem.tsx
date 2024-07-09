import { Input } from "antd";
import classNames from "classnames";
import { Field } from "formik";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const NAMES = {
  login: {
    placeholder: "Имя пользователя или Email",
    icon: UserOutlined,
  },
  firstname: {
    placeholder: "Имя",
    icon: null,
  },
  lastname: {
    placeholder: "Фамилия",
    icon: null,
  },
  email: {
    placeholder: "Email",
    icon: UserOutlined,
  },
  password: {
    placeholder: "Пароль",
    icon: LockOutlined,
  },
  passwordRepeat: {
    placeholder: "Повторите пароль",
    icon: LockOutlined,
  },
};

const FormItem = ({
  error,
  touched,
  name,
}: {
  error?: string;
  touched?: boolean;
  name: keyof typeof NAMES;
}) => {
  const CurrentIcon = NAMES[name]["icon"];
  return (
    <div
      className={classNames(
        "login-form__item",
        error ? "login-form__item--error" : ""
      )}
    >
      <Field name={name}>
        {({ field }: { field: any }) =>
          ["password", "passwordRepeat"].includes(name) ? (
            <Input.Password
              {...field}
              prefix={
                CurrentIcon && <CurrentIcon className="site-form-item-icon" />
              }
              placeholder={NAMES[name]["placeholder"]}
              status={error && touched ? "error" : ""}
            />
          ) : (
            <Input
              {...field}
              prefix={
                CurrentIcon && <CurrentIcon className="site-form-item-icon" />
              }
              placeholder={NAMES[name]["placeholder"]}
              status={error && touched ? "error" : ""}
            />
          )
        }
      </Field>

      {error && touched ? <div className="error">{error}</div> : null}
    </div>
  );
};

export default FormItem;
