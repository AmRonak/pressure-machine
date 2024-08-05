import {
  AUTO_LOGOUT_TIME_POSITIVE,
  AUTO_LOGOUT_TIME_REQUIRED,
  AUTO_UNBLOCK_TIME_POSITIVE,
  AUTO_UNBLOCK_TIME_REQUIRED,
  CONFIRM_PASSWORD_REQUIRED,
  CONFIRM_PIN_REQUIRED,
  EXPIRY_DAYS_POSITIVE,
  EXPIRY_DAYS_REQUIRED,
  NEW_PASSWORD_REQUIRED,
  NO_OF_ATTEMPT_POSITIVE,
  NO_OF_ATTEMPT_REQUIRED,
  OLD_PASSWORD_REQUIRED,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_EXPIRY_POSITIVE,
  PASSWORD_EXPIRY_REQUIRED,
  PASSWORD_MATCH,
  PASSWORD_REQUIRED,
  PIN_LENGTH_ERROR_MESSAGE,
  PIN_MATCH,
  PIN_NUMBER,
  PIN_REQUIRED,
  SUPER_ADMIN,
  USERLEVEL_REQUIRED,
  userLevels,
  USERNAME_ERROR_MESSAGE,
  USERNAME_REQUIRED
} from "@/constants/constants";
import * as yup from "yup";

const passwordPattern = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const isPositiveNumberTest = (val) => val >= 0

export const userManagementSchema = yup.object({
  username: yup.string().required(USERNAME_REQUIRED).min(3, USERNAME_ERROR_MESSAGE).max(30, USERNAME_ERROR_MESSAGE),
  password: yup.string().required(PASSWORD_REQUIRED).matches(passwordPattern,PASSWORD_ERROR_MESSAGE),
  pin: yup.string().required(PIN_REQUIRED).matches(/^\d+$/, PIN_NUMBER).length(4, PIN_LENGTH_ERROR_MESSAGE),
  confirmPassword: yup.string().required(CONFIRM_PASSWORD_REQUIRED).oneOf([yup.ref('password')], PASSWORD_MATCH),
  confirmPin: yup.string().required(CONFIRM_PIN_REQUIRED).oneOf([yup.ref('pin')], PIN_MATCH).matches(/^\d+$/, PIN_NUMBER).length(4, PIN_LENGTH_ERROR_MESSAGE),
  userLevel: yup.string().required(USERLEVEL_REQUIRED).oneOf([...userLevels, SUPER_ADMIN], USERLEVEL_REQUIRED),
  autoUnblockTime: yup.string().required(AUTO_UNBLOCK_TIME_REQUIRED).test('unblockTime', AUTO_UNBLOCK_TIME_POSITIVE, isPositiveNumberTest),
  attempts: yup.string().required(NO_OF_ATTEMPT_REQUIRED).test('attempts', NO_OF_ATTEMPT_POSITIVE, isPositiveNumberTest),
  autoLogoutTime: yup.string().required(AUTO_LOGOUT_TIME_REQUIRED).test('autoLogoutTime', AUTO_LOGOUT_TIME_POSITIVE, isPositiveNumberTest),
  passwordExpiry: yup.string().required(PASSWORD_EXPIRY_REQUIRED).test('passwordExpiry', PASSWORD_EXPIRY_POSITIVE, isPositiveNumberTest),
  expiryDaysNotification: yup.string().required(EXPIRY_DAYS_REQUIRED).test('expiryDaysNotification', EXPIRY_DAYS_POSITIVE, isPositiveNumberTest),
  comments: yup.string()
});

export const passwordChangeSchema = yup.object({
  currentPassword: yup.string().required(OLD_PASSWORD_REQUIRED).matches(passwordPattern,PASSWORD_ERROR_MESSAGE),
  newPassword: yup.string().required(NEW_PASSWORD_REQUIRED).matches(passwordPattern,PASSWORD_ERROR_MESSAGE),
  confirmPassword: yup.string().required(CONFIRM_PASSWORD_REQUIRED).oneOf([yup.ref('newPassword')], PASSWORD_MATCH),
})

export const loginSchema = yup.object({
  username: yup.string().required(USERNAME_REQUIRED).min(3, USERNAME_ERROR_MESSAGE).max(30, USERNAME_ERROR_MESSAGE),
  password: yup.string().required(PASSWORD_REQUIRED).matches(passwordPattern,PASSWORD_ERROR_MESSAGE),
})