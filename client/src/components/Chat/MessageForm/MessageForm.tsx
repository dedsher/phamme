import { useState, useRef } from "react";
import { Input, Button, Dropdown, Upload } from "antd";
import type { MenuProps, UploadFile } from "antd";
import {
  UploadOutlined,
  SendOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./MessageForm.scss";
import classNames from "classnames";
import { handleMenuClick } from "./utils";

interface SendMessageFormProps {
  onSendMessage: (
    content: string,
    replyTo: number | null,
    attachments: File[] | null
  ) => void;
  repliedMessage: any;
  onCancelReply: () => void;
}

const items: MenuProps["items"] = [
  { key: "file", icon: <UploadOutlined />, label: "Файл" },
  { key: "payment", icon: <SendOutlined />, label: "Перевод" },
];

const { TextArea } = Input;

const MessageForm = ({
  onSendMessage,
  repliedMessage,
  onCancelReply,
}: SendMessageFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const uploadButtonRef = useRef<any>(null);

  const validationSchema = Yup.object({
    content: Yup.string().required("Сообщение не может быть пустым"),
  });

  const handleSubmit = (values: { content: string }, { resetForm }: any) => {
    const parsedFileList = fileList.map((file) => file.originFileObj as File);
    onSendMessage(values.content, repliedMessage, parsedFileList.length > 0 ? parsedFileList : null);
    resetForm();
    setInputValue("");
    setFileList([]);
  };

  const handleUploadChange = async ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  return (
    <Formik
      initialValues={{ content: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form className="chat-input" onSubmit={handleSubmit}>
          <div className="chat-input__reply">
            {repliedMessage && (
              <div className="chat-input__reply-content">
                <div className="chat-input__reply-text">
                  {repliedMessage.content}
                </div>
                <Button
                  type="text"
                  className="chat-input__reply-cancel"
                  onClick={onCancelReply}
                >
                  Отменить
                </Button>
              </div>
            )}
          </div>
          <div className="chat-input__content">
            <Dropdown
              menu={{
                items,
                onClick: (key) => handleMenuClick(uploadButtonRef, key),
              }}
              trigger={["click"]}
            >
              <Button
                className="chat-input__more"
                icon={<PaperClipOutlined />}
              />
            </Dropdown>
            <Field name="content">
              {({ field }: any) => (
                <TextArea
                  {...field}
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  onChange={(e) => {
                    field.onChange(e);
                    setInputValue(e.target.value);
                  }}
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  className="chat-input__input"
                  placeholder="Введите сообщение..."
                />
              )}
            </Field>
            {(inputValue || fileList.length > 0) && (
              <Button
                className="chat-input__send"
                htmlType="submit"
                icon={<SendOutlined />}
              />
            )}
          </div>
          <div
            className={classNames(
              "chat-input__upload-wrapper",
              fileList.length ? "" : "chat-input__upload-wrapper--hidden"
            )}
          >
            <Upload
              fileList={fileList}
              beforeUpload={(file) => false}
              onChange={handleUploadChange}
              listType="picture"
            >
              <Button ref={uploadButtonRef} style={{ display: "none" }} />
            </Upload>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
