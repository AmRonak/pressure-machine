export const JWT_TOKEN_NAME = 'jwtToken';
export const ADMINISTRATOR = 'Administrator';
export const SUPERVISOR = 'Supervisor';
export const MANAGER = 'Manager';
export const OPERATOR = 'Operator';
export const SUPER_ADMIN = 'SuperAdmin';
export const userLevels = [ADMINISTRATOR, SUPERVISOR, MANAGER, OPERATOR];

// ERROR MESSAGES CONSTANTS
export const USERNAME_REQUIRED = 'Username is required';
export const PASSWORD_REQUIRED = 'Password is required';
export const OLD_PASSWORD_REQUIRED = 'Old password is required';
export const NEW_PASSWORD_REQUIRED = 'New password is required';
export const PASSWORD_ERROR_MESSAGE = 'Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character';
export const USERNAME_ERROR_MESSAGE = 'Username must be 3-30 characters long';
export const PIN_REQUIRED = 'Pin is required';
export const CONFIRM_PIN_REQUIRED = 'Confirm pin is required';
export const PIN_NUMBER = "Pin must be a number";
export const PIN_LENGTH_ERROR_MESSAGE = 'Pin must be length of 4';
export const CONFIRM_PASSWORD_REQUIRED = 'Confirm Password is required';
export const PASSWORD_MATCH = 'Passwords must match';
export const SAME_PASSWORD_MATCH = 'Old passwords can\'t be used as New Password';
export const PIN_MATCH = 'Pins must match';
export const USERLEVEL_REQUIRED = 'Userlevel is required';
export const AUTO_UNBLOCK_TIME_REQUIRED = 'Auto unblock time is required';
export const NO_OF_ATTEMPT_REQUIRED = 'No of attemps is required';
export const AUTO_LOGOUT_TIME_REQUIRED = 'Auto logout time is required';
export const PASSWORD_EXPIRY_REQUIRED = 'Password expiry is required';
export const EXPIRY_DAYS_REQUIRED = 'Expiry days notification is required';
export const AUTO_UNBLOCK_TIME_POSITIVE = 'Auto unblock time must be positive';
export const NO_OF_ATTEMPT_POSITIVE = 'No of attempts must be positive';
export const AUTO_LOGOUT_TIME_POSITIVE = 'Auto logout time must be positive';
export const PASSWORD_EXPIRY_POSITIVE = 'Password expiry must be positive and greater than Expiry Days Notification';
export const EXPIRY_DAYS_POSITIVE = 'Expiry days notification must be positive and less than Expiry Days Notification';

// common field Name
export const COMMENT = 'comment';
