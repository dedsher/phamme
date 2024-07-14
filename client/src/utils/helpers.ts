import { IAttachment, IMessage } from "@interfaces/entities";

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const parseTimeForChat = (time: string) => {
  let timeToShow: string = "";

  const now = new Date();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (now.toDateString() === date.toDateString()) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    timeToShow = `${hours}:${minutes}`;
  } else if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
    timeToShow = `${days[date.getDay()]}`;
  } else {
    const dayStr = day.toString().padStart(2, "0");
    const monthStr = month.toString().padStart(2, "0");
    timeToShow = `${dayStr}.${monthStr}.${year}`;
  }

  return timeToShow;
};

export const parseTimeForMessage = (datetimeString: string) => {
  const date = new Date(datetimeString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const handleReloadClick = () => {
  window.location.reload();
};

export const mergeMessages = (
  messages: IMessage[],
  attachments: IAttachment[]
) => {
  const mergedMessages = messages.map((message) => ({ ...message }));

  mergedMessages.forEach((message) => {
    const foundAttachments = attachments.filter(
      (attachment) => message.id === attachment.message_id
    );

    message.attachments = foundAttachments.length > 0 ? foundAttachments : undefined;
  });

  return mergedMessages;
};
