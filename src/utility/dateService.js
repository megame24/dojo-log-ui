// REFACTOR !!!!?
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
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

const getTimezone = () => {
  return dayjs.tz.guess();
};

const now = () => {
  return dayjs('2023-03-24 00:54').format();
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
  getTimezone,
  now,
};
