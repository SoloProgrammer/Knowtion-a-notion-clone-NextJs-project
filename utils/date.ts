import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getFromNowDate = (date: Date | number | string) => {
  return dayjs(date).fromNow();
};
