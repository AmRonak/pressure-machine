'use client';

import Dropdown from "@/components/inputs/Dropdown";
import RecipeInput from "@/components/inputs/RecipeInput";
import { useAuthSelector } from "@/redux/slices/authSlice";
import { leakTestStatusOptions, printParameterSchema } from "@/schema/parameterSettingSchema.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PRINT_PARAMETER_PATH } from "../page";
import { COMMENT, MANAGER, OPERATOR } from "@/constants/constants";
import { useEffect, useState } from "react";
import handleAxiosRequest from "@/util/handleRequest";
import AxiosHCO from "@/components/axiosHOC/AxiosHCO";
import { toast } from "react-toastify";
import { toatsConfig } from "@/constants/toast";
import Navigation from "@/components/buttons/Navigation";

const AREA_NAME = "areaName";
const BATCH_NAME = "batchName";
const BATCH_NO = "batchNo";
const LEAK_TEST_STATUS = "leakTestStatus";

const ParameterSetting = () => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(printParameterSchema),
    mode: 'onChange',
  });

  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState(false);
  const {userDetail} = useAuthSelector();
  const router = useRouter(PRINT_PARAMETER_PATH);

  useEffect(() => {
    const { userLevel } = userDetail;
    if(userLevel === MANAGER || userLevel === OPERATOR) {
      router.push('/')
    }
  }, [router, userDetail])

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const { data } = await handleAxiosRequest({
          api: 'parameterSetting',
          method: 'get',
        });
        reset({
          ...data.printParameter,
          leakTestStatus: data.printParameter.leakTestStatus,
          printComment: ''
        });
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, [reset]);

  const onSubmit = async (payloadData) => {
    try {
      await handleAxiosRequest({
        api: 'parameterSetting',
        method: 'put',
        payloadData,
      })
      toast.success('Print parameters saved successfully', toatsConfig);
      resetField('printComment', '');
    } catch (error) {
      toast.error(error.response.data.message, toatsConfig);
    }
  }

  return (
    <div className="grid-flow-col px-16 py-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase">
            parameter setting
          </h1>
          <h2 className="text-inputBlack text-sm md:text-xl lg:text-3xl font-bold uppercase">
            print parameter
          </h2>
        </div>
        <Navigation />
      </div>
      <AxiosHCO isLoading={isLoading} isError={isError} errorMessage="Failed to load recipe data, please try sometimes later.">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-20 justify-between py-10">
          <div className="flex flex-col gap-20">
            <RecipeInput
              id={AREA_NAME}
              labelText={"Area Name"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={'w-full'}
              inputStyle={'w-full rounded-full p-5'}
              labelStyles={'self-start ml-8'}
              placeholder={true}
            />
            <RecipeInput
              id={BATCH_NAME}
              labelText={"Batch Name"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={'w-full'}
              inputStyle={'w-full rounded-full p-5'}
              labelStyles={'self-start ml-8'}
              placeholder={true}
            />
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-36">
                <RecipeInput
                  id={BATCH_NO}
                  labelText={"Batch No"}
                  register={register}
                  errors={errors}
                  containerStyles={'w-48 lg:w-72'}
                  inputStyle={'w-48 lg:w-72 p-5'}
                  placeholder={true}
                />
                <Dropdown
                  id={LEAK_TEST_STATUS}
                  labelText={"Leak Test Status"}
                  register={register}
                  errors={errors}
                  containerStyles={'col-span-2'}
                  inputStyle={'w-48 lg:w-72 p-5'}
                  options={leakTestStatusOptions}
                />
              </div>
            </div>
            <RecipeInput
              id="printComment"
              labelText={"COMMENT"}
              register={register}
              validationSchema={{}}
              errors={errors}
              inputStyle={'w-full'}
              containerStyles={'w-full'}
            />
          </div>
          <div className="flex flex-col items-center self-end gap-4">
            <Link href={'/parameter-settings'}>
                <Image
                  src={"/images/back_button.svg"}
                  width={100}
                  height={100}
                  alt="back button"
                />
              </Link>
            <button type="submit" className="flex flex-col items-center">
              <Image
                src={'/images/save-btn.svg'}
                width={130}
                height={130}
                alt={`save recipe button`}
              />
            </button>
          </div>
        </form>
      </AxiosHCO>
    </div>
  );
};

export default ParameterSetting;
