import "./Profile.scss";
import { Modal, Button, Upload, message, Spin, Image } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import {
  useGetUserProfileQuery,
  useUpdateUserMutation,
} from "@entities/user/model/userApi";
import { useUserId } from "@entities/user/hooks/useUserId";
import { useModal } from "@features/modal/ui/ModalContext";

interface UserProfile {
  photos: string[];
  firstname: string;
  lastname: string;
  username: string;
  bio: string;
}

const UserProfileSchema = Yup.object().shape({
  firstname: Yup.string().required("Имя не может быть пустым"),
  lastname: Yup.string().required("Фамилия не может быть пустой"),
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9_]*$/,
      "Имя пользователя может содержать только английские буквы, цифры и нижние подчеркивания"
    )
    .max(16, "Имя пользователя не может превышать 10 символов")
    .required("Имя пользователя не может быть пустым"),
  bio: Yup.string().max(140, "Биография не может превышать 140 символов"),
});

const Settings: React.FC = () => {
  const { modals, hideModal } = useModal();
  const { visible, confirmLoading } = modals.profile || {};
  const [isEditing, setIsEditing] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const userId = useUserId();
  const { data: user, isLoading: isUserLoading } =
    useGetUserProfileQuery(userId);

  const handleEditClick = () => setIsEditing(true);

  const handleSave = async (values: UserProfile) => {
    try {
      await updateUser(values).unwrap();
      message.success("Профиль успешно обновлен");
      setIsEditing(false);
    } catch (error: any) {
      message.error("Ошибка при обновлении профиля: " + error.message);
    }
  };
  

  const handleOk = () => {
    setTimeout(() => {
      hideModal("profile");
    }, 2000);
  };

  const handleCancel = () => {
    hideModal("profile");
  };

  if (!user || isUserLoading) {
    return <Spin />;
  }

  return (
    <Modal
      title="Профиль пользователя"
      open={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      {!isEditing ? (
        <div>
          
            <Image src={user.avatar_url} />
          <p>
            {user.firstname} {user.lastname}
          </p>
          <p>{user.username}</p>
          <p>{user.bio}</p>
          <Button onClick={handleEditClick}>Редактировать профиль</Button>
        </div>
      ) : (
        <Formik
          initialValues={user}
          validationSchema={UserProfileSchema}
          onSubmit={handleSave}
        >
          {({ values, errors, touched, isValid, dirty }) => (
            <Form>
              <Upload
                name="photos"
                listType="picture-circle"
                beforeUpload={(file) => false}
              >
                <div>Upload</div>
              </Upload>
              <Field name="firstname" placeholder="Имя" />
              {errors.firstname && touched.firstname ? (
                <div>{errors.firstname}</div>
              ) : null}
              <Field name="lastname" placeholder="Фамилия" />
              {errors.lastname && touched.lastname ? (
                <div>{errors.lastname}</div>
              ) : null}
              <Field name="username" placeholder="Имя пользователя" />
              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
              <Field name="bio" placeholder="Биография" />
              {errors.bio && touched.bio ? <div>{errors.bio}</div> : null}
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isValid || !dirty || isLoading}
              >
                Сохранить изменения
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default Settings;
