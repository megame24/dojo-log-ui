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

const getStartOfMonth = (month) => {
  return dayjs().set('month', month).startOf('month').toISOString();
};

const getEndOfMonth = (month) => {
  return dayjs().set('month', month).endOf('month').toISOString();
};

const getStartOfYear = (year) => {
  return dayjs().set('year', year).startOf('year').toISOString();
};

const getEndOfYear = (year) => {
  return dayjs().set('year', year).endOf('year').toISOString();
};

export default {
  getDayOfYear,
  getDateFromDayOfYear,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,
};
