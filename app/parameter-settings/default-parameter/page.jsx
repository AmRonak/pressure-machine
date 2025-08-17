'use client';

import AxiosHCO from "@/components/axiosHOC/AxiosHCO";
import Navigation from "@/components/buttons/Navigation";
import RecipeInput from "@/components/inputs/RecipeInput";
import { COMMENT, MANAGER, OPERATOR } from "@/constants/constants";
import { toatsConfig } from "@/constants/toast";
import { setCompanyName, useAuthSelector } from "@/redux/slices/authSlice";
import { defaultParameterSchema } from "@/schema/parameterSettingSchema.yup";
import handleAxiosRequest from "@/util/handleRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setDataChanged } from "@/redux/slices/devices";

const COMPANY_NAME = "companyName";
const DEPARTMENT_NAME = "departmentName";
const EQUIPMENT_NAME = "equipmentName";
const EQUIPMENT_NUMBER = "equipmentSerialNo";

export const PRINT_PARAMETER_PATH = '/parameter-settings';

const ParameterSetting = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
    getValues,
  } = useForm({
    resolver: yupResolver(defaultParameterSchema),
    mode: "onChange"
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
        setInitialData({...data.defaultParameter, defaultComment: ''}); // Store initial data for comparison
        reset({...data.defaultParameter, defaultComment: ''});
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
        if(key === 'defaultComment'){
          if(currentValues['defaultComment'].length !== 0) return true;
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
      });
      toast.success('Default parameters saved successfully', toatsConfig);
      dispatch(setDataChanged());

      // ✅ Set new initial data to current values
      setInitialData(payloadData);
      
      // ✅ Reset form state to mark it as "not dirty"
      reset({...payloadData, defaultComment: ''});
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
            default parameter
          </h2>
        </div>
        <Navigation />
      </div>
      <AxiosHCO isLoading={isLoading} isError={isError} errorMessage="Failed to load recipe data, please try sometimes later.">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 flex-col justify-between vh-100">
          <div className="flex flex-col gap-5 col-span-10">
            <RecipeInput
              id={COMPANY_NAME}
              labelText={"Company Name"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={'w-full'}
              inputStyle={'w-full'}
              labelStyles={'self-start ml-8'}
              placeholder={true}
            />
            <RecipeInput
              id={DEPARTMENT_NAME}
              labelText={"Department Name"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={'w-full'}
              inputStyle={'w-full'}
              labelStyles={'self-start ml-8'}
              placeholder={true}
            />
            <RecipeInput
              id={EQUIPMENT_NAME}
              labelText={"Equipment Name"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={'w-full lg:w-full'}
              inputStyle={'w-full lg:w-full'}
              placeholder={true}
              labelStyles={'self-start ml-8'}
            />
            <RecipeInput
              id={EQUIPMENT_NUMBER}
              labelText={"Equipment Serial No"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={'w-full lg:w-full'}
              inputStyle={'w-full lg:w-full'}
              placeholder={true}
              labelStyles={'self-start ml-8'}
            />
            <RecipeInput
              id='defaultComment'
              labelText={"Comment"}
              register={register}
              validationSchema={{}}
              errors={errors}
              inputStyle={'w-full'}
              placeholder={"Comment"}
              containerStyles={'w-full'}
              labelStyles={'self-start ml-8'}
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
            <Link
              href={PRINT_PARAMETER_PATH}
              className=""
            >
              <Image
                src={"/images/back_button.svg"}
                width={100}
                height={100}
                alt="back button"
              />
            </Link>
          </div>
        </form>
      </AxiosHCO>
    </div>
  );
};

export default ParameterSetting;
