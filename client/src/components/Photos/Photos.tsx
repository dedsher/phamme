import { Image } from "antd";
import "./Photos.scss";
import { IAttachment } from "@interfaces/entities";

const Photos = ({
  attachments,
}: {
  attachments: IAttachment[];
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
