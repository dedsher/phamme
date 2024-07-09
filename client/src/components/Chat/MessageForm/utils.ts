import { message as antMessage, UploadFile } from "antd";

const handleMenuClick = (uploadButtonRef: any, { key }: { key: string }) => {
  if (key === "file" && uploadButtonRef.current) {
    uploadButtonRef.current.click();
  } else if (key === "payment") {
    antMessage.info("Payment feature is not implemented yet.");
  }
};

// const handleAddFile = (
//   fileList: UploadFile[],
//   setFileList: (fileList: UploadFile[]) => void,
//   file: UploadFile
// ) => {
//   if (fileList.length >= 3) return;
//   setFileList([...fileList, file]);
// };

// const handlePaste = (
//   event: ClipboardEvent,
//   fileList: UploadFile[],
//   setFileList: (fileList: UploadFile[]) => void
// ) => {
//   const clipboardItems = event.clipboardData?.items;
//   if (!clipboardItems) return;

//   for (let i = 0; i < clipboardItems.length; i++) {
//     const item = clipboardItems[i];
//     if (item.type.startsWith("image")) {
//       const blob = item.getAsFile();
//       if (blob) {
//         const file = new File([blob], blob.name, {
//           type: item.type,
//         });
//         handleAddFile(fileList, setFileList, {
//           uid: `pasted-${Date.now()}`,
//           name: file.name,
//           status: "done",
//           url: URL.createObjectURL(file),
//           originFileObj: file,
//           lastModified: file.lastModified,
//           type: file.type,
//         });
//       }
//     }
//   }
// };

export { handleMenuClick, handleAddFile, handlePaste };
