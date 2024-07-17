import * as yup from "yup";

export const BEFORE = 'before';
export const AFTER = 'after';

export const leakTestStatusOptions = [
  {value: BEFORE, text: 'Before'},
  {value: AFTER, text: 'After'},
];

const COMPANY_NAME_REQUIRED = 'Company name is required';
const COMPANY_NAME_MIN = 'Company name must be at least 3 characters';
const DEPARTMENT_NAME_REQUIRED = 'Department name is required';
const DEPARTMENT_NAME_MIN = 'Department name must be at least 3 characters';
const EQUIPMENT_NAME_REQUIRED = 'Equipment name is required';
const EQUIPMENT_NAME_MIN = 'Equipment name must be at least 3 characters';
const EQUIPMENT_SERIAL_NO_REQUIRED = 'Equipment serial No. is required';
const EQUIPMENT_SERIAL_NO_MIN = 'Equipment serial No. must be at least 3 characters';
const AREA_NAME_REQUIRED = 'Area name is required';
const AREA_NAME_MIN = 'Area name must be at least 3 characters';
const BATCH_NAME_REQUIRED = 'Batch name is required';
const BATCH_NAME_MIN = 'Batch name must be at least 3 characters';
const BATCH_NO_REQUIRED = 'Batch No. is required';
const BATCH_NO_MIN = 'Batch No. must be at least 3 characters';
const LEAT_TEST_STATUS_REQUIRED = 'Leak test status is required';
const LEAT_TEST_STATUS_ONE_OF = 'Leak test status must be one of the following values: Before, After';

export const defaultParameterSchema = yup.object({
  companyName: yup.string().min(3, COMPANY_NAME_MIN).required(COMPANY_NAME_REQUIRED),
  departmentName: yup.string().min(3, DEPARTMENT_NAME_MIN).required(DEPARTMENT_NAME_REQUIRED),
  equipmentName: yup.string().min(3, EQUIPMENT_NAME_MIN).required(EQUIPMENT_NAME_REQUIRED),
  equipmentSerialNo: yup.string().min(3, EQUIPMENT_SERIAL_NO_MIN).required(EQUIPMENT_SERIAL_NO_REQUIRED),
});

export const printParameterSchema = yup.object({
  areaName: yup.string().min(3, AREA_NAME_MIN).required(AREA_NAME_REQUIRED),
  batchName: yup.string().min(3, BATCH_NAME_MIN).required(BATCH_NAME_REQUIRED),
  batchNo: yup.string().min(3, BATCH_NO_MIN).required(BATCH_NO_REQUIRED),
  leakTestStatus: yup.string().required(LEAT_TEST_STATUS_REQUIRED).oneOf([BEFORE, AFTER], LEAT_TEST_STATUS_ONE_OF),
})