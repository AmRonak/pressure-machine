'use client';

import AxiosHCO from "@/components/axiosHOC/AxiosHCO";
import Dropdown from "@/components/inputs/Dropdown";
import RecipeInput from "@/components/inputs/RecipeInput";
import { allUsers, auditReportSchema, categoryOptions, selectUser } from "@/schema/reportSchema.yup";
import handleAxiosRequest from "@/util/handleRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { pdf, Page, Text, View, Document } from "@react-pdf/renderer";
import {
  defaultStatus,
  ERROR,
  FROM_DATE,
  FROM_TIME,
  SUCCESS,
  TO_DATE,
  TO_TIME,
  USERNAME,
  CATEGORY,
  styles
} from "@/constants/reportsConstants";
import Navigation from "@/components/buttons/Navigation";
import { useAuthSelector } from "@/redux/slices/authSlice";

const AuditReports = () => {
  const [users, setUsers] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(defaultStatus);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(auditReportSchema),
    mode: 'onChange'
  });
  const { companyName } = useAuthSelector();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await handleAxiosRequest({ api: 'users/usernames' })
        const userOptions = data.map(user => ({ value: user, text: user }))
        userOptions.unshift(allUsers);
        userOptions.unshift(selectUser);
        setUsers(userOptions);
      } catch (error) {

      }
    }
    fetchAllUsers();
  }, [])

  const generatePdfDocument = (data) => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>{companyName}</Text>
        <Text style={styles.header}>Audit Report</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Date & Time</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Category</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Description</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>User Level</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Username</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Updated User</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Old Value</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>New Value</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Comment</Text></View>
          </View>
          {data.map(({
            id,
            User,
            category,
            log,
            newValue,
            oldValue,
            updatedAt,
            UpdatedUser,
            comment
          }) => (
            <View style={styles.tableRow} key={`test-${id}`}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{moment(updatedAt).format('DD-MM-YYYY HH:mm')}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{category}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{log}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{User?.userLevel}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{User?.username}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{UpdatedUser?.username || '-'}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{oldValue || '-'}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{newValue || '-'}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{comment || '-'}</Text></View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const onSubmit = async (payloadData) => {
    setIsLoading(true)
    setSearchData([]);
    setStatus(defaultStatus)
    try {
      const fromDateTime = `${moment(payloadData.fromDate).format('YYYY-MM-DD')} ${payloadData.fromTime}`;
      const toDateData = `${moment(payloadData.toDate).format('YYYY-MM-DD')} ${payloadData.toTime}`;
      const queryData = `fromDate=${fromDateTime}&toDate=${toDateData}&username=${payloadData.username}&category=${payloadData.category}`
      const { data } = await handleAxiosRequest({ api: `auditLog/filter?${queryData}` });
      const sortedLogs = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setSearchData(sortedLogs);
      setStatus({
        status: SUCCESS,
        error: data.length === 0 ? 'No logs found for the given search criteria' : null
      })
    } catch (error) {
      setStatus({
        status: ERROR,
        error: error.response.data.message
      })
    }
    setIsLoading(false)
  }

  const onDownload = async (payloadData) => {
    setIsLoading(true)
    setSearchData([]);
    setStatus(defaultStatus)
    try {
      const fromDateTime = `${moment(payloadData.fromDate).format('YYYY-MM-DD')} ${payloadData.fromTime}`;
      const toDateData = `${moment(payloadData.toDate).format('YYYY-MM-DD')} ${payloadData.toTime}`;
      const queryData = `fromDate=${fromDateTime}&toDate=${toDateData}&username=${payloadData.username}&category=${payloadData.category}`
      const { data } = await handleAxiosRequest({ api: `auditLog/filter?${queryData}` });
      const sortedLogs = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setSearchData(sortedLogs);
      const pdfDoc = generatePdfDocument(data);
      const pdfBlob = await pdf(pdfDoc).toBlob();
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'audit_report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setStatus({
        status: SUCCESS,
        error: data.length === 0 ? 'No logs found for the given search criteria' : null
      });
    } catch (error) {
      setStatus({
        status: ERROR,
        error: error.response.data.message
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="grid-flow-col px-16 py-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase">
            reports
          </h1>
          <h2 className="text-inputBlack text-sm md:text-xl lg:text-3xl font-bold uppercase">
            audit reports
          </h2>
        </div>
        <Navigation />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-20 justify-start items-start pt-10 my-5">
        <div className="flex gap-20 justify-start">
          <div className="flex flex-col gap-20">
            <div className="flex gap-8 justify-between items-center">
              <span className="font-bold text-3xl">FROM</span>
              <RecipeInput
                id={FROM_DATE}
                labelText={"DATE"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={''}
                inputStyle={"placeholder-inputBlack text-inputBlack text-center outline-none text-xl px-8 py-3 shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] rounded-lg mb-2 bg-[url('/images/bg.svg')]"}
                placeholder={false}
                type="date"
              />
              <RecipeInput
                id={FROM_TIME}
                labelText={"TIME"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={''}
                inputStyle={"placeholder-inputBlack text-inputBlack text-center outline-none text-xl px-8 py-3 shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] rounded-lg mb-2 bg-[url('/images/bg.svg')]"}
                placeholder={false}
                type="time"
              />
            </div>
          </div>
          <div className="flex flex-col gap-20">
            <div className="flex gap-8 justify-between items-center">
              <span className="font-bold text-3xl">TO</span>
              <RecipeInput
                id={TO_DATE}
                labelText={"DATE"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={''}
                inputStyle={"placeholder-inputBlack text-inputBlack text-center outline-none text-xl px-8 py-3 shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] rounded-lg mb-2 bg-[url('/images/bg.svg')]"}
                labelStyles={'capitalize text-inputBlack'}
                placeholder={false}
                type="date"
              />
              <RecipeInput
                id={TO_TIME}
                labelText={"TIME"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={''}
                inputStyle={"placeholder-inputBlack text-inputBlack text-center outline-none text-xl px-8 py-3 shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] rounded-lg mb-2 bg-[url('/images/bg.svg')]"}
                labelStyles={''}
                placeholder={false}
                type="time"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-between items-center self-start gap-20">
            <Dropdown
              id={USERNAME}
              labelText={"Username"}
              register={register}
              errors={errors}
              containerStyles={'col-span-2'}
              inputStyle={'w-48 lg:w-72 p-5'}
              options={users}
            />
            <Dropdown
              id={CATEGORY}
              labelText={"Category"}
              register={register}
              errors={errors}
              containerStyles={'col-span-2'}
              inputStyle={'w-48 lg:w-72 p-5'}
              options={categoryOptions}
            />
          </div>
        </div>
        <div className="flex justify-around items-center w-full">
          <div className="flex gap-8">
            <button id="searchBtn" type="submit" className="flex flex-col items-center">
              <Image
                src={'/images/search-btn.svg'}
                width={130}
                height={130}
                alt={`search report button`}
              />
            </button>
            <button
              id="downloadBtn"
              disabled={searchData.length === 0}
              onClick={handleSubmit(onDownload)}
              className={`flex flex-col items-center ${searchData.length === 0 && 'opacity-50 cursor-default'}`}
            >
              <Image
                src={'/images/download-btn.svg'}
                width={130}
                height={130}
                alt={`download report button`}
              />
            </button>
          </div>
          <div>
            <Link href={'/reports/'}>
              <Image
                src={"/images/back_button.svg"}
                width={100}
                height={100}
                alt="back button"
              />
            </Link>
          </div>
        </div>

      </form>
      {status.status && (
        <>
          <header className="text-2xl font-bold text-center p-2 m-2">Audit Report</header>
          <AxiosHCO isLoading={isLoading} isError={!!status.error} errorMessage={status.error || 'There\'s an error fetching search results, please try again'}>
            <table className="font-thin w-full p-4 border-collapse border border-slate-500 text-primaryDark">
              <thead className="">
                <tr className="">
                  <th className="border border-slate-600 p-2">Date & Time</th>
                  <th className="border border-slate-600 p-2">Category</th>
                  <th className="border border-slate-600 p-2">Description</th>
                  <th className="border border-slate-600 p-2">User Level</th>
                  <th className="border border-slate-600 p-2">Username</th>
                  <th className="border border-slate-600 p-2">Updated User</th>
                  <th className="border border-slate-600 p-2">Old Value</th>
                  <th className="border border-slate-600 p-2">New Value</th>
                  <th className="border border-slate-600 p-2">Comment</th>
                </tr>
              </thead>
              <tbody className="">
                {searchData.map(({
                  id,
                  User,
                  UpdatedUser,
                  category,
                  log,
                  newValue,
                  oldValue,
                  updatedAt,
                  comment
                }) => (
                  <tr key={`test-${id}`} className="text-primaryDark">
                    <td className="text-primaryDark font-normal text-center border border-slate-600 p-2">{moment(updatedAt).format('DD-MM-YYYY HH:mm')}</td>
                    <td className="text-primaryDark font-normal text-center border border-slate-600 p-2">{category ? `${category[0].toUpperCase() + category.slice(1)}`: 'General'}</td>
                    <td className="text-primaryDark font-normal text-center border border-slate-600 p-2">{log}</td>
                    <td className="text-primaryDark font-normal text-center border border-slate-600 p-2">{User?.userLevel}</td>
                    <td className="text-primaryDark font-normal text-center border border-slate-600 p-2">{User?.username}</td>
                    <td className="text-primaryDark font-normal text-center border border-slate-600 p-2">{UpdatedUser?.username || '-'}</td>
                    <td className="text-primaryDark font-normal text-center border border-slate-600 p-2">{oldValue || '-'}</td>
                    <td className="text-primaryDark font-normal text-center border border-slate-600 p-2">{newValue || '-'}</td>
                    <td className="text-primaryDark font-normal text-center border border-slate-600 p-2">{comment || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AxiosHCO>
        </>
      )}
    </div>
  );
};

export default AuditReports;
