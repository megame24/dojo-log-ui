// REFACTOR !!!!?
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

dayjs.extend(dayOfYear);

const getDayOfYear = (date) => {
  date = convertDateStringToDate(date);
  const dayOfYear = dayjs(date).dayOfYear();
  return dayOfYear;
};

const getDateFromDayOfYear = (dayOfYear) => {
  return dayjs().dayOfYear(dayOfYear);
};

const convertDateStringToDate = (date) => {
  if (typeof date === 'string') return new Date(date);
  return date;
};

export default {
  getDayOfYear,
  getDateFromDayOfYear,
};
