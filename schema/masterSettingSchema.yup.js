import { bool, number, object } from "yup";

const GASKET_PRESSURE_NUMBER = 'Gasket pressure must be a number';
const GASKET_PRESSURE_NUMBER_REQUIRED = 'Gasket pressure is required';
const GASKET_PRESSURE_MIN = 'Gasket pressure must be greater than or equal to 0';
const GASKET_PRESSURE_MAX = 'Gasket pressure must be less than or equal to 200';
const GASKET_ALARM_TIME_NUMBER = 'Gasket pressure alam time must be a number';
const GASKET_ALARM_TIME_NUMBER_REQUIRED = 'Gasket pressure alam time is required';
const GASKET_ALARM_TIME_MIN = 'Gasket pressure alam time must be greater than or equal to 0';
const GASKET_ALARM_TIME_MAX = 'Gasket pressure alam time must be less than or equal to 120';
const GLOVE_ALARM_TIME_NUMBER = 'Glove pressure alam time must be a number';
const GLOVE_ALARM_TIME_NUMBER_REQUIRED = 'Glove pressure alam time is required';
const GLOVE_ALARM_TIME_MIN = 'Glove pressure alam time must be greater than or equal to 0';
const GLOVE_ALARM_TIME_MAX = 'Glove pressure alam time must be less than or equal to 600';
const PRESSURE_PURSUING_NUMBER = 'Pressure pursuing must be a number';
const PRESSURE_PURSUING_NUMBER_REQUIRED = 'Pressure pursuing is required';
const PRESSURE_PURSUING_MIN = 'Pressure pursuing must be greater than or equal to 0';
const PRESSURE_PURSUING_MAX = 'Pressure pursuing must be less than or equal to 1500';
const PRESSURE_PURSUING_ALARM_NUMBER = 'Pressure pursuing alarm time must be a number';
const PRESSURE_PURSUING_ALARM_NUMBER_REQUIRED = 'Pressure pursuing alarm time is required';
const PRESSURE_PURSUING_ALARM_MIN = 'Pressure pursuing alarm time must be greater than or equal to 0';
const PRESSURE_PURSUING_ALARM_MAX = 'Pressure pursuing alarm time must be less than or equal to 120';
const VALVE_ON_PRESSURE_NUMBER = 'Valve on pressure must be a number';
const VALVE_ON_PRESSURE_NUMBER_REQUIRED = 'Valve on pressure is required';
const VALVE_ON_PRESSURE_MIN = 'Valve on pressure must be greater than or equal to 0';
const VALVE_ON_PRESSURE_MAX = 'Valve on pressure must be less than or equal to 1500';
const VALVE_ON_TIME_NUMBER = 'Valve on time must be a number';
const VALVE_ON_TIME_NUMBER_REQUIRED = 'Valve on time is required';
const VALVE_ON_TIME_MIN = 'Valve on time must be greater than or equal to 0';
const VALVE_ON_TIME_MAX = 'Valve on time must be less than or equal to 10000';
const VALVE_OFF_TIME_NUMBER = 'Valve off time must be a number';
const VALVE_OFF_TIME_NUMBER_REQUIRED = 'Valve off time is required';
const VALVE_OFF_TIME_MIN = 'Valve off time must be greater than or equal to 0';
const VALVE_OFF_TIME_MAX = 'Valve off time must be less than or equal to 10000';

export const masterSettingSchema = object({
  gasketPressure: number().typeError(GASKET_PRESSURE_NUMBER).required(GASKET_PRESSURE_NUMBER_REQUIRED).min(0, GASKET_PRESSURE_MIN).max(200, GASKET_PRESSURE_MAX),
  gasketPressureAlarmTime: number().typeError(GASKET_ALARM_TIME_NUMBER).required(GASKET_ALARM_TIME_NUMBER_REQUIRED).min(0, GASKET_ALARM_TIME_MIN).max(120, GASKET_ALARM_TIME_MAX),
  glovePressureAlarmTime: number().typeError(GLOVE_ALARM_TIME_NUMBER).required(GLOVE_ALARM_TIME_NUMBER_REQUIRED).min(0, GLOVE_ALARM_TIME_MIN).max(600, GLOVE_ALARM_TIME_MAX),
  pressurePursuingPressure: number().typeError(PRESSURE_PURSUING_NUMBER).required(PRESSURE_PURSUING_NUMBER_REQUIRED).min(0, PRESSURE_PURSUING_MIN).max(1500, PRESSURE_PURSUING_MAX),
  pressurePursuingTime: number().typeError(PRESSURE_PURSUING_ALARM_NUMBER).required(PRESSURE_PURSUING_ALARM_NUMBER_REQUIRED).min(0, PRESSURE_PURSUING_ALARM_MIN).max(120, PRESSURE_PURSUING_ALARM_MAX),
  glovePressure: number().typeError(VALVE_ON_PRESSURE_NUMBER).required(VALVE_ON_PRESSURE_NUMBER_REQUIRED).min(0, VALVE_ON_PRESSURE_MIN).max(1500, VALVE_ON_PRESSURE_MAX),
  valveOnTime: number().typeError(VALVE_ON_TIME_NUMBER).required(VALVE_ON_TIME_NUMBER_REQUIRED).min(0, VALVE_ON_TIME_MIN).max(10000, VALVE_ON_TIME_MAX),
  valveOffTime: number().typeError(VALVE_OFF_TIME_NUMBER).required(VALVE_OFF_TIME_NUMBER_REQUIRED).min(0, VALVE_OFF_TIME_MIN).max(10000, VALVE_OFF_TIME_MAX),
});

export const maintenanceModeSchema = object({
  motor1: bool().required(),
  motor2: bool().required(),
  motor3: bool().required(),
  valve1: bool().required(),
  valve2: bool().required()
})
