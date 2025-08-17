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
import { MANAGER, OPERATOR } from "@/constants/constants";
import { useEffect, useState } from "react";
import handleAxiosRequest from "@/util/handleRequest";
import AxiosHCO from "@/components/axiosHOC/AxiosHCO";
import { toast } from "react-toastify";
import { toatsConfig } from "@/constants/toast";
import Navigation from "@/components/buttons/Navigation";
import { useDispatch } from "react-redux";
import { setDataChanged } from "@/redux/slices/devices";

const AREA_NAME = "areaName";
const BATCH_NAME = "batchName";
const BATCH_NO = "batchNo";
const LEAK_TEST_STATUS = "leakTestStatus";

const ParameterSetting = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
    getValues,
  } = useForm({
    resolver: yupResolver(printParameterSchema),
    mode: 'onChange',
  });

  const watchedValues = watch();

  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState(false);
  const {userDetail} = useAuthSelector();
  const [initialData, setInitialData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();
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
        setInitialData({
          ...data.printParameter,
          leakTestStatus: data.printParameter.leakTestStatus,
          printComment: ''
        }); // Store initial data for comparison
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

  useEffect(() => {
    const currentValues = getValues();
    const hasChanged = Object.keys(initialData).some(
      (key) => {
        if(key === 'printComment'){
          if(currentValues['printComment'].length !== 0) return true;
          return false;
        }
        const val = +currentValues[key];
        return val !== initialData[key]
      }
    );
    setIsChanged(isDirty && hasChanged);
  }, [watchedValues, isDirty, getValues, initialData]);

  const onSubmit = async (payloadData) => {
    try {
      await handleAxiosRequest({
        api: 'parameterSetting',
        method: 'put',
        payloadData,
      })
      toast.success('Print parameters saved successfully', toatsConfig);
      dispatch(setDataChanged());

      // ✅ Set new initial data to current values
      setInitialData(payloadData);
      
      // ✅ Reset form state to mark it as "not dirty"
      reset({...payloadData, printComment: ''});
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 flex-col justify-between">
          <div className="flex flex-col gap-5">
            <RecipeInput
              id={AREA_NAME}
              labelText={"Area Name"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={'w-full'}
              inputStyle={'w-full'}
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
              inputStyle={'w-full'}
              labelStyles={'self-start ml-8'}
              placeholder={true}
            />
            <div className="flex justify-between items-center gap-36">
              <RecipeInput
                id={BATCH_NO}
                labelText={"Batch No"}
                register={register}
                errors={errors}
                containerStyles={'w-full'}
                inputStyle={'w-full'}
                placeholder={true}
                labelStyles={'self-start ml-8'}
              />
              <Dropdown
                id={LEAK_TEST_STATUS}
                labelText={"Leak Test Status"}
                register={register}
                errors={errors}
                containerStyles={'w-full'}
                inputStyle={'w-full'}
                labelStyles={' self-start ml-8'}
                options={leakTestStatusOptions}
              />
            </div>
            <RecipeInput
              id="printComment"
              labelText={"Comment"}
              register={register}
              validationSchema={{}}
              errors={errors}
              inputStyle={'w-full'}
              containerStyles={'w-full'}
              labelStyles={' self-start ml-8'}
            />
          </div>
          <div className="flex items-center justify-between gap-28 w-full fixed bottom-10 left-0 right-0 px-16 py-10">
            <div className="flex-1/2" />
              <button
                type="submit"
                disabled={!isChanged}
                className={`${!isChanged ? 'opacity-50' : 'opacity-100'}`}
              >
                <Image
                  src={'/images/save-btn.svg'}
                  width={130}
                  height={130}
                  alt={`save recipe button`}
                />
              </button>
            <Link href={'/parameter-settings/default-parameter'}>
              <Image
                src={"/images/back_button.svg"}
                width={100}
                height={100}
                alt="back button"
              />
            </Link>
          </div>
          {/* <div className="flex items-center justify-between gap-28 w-full fixed bottom-10 left-0 right-0 px-16 py-10">
            <div className="flex-1/2" />
            <button type="submit"  disabled={!isChanged} className={`${!isChanged ? 'opacity-50' : 'opacity-100'}`}>
              <Image
                src={'/images/save-btn.svg'}
                width={130}
                height={130}
                alt={`save recipe button`}
              />
            </button>
            <Link href={'/parameter-settings/default-parameter'} className="absolute right-0">
              <Image
                src={"/images/back_button.svg"}
                width={100}
                height={100}
                alt="back button"
              />
            </Link>
          </div> */}
        </form>
      </AxiosHCO>
    </div>
  );
};

export default ParameterSetting;
