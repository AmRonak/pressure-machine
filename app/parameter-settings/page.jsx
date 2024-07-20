'use client';

import RecipeInput from "@/components/inputs/RecipeInput";
import Loading from "@/components/Loading";
import { MANAGER, OPERATOR } from "@/constants/constants";
import { useAuthSelector } from "@/redux/slices/authSlice";
import { defaultParameterSchema } from "@/schema/parameterSettingSchema.yup";
import handleAxiosRequest from "@/util/handleRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const COMPANY_NAME = "companyName";
const DEPARTMENT_NAME = "departmentName";
const EQUIPMENT_NAME = "equipmentName";
const EQUIPMENT_NUMBER = "equipmentSerialNo";

export const PRINT_PARAMETER_PATH = '/parameter-settings/print-parameter';

const ParameterSetting = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(defaultParameterSchema),
    mode: "onChange"
  });
  const [isLoading, setIsLoading] = useState();
  const {userDetail} = useAuthSelector();
  const router = useRouter(PRINT_PARAMETER_PATH);

  useEffect(() => {
    const { userLevel } = userDetail;
    if(userLevel === MANAGER || userLevel === OPERATOR) {
      router.push('/')
    }
  }, [router, userDetail])

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const { data } = await handleAxiosRequest({
          api: 'parameterSetting',
          method: 'get',
        });
        reset(data.defaultParameter);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, [reset]);

  const onSubmit = async (payloadData) => {
    await handleAxiosRequest({
      api: 'parameterSetting',
      method: 'put',
      payloadData,
    })
  }

  return (
    <div className="grid-flow-col px-16 py-20">
      <div>
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase">
          parameter setting
        </h1>
        <h2 className="text-inputBlack text-sm md:text-xl lg:text-3xl font-bold uppercase">
          default parameter
        </h2>
      </div>
      { isLoading && <Loading /> }
      { !isLoading && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-20 justify-between py-20 my-10">
          <div className="flex flex-col gap-20">
            <RecipeInput
              id={COMPANY_NAME}
              labelText={"Company Name"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={'w-full'}
              inputStyle={'w-full rounded-full p-5'}
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
              inputStyle={'w-full rounded-full p-5'}
              labelStyles={'self-start ml-8'}
              placeholder={true}
            />
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-36">
                <RecipeInput
                  id={EQUIPMENT_NAME}
                  labelText={"Equipment Name"}
                  register={register}
                  validationSchema={{}}
                  errors={errors}
                  containerStyles={'w-48 lg:w-72'}
                  inputStyle={'w-48 lg:w-72 p-5'}
                  placeholder={true}
                  />
                <RecipeInput
                  id={EQUIPMENT_NUMBER}
                  labelText={"Equipment Serial Number"}
                  register={register}
                  validationSchema={{}}
                  errors={errors}
                  containerStyles={''}
                  inputStyle={'w-48 lg:w-72 p-5'}
                  textWrap={false}
                  placeholder={true}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center self-end gap-4">
            <Link href={PRINT_PARAMETER_PATH}>
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
      )}
    </div>
  );
};

export default ParameterSetting;
