import { StyleSheet } from "@react-pdf/renderer";

export const FROM_DATE = 'fromDate';
export const FROM_TIME = 'fromTime';
export const TO_DATE = 'toDate';
export const TO_TIME = 'toTime';

export const USERNAME = 'username';
export const CATEGORY = 'category';

export const BATCH_NO = 'batchNo';


export const SUCCESS = 'success';
export const ERROR = 'error';

export const defaultStatus = {
  status: null,
  error: null,
};


export const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  header: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'extrabold'
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: .5,
    borderColor: 'black',
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: .5,
    borderColor: 'black',
    padding: 2,
    flex: 1,
  },
  tableCell: {
    fontSize: 8,
  },
});
