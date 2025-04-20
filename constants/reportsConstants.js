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
    paddingTop: 100,
    paddingBottom: 70,
    paddingHorizontal: 10,
    fontSize: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid black',
    padding: 10,
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },
  logo: {
    width: 60,
    height: 40,
  },
  centerTextContainer: {
    alignItems: 'center',
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reportTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    border: '1px solid black',
    padding: 5,
    fontSize: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  footerTextGroup: {
    flexDirection: 'column',
  },
  footerText: {
    fontSize: 7,
    color: '#000',
  },
  pageNumber: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#000',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    wrap: false, // 🛡 Prevent row split
  },
  tableCol: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 3,
  },
  tableCell: {
    fontSize: 8,
  },
});
