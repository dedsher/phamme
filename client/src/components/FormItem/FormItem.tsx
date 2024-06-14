import { Input } from "antd";
import classNames from "classnames";
import { Field } from "formik";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const NAMES = {
  username: {
    placeholder: "Имя пользователя",
    icon: UserOutlined,
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
        {({ field }: { field: any }) => (
          <Input
            {...field}
            prefix={<CurrentIcon className="site-form-item-icon" />}
            placeholder={NAMES[name]["placeholder"]}
            status={error && touched ? "error" : ""}
            type={name === "password" ? "password" : "text"}
          />
        )}
      </Field>
      {error && touched ? <div className="error">{error}</div> : null}
    </div>
  );
};

export default FormItem;
