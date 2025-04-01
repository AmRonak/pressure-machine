import { useAuthSelector } from "@/redux/slices/authSlice";
import moment from "moment";
import Image from "next/image";
import React from "react";

const TestReport = ({
  userid,
  deviceid,
  starttesttime,
  endtesttime,
  data,
}) => {
  const {userDetail : {
    userLevel,
    username
  }} = useAuthSelector();
  const {
    companyName,
    End_Pressure,
    Pressure_Data,
    Result,
    set_Pressure,
    stabilization_Time,
    Start_Pressure,
    department_Name,
    area_Name,
    equipment_Name,
    batch_No,
    initial_Pressure,
    Differance_Pressure,
    Test_Time,
    leak_Test_Pressure,
    lower_Test_Pressure,
    Glove_No,
    leakTestStatus,
    serial_No,
  } = data;

  const rows = [];
  for (let i = 0; i < Pressure_Data.length; i += 7) {
    rows.push(Pressure_Data.slice(i, i + 7));
  }

  return (
    <>
      <div className="container  mx-auto font-sans border-2 border-black">
        {/* Header Section */}
        <div className="border-b-4 border-black w-full flex items-stretch">
          <div className="w-60 border-r-2 border-black flex items-center justify-center p-1">
            <p className="text-center text-black font-bold p-2 text-lg">
              <Image
                src='/images/clientLogo.svg'
                alt="background image"
                className="object-fill"
                width={0}
                height={0}
                quality={80}
                style={{ width: '100px', height: '80px' }}
              />
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-1">
            <p className="text-center text-black font-bold text-xl p-1">{companyName}</p>
            <p className="text-center text-black font-bold text-xl p-1">GLOVE LEAK TEST REPORT</p>
          </div>
          <div className="w-60 border-l-2 border-black flex items-center justify-center p-1">
            <p className="text-center text-black font-bold text-lg p-2">
              <Image
                src='/images/clientLogo.svg'
                alt="background image"
                className="object-fill"
                width={0}
                height={0}
                quality={80}
                style={{ width: '100px', height: '80px' }}
              />
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="border-y-4 border-black my-4">
          <table className="w-full">
            <tbody className="">
              <tr className="border-b-2 border-black">
                  <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Department Name</td>
                  <td className="text-black w-96 border-r-2 border-black p-1">{department_Name}</td>
                  <td className="text-black w-60 border-r-2 border-black p-1 font-bold">User Id</td>
                  <td className="text-black w-96 p-1">{deviceid}</td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Area Name</td>
                <td className="text-black w-96 border-r-2 border-black p-1">{area_Name}</td>
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Test Start Time</td>
                <td className="text-black w-96 p-1">{moment(starttesttime).format('DD/MM/YYYY HH:mm:ss')}</td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Equipment Name</td>
                <td className="text-black w-96 border-r-2 border-black p-1">{equipment_Name}</td>
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Test End Time</td>
                <td className="text-black w-96 p-1">{moment(endtesttime).format('DD/MM/YYYY HH:mm:ss')}</td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Equipment Id</td>
                <td className="text-black w-96 border-r-2 border-black p-1">{deviceid}</td>
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Total Test Time</td>
                <td className="text-black w-96 p-1">{Test_Time}</td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">GLT Sr No</td>
                <td className="text-black w-96 border-r-2 border-black p-1">{serial_No}</td>
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Glove No</td>
                <td className="text-black w-96 p-1">{Glove_No}</td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Batch No</td>
                <td className="text-black w-96 border-r-2 border-black p-1">{batch_No}</td>
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Result</td>
                <td className="text-black w-96 p-1 font-bold">
                  {Result === 'PASS' && <span className="font-normal text-green-500">PASS</span>}
                  {Result === 'FAIL' && <span className="font-normal text-red-500">FAIL</span>}
                </td>
              </tr>
              <tr>
                <td className="text-black border-r-2 border-black p-1 font-bold">Test Status</td>
                <td className="text-black border-r-2 border-black p-1">{leakTestStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Set Parameter Section */}
        <div className="border-y-4 border-black my-4">
          <div className="font-bold border-b-2 border-black text-black p-1 pl-2">Set Parameter (Recipe):</div>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-black">
                <td className="text-black w-60 border-r-2 border-b-2 border-black p-1 font-bold">Initial Pressure:</td>
                <td className="text-black w-96 border-r-2 border-b-2 border-black p-1">{initial_Pressure} Pa</td>
                <td className="text-black w-60 border-r-2 border-b-2 border-black p-1 font-bold">Stabilization Time:</td>
                <td className="text-black w-96 border-b-2 border-black p-1">{stabilization_Time} Sec</td>
              </tr>
              <tr className="border-b border-black">
                <td className="text-black w-60 border-r-2 border-b-2 border-black p-1 font-bold">Set Pressure:</td>
                <td className="text-black w-96 border-r-2 border-b-2 border-black p-1">{set_Pressure} Pa</td>
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Leak Test Time:</td>
                <td className="text-black w-96 border-b-2 border-black p-1">{Test_Time} Sec</td>
              </tr>
              <tr>
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Lower Test Limit:</td>
                <td className="text-black w-96 border-r-2 border-black p-1">{lower_Test_Pressure} Pa</td>
                <td className="text-black w-60 border-r-2 border-black p-1 font-bold">Leak Test Limit:</td>
                <td className="text-black w-96 border-black p-1">{leak_Test_Pressure} Pa</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Measurement Overview Section */}
        <div className="border-y-2 border-black">
          <h3 className="font-bold mb-2 p-2 text-black">Overview Point of Measurement Every 5 Seconds: (Pa)</h3>
          <table className="w-full">
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, idx) => (
                    <React.Fragment key={idx}>
                      <td className="text-black p-1 text-center font-bold">{rowIndex*7 + idx + 1}</td>
                      <td className="text-black p-1 text-center">{value}</td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Test Result Section */}
        <div className="p-1 m-2">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-black p-1">Test Start Point</td>
                <td className="text-black">{Start_Pressure} Pa</td>
              </tr>
              <tr>
                <td className="text-black p-1">Test End Point</td>
                <td className="text-black">{End_Pressure} Pa</td>
              </tr>
              <tr>
                <td className="text-black p-1">Difference</td>
                <td className="text-black">{Differance_Pressure} Pa</td>
              </tr>
              <tr>
                <td className="text-black p-1">Test Result</td>
                <td className="text-black">
                  {Result === 'PASS' && <span className="font-normal text-green-500">PASS</span>}
                  {Result === 'FAIL' && <span className="font-normal text-red-500">FAIL</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        <div className="flex justify-around border-t-2 border-black p-2 mb-14 text-center">
          <div>
            <p className="text-black">Checked By:</p>
            <p className="text-black">(MFG)</p>
          </div>
          <div>
            <p className="text-black">Verified By:</p>
            <p className="text-black">(MFG)</p>
          </div>
          <div>
            <p className="text-black">Reviewed By: (QA)</p>
            <p className="text-black">(MFG)</p>
          </div>
        </div>
      </div>

      <div className="text-center p-1 border-2 border-t-0 border-black">
        <p className="text-black">REPORT PRINTED BY ({username}): {userLevel}</p>
        <p className="text-black">REPORT PRINT DATE & TIME: {moment().format('DD/MM/YYYY & hh:mm:ss')}</p>
      </div>
    </>
  );
};

export default TestReport;
