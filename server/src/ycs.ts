import dotenv from "dotenv";
const EasyYandexS3 = require("easy-yandex-s3").default;

dotenv.config();

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YC_ACCESS_KEY_ID,
    secretAccessKey: process.env.YC_SECRET_ACCESS_KEY,
  },
  Bucket: process.env.YC_BUCKET_NAME,
  debug: false,
});

export const uploadFile = async (file: any) => {
  const response = await s3.Upload({ buffer: file.buffer }, "/files/");
  return { type: file.mimetype, url: response.Location, fileName: file.originalname };
};
