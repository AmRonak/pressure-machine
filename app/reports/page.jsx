'use client';

import AxiosHCO from "@/components/axiosHOC/AxiosHCO";
import RecipeInput from "@/components/inputs/RecipeInput";
import { testReportSchema } from "@/schema/reportSchema.yup";
import handleAxiosRequest from "@/util/handleRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BATCH_NO, defaultStatus, ERROR, FROM_DATE, FROM_TIME, SUCCESS, TO_DATE, TO_TIME, styles } from "@/constants/reportsConstants";
import Navigation from "@/components/buttons/Navigation";
import MainTestReport from "@/components/Report/MainTestReport";

const TestReports = () => {
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(defaultStatus);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(testReportSchema),
    mode: 'onChange'
  });

  const onSubmit = async (payloadData) => {
    try {
      setIsLoading(true)
      setSearchData([]);
      setStatus(defaultStatus)
      const fromDateTime = `${moment(payloadData.fromDate).format('YYYY-MM-DD')} ${payloadData.fromTime}`;
      const toDateData = `${moment(payloadData.toDate).format('YYYY-MM-DD')} ${payloadData.toTime}`;
      const queryData = `starttesttime=${fromDateTime}&endtesttime=${toDateData}&batchid=${payloadData.batchNo}`
      const { data } = await handleAxiosRequest({api: `logs?${queryData}`});
      setSearchData(data);
      
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
  
  let childFunctionRef = null;

  const handleDownloadPDF = () => {
    // Invoke the function in the child component
    if (childFunctionRef) {
      childFunctionRef();
    }
  };

  return (
    <div className="grid-flow-col px-16 py-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase">
            reports
          </h1>
          <h2 className="text-inputBlack text-sm md:text-xl lg:text-3xl font-bold uppercase">
            test reports
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
          <RecipeInput
            id={BATCH_NO}
            labelText={"Batch No"}
            register={register}
            errors={errors}
            inputStyle={'rounded-3xl p-5  bg-[url("/images/bg.svg")]'}
            labelStyles={''}
            placeholder={true}
            containerStyles={"flex-row"}
          />
        </div>
        <div className="flex justify-around items-center w-full">
          <div className="flex gap-8">
            <button id="searchBtn" type="submit" className="flex flex-col items-center">
              <Image
                src={'/images/search-btn.svg'}
                width={130}
                height={130}
                alt={`save recipe button`}
              />
            </button>
            <button
              id="downloadBtn"
              disabled={!searchData?.length}
              onClick={handleSubmit(handleDownloadPDF)}
              className={`flex flex-col items-center ${!searchData?.length && 'opacity-60'}`}
            >
              <Image
                src={'/images/download-btn.svg'}
                width={130}
                height={130}
                alt={`save recipe button`}
              />
            </button>
          </div>
          <div>
            <Link href={'/reports/audit'}>
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
      { status.status && (
        <>
          <AxiosHCO isLoading={isLoading} isError={!!status.error} errorMessage={status?.error || 'There\'s an error fetching search results, please try again'}>
            <MainTestReport
              searchData={searchData}
              handleDownloadPDF={(func) => (childFunctionRef = func)}
            />
          </AxiosHCO>
        </>
      )}
    </div>
  );
};

export default TestReports;
