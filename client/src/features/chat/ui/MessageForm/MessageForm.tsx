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
import { CommentOutlined, CloseOutlined } from "@ant-design/icons";

interface SendMessageFormProps {
  onSendMessage: (
    content: string,
    replyTo: number | null,
    attachments: File[] | null
  ) => void;
  repliedMessage: any;
  onCancelReply: () => void;
  inputRef: any;
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
  inputRef,
}: SendMessageFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const uploadButtonRef = useRef<any>(null);

  const handleSubmit = (values: { content: string }, { resetForm }: any) => {
    if (!values.content.trim() && fileList.length === 0) return;

    const parsedFileList = fileList.map((file) => file.originFileObj as File);
    onSendMessage(
      values.content,
      repliedMessage?.replyTo ? repliedMessage.replyTo : null,
      parsedFileList.length > 0 ? parsedFileList : null
    );
    onCancelReply();
    resetForm();
    setInputValue("");
    setFileList([]);
  };

  const handleUploadChange = async ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(fileList);
  };

  return (
    <Formik initialValues={{ content: "" }} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <Form className="chat-input" onSubmit={handleSubmit}>
          {repliedMessage && (
            <div className="chat-input__reply">
              <div className="chat-input__reply-icon">
                <CommentOutlined />
              </div>
              <div className="chat-input__wrapper">
                <div className="chat-input__reply-name">
                  В ответ {repliedMessage.replyToName}
                </div>
                <div className="chat-input__reply-wrapper">
                  <div className="chat-input__reply-text">
                    {repliedMessage.content
                      ? repliedMessage.content
                      : "Вложения..."}
                  </div>
                  <Button
                    type="text"
                    className="chat-input__reply-cancel"
                    onClick={onCancelReply}
                    icon={<CloseOutlined />}
                  />
                </div>
              </div>
            </div>
          )}
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
                  ref={inputRef}
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
