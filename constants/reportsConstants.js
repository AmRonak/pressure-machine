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
    padding: 30,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
    flex: 1,
  },
  tableCell: {
    fontSize: 10,
  },
});
