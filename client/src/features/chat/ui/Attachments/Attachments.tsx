import { Image } from "antd";
import "./Attachments.scss";
import { IAttachment } from "@interfaces/entities";
import File from "@features/chat/ui/File/File";

const Attachments = ({ attachments }: { attachments: IAttachment[] }) => {
  return (
    <div className="attachments">
      <Image.PreviewGroup
        items={attachments.map((attachment) => attachment.url)}
      >
        <div className="photos">
          {attachments.map(
            (attachment) =>
              attachment.type.includes("image") && (
                <div key={attachment.id} className="photos__item">
                  <Image src={attachment.url} />
                </div>
              )
          )}
        </div>
      </Image.PreviewGroup>
      <div className="files">
        {attachments.map(
          (attachment) =>
            !attachment.type.includes("image") && (
              <File key={attachment.id} file={attachment} />
            )
        )}
      </div>
    </div>
  );
};

export default Attachments;
