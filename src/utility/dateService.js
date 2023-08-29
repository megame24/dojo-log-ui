// REFACTOR !!!!?
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import * as Localization from 'expo-localization';

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
  return new Date(date);
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

const getTimelessTimestamp = (date) => {
  date = convertDateStringToDate(date);
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
};

const getStartOfDay = (date) => {
  return dayjs(date).startOf('day').toISOString();
};

const getEndOfDay = (date) => {
  return dayjs(date).endOf('day').toISOString();
};

const getTimezone = () => {
  return Localization.timezone;
};

const subtractTimeFromDate = (date, timeValue, timeMetric) => {
  return dayjs(date).subtract(timeValue, timeMetric).toDate();
};

const now = () => {
  return dayjs().toISOString();
};

export default {
  getDayOfYear,
  getDateFromDayOfYear,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,
  getTimelessTimestamp,
  formatDate,
  getTimezone,
  now,
  subtractTimeFromDate,
  getStartOfDay,
  getEndOfDay,
};
