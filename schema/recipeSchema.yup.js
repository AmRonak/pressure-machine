import { number, object, string } from "yup";

export const INITIAL_PRESSURE_NUMBER = 'Initial pressure must be a number';
export const INITIAL_PRESSURE_NUMBER_REQUIRED = 'Initial pressure is required';
export const INITIAL_PRESSURE_MIN = 'Initial pressure must be greater than or equal to 0';
export const INITIAL_PRESSURE_MAX = 'Initial pressure must be less than or equal to 1500';
export const SET_PRESSURE_NUMBER = 'Set pressure must be a number';
export const SET_PRESSURE_NUMBER_REQUIRED = 'Set pressure is required';
export const SET_PRESSURE_MIN = 'Set pressure must be greater than or equal to 0';
export const SET_PRESSURE_MAX = 'Set pressure must be less than or equal to 1500';
export const LEAK_TEST_PRESSURE_NUMBER = 'Leak test pressure must be a number';
export const LEAK_TEST_PRESSURE_NUMBER_REQUIRED = 'Leak test pressure is required';
export const LEAK_TEST_PRESSURE_MIN = 'Leak test pressure must be greater than or equal to 0';
export const LEAK_TEST_PRESSURE_MAX = 'Leak test pressure must be less than or equal to 1000';
export const LOWER_TEST_PRESSURE_NUMBER = 'Lower test pressure must be a number';
export const LOWER_TEST_PRESSURE_NUMBER_REQUIRED = 'Lower test pressure is required';
export const LOWER_TEST_PRESSURE_MIN = 'Lower test pressure must be greater than or equal to 0';
export const LOWER_TEST_PRESSURE_MAX = 'Lower test pressure must be less than or equal to 1000';
export const STABILIZATION_TIME_NUMBER = 'Stabilization time must be a number';
export const STABILIZATION_TIME_NUMBER_REQUIRED = 'Stabilization time is required';
export const STABILIZATION_TIME_MIN = 'Stabilization time must be greater than or equal to 30';
export const STABILIZATION_TIME_MAX = 'Stabilization time must be less than or equal to 900';
export const STABILIZATION_CUSTOM = 'The number must be a multiple of 30 like ( 30, 60,…,900 )';
export const TEST_TIME_NUMBER = 'Test time must be a number';
export const TEST_TIME_NUMBER_REQUIRED = 'Test time is required';
export const TEST_TIME_MIN = 'Test time must be greater than or equal to 30';
export const TEST_TIME_MAX = 'Test time must be less than or equal to 900';
export const TEST_CUSTOM = 'The number must be a multiple of 30 like ( 30 sec, 60 sec,…,900 sec )';


export const recipeSchema = object({
  initialPressure: number().typeError(INITIAL_PRESSURE_NUMBER).required(INITIAL_PRESSURE_NUMBER_REQUIRED).min(0, INITIAL_PRESSURE_MIN).max(INITIAL_PRESSURE_MAX),
  setPressure: number().typeError(SET_PRESSURE_NUMBER).required(SET_PRESSURE_NUMBER_REQUIRED).min(0, SET_PRESSURE_MIN).max(1500, SET_PRESSURE_MAX),
  leakTestPressure: number().typeError(LEAK_TEST_PRESSURE_NUMBER).required(LEAK_TEST_PRESSURE_NUMBER_REQUIRED).min(0, LEAK_TEST_PRESSURE_MIN).max(1000, LEAK_TEST_PRESSURE_MAX),
  lowerTestPressure: number().typeError(LOWER_TEST_PRESSURE_NUMBER).required(LOWER_TEST_PRESSURE_NUMBER_REQUIRED).min(0, LOWER_TEST_PRESSURE_MIN).max(1000, LOWER_TEST_PRESSURE_MAX),
  stabilizationTime: number().typeError(STABILIZATION_TIME_NUMBER).required(STABILIZATION_TIME_NUMBER_REQUIRED).min(30, STABILIZATION_TIME_MIN)
                    .max(900, STABILIZATION_TIME_MAX)
                    .test(
                      'is-multiple-of-30',
                      STABILIZATION_CUSTOM,
                      value => value % 30 === 0
                    ),
  testTime: number().typeError(TEST_TIME_NUMBER).required(TEST_TIME_NUMBER_REQUIRED).min(30, TEST_TIME_MIN)
            .max(900, TEST_TIME_MAX)
            .test(
              'is-multiple-of-30',
              TEST_CUSTOM,
              value => value % 30 === 0
            ),
  comment: string(),
})