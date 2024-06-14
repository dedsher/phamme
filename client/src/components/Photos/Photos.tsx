import { Image } from "antd";
import "./Photos.scss";

const Photos = ({
  attachments,
}: {
  attachments: { type: string; url: string; width: number; height: number }[];
}) => {
  return (
    <Image.PreviewGroup
      items={attachments.map((photo) => photo.url)}
    >
      <div className="photos">
        {attachments.map((attachment, index) => (
          <div key={index} className="photos__item">
            <Image src={attachment.url} />
          </div>
        ))}
      </div>
    </Image.PreviewGroup>
  );
};

export default Photos;
