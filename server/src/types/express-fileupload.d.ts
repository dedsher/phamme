declare module "express-fileupload" {
  interface UploadedFile {
    name: string;
    mv(path: string, callback: (err: any) => void): void;
    mv(path: string): Promise<void>;
    mimetype: string;
    tempFilePath: string;
  }

  interface FileArray {
    [fieldname: string]: UploadedFile | UploadedFile[];
  }

  interface Request {
    files?: FileArray;
  }
}
