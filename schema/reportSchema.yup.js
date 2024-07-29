import { date, object, string } from "yup";

const currentDate = new Date();

export const categoryOptions = [
  {value: 'general', text: 'General'},
  {value: 'alarm', text: 'Alarm'},
]

export const selectUser = {value: 'selectUser', text: 'Select A User'};
export const allUsers = {value: '', text: 'All Users'};

const DATE_REQUIRED = 'Date is required';
const DATE_MIN = 'Date must be after than year 2000';
const DATE_MAX = `Date must be earlier than or equal ${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}` 
const TIME_REQUIRED = 'Time is required';
const BATCH_REQUIRED = 'Batch no. is required';
const USERNAME_REQUIRED = 'Username is required';

export const testReportSchema = object({
  fromDate: date().typeError(DATE_REQUIRED).required(DATE_REQUIRED).min(new Date(2000, 1, 1), DATE_MIN).max(new Date(), DATE_MAX),
  fromTime: string().required(TIME_REQUIRED),
  toDate: date().typeError(DATE_REQUIRED).required(DATE_REQUIRED).min(new Date(2000, 1, 1), DATE_MIN).max(new Date(), DATE_MAX),
  toTime: string().required(TIME_REQUIRED),
  batchNo: string().required(BATCH_REQUIRED)
})

export const auditReportSchema = object({
  fromDate: date().typeError(DATE_REQUIRED).required(DATE_REQUIRED).min(new Date(2000, 1, 1), DATE_MIN).max(new Date(), DATE_MAX),
  fromTime: string().required(TIME_REQUIRED),
  toDate: date().typeError(DATE_REQUIRED).required(DATE_REQUIRED).min(new Date(2000, 1, 1), DATE_MIN).max(new Date(), DATE_MAX),
  toTime: string().required(TIME_REQUIRED),
  username: string().notOneOf([selectUser], USERNAME_REQUIRED)
})