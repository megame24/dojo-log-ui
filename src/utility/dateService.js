// REFACTOR !!!!?
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
dayjs.extend(dayOfYear);

const formatDate = (date, format = 'L') => {
  return dayjs(date).format(format);
};

const getDayOfYear = (date) => {
  date = convertDateStringToDate(date);
  const dayOfYear = dayjs(date).dayOfYear();
  return dayOfYear;
};

const getDateFromDayOfYear = (year, dayOfYear) => {
  return dayjs().set('year', year).dayOfYear(dayOfYear);
};

const convertDateStringToDate = (date) => {
  if (typeof date === 'string') return new Date(date);
  return date;
};

const getStartOfMonth = (year, month) => {
  return dayjs()
    .set('year', year)
    .set('month', month)
    .startOf('month')
    .toISOString();
};

const getEndOfMonth = (year, month) => {
  return dayjs()
    .set('year', year)
    .set('month', month)
    .endOf('month')
    .toISOString();
};

const getStartOfYear = (year) => {
  return dayjs().set('year', year).startOf('year').toISOString();
};

const getEndOfYear = (year) => {
  return dayjs().set('year', year).endOf('year').toISOString();
};

const getDateInUTC = (date) => {
  date = convertDateStringToDate(date);
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
};

export default {
  getDayOfYear,
  getDateFromDayOfYear,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,
  getDateInUTC,
  formatDate,
};
