import { IAttachment, IMessage } from "@interfaces/entities";
import { format, formatDistanceToNow, isToday, isThisWeek, subDays, subMinutes } from 'date-fns';
import { ru } from "date-fns/locale";

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const parseTimeForChat = (time: string) => {
  const date = new Date(time);

  if (isToday(date)) {
    return format(date, 'HH:mm');
  } else if (isThisWeek(date)) {
    return days[date.getDay()];
  } else {
    return format(date, 'dd.MM.yyyy');
  }
};

export const parseTimeForStatus = (time: string) => {
  const date = new Date(time);

  if (date > subMinutes(new Date(), 60)) {
    const minutesAgo = formatDistanceToNow(date, { includeSeconds: false, locale: ru });
    return `был в сети ${minutesAgo} назад`;
  }
  
  if (date > subDays(new Date(), 1)) {
    return `был в сети ${format(date, 'HH:mm')}`;
  }

  if (date > subDays(new Date(), 2)) {
    return 'был в сети вчера';
  }

  return `был в сети ${format(date, 'dd.MM.yyyy')}`;
};

export const parseTimeForMessage = (time: string) => {
  const date = new Date(time);
  return format(date, 'HH:mm');
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
