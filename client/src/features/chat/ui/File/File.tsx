import "./File.scss";
import {
  FileOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
} from "@ant-design/icons";
import { IAttachment } from "@interfaces/entities";

const FileIcon = (ext: string) => {
  let FileIcon;

  switch (ext) {
    case "pdf":
      FileIcon = <FilePdfOutlined />;
      break;
    case "doc":
    case "docx":
      FileIcon = <FileWordOutlined />;
      break;
    case "xls":
    case "xlsx":
      FileIcon = <FileExcelOutlined />;
      break;
    case "ppt":
    case "pptx":
      FileIcon = <FilePptOutlined />;
      break;
    default:
      FileIcon = <FileOutlined />;
  }

  return FileIcon;
};

const File = ({ file }: { file: IAttachment }) => {
  return (
    <a href={file.url} target="_blank" className="file-link">
      <div className="file">
        <div className="file__icon">
          {FileIcon(file.name.split(".").at(-1)!)}
        </div>
        <div className="file__name">{file.name}</div>
      </div>
    </a>
  );
};

export default File;
