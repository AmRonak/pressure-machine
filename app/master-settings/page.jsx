'use client';

import RecipeInput from "@/components/inputs/RecipeInput";
import Loading from "@/components/Loading";
import { toatsConfig } from "@/constants/toast";
import { masterSettingSchema } from "@/schema/masterSettingSchema.yup";
import handleAxiosRequest from "@/util/handleRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const GASKET_PRESSURE = "gasketPressure";
const GASKET_PRESSURE_ALARM_TIME = 'gasketPressureAlarmTime';
const GLOVE_PRESSURE_ALARM_TIME = 'glovePressureAlarmTime';
const PRESSURE_PURSUING = 'pressurePursuingPressure';
const PRESSURE_PURSUING_ALARM_TIME = 'pressurePursuingTime';
const VALVE_PRESSURE_RELEASE = 'glovePressure';
const VALVE_ON_TIME = 'valveOnTime';
const VALVE_OFF_TIME = 'valveOffTime';

const MasterSetting = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(masterSettingSchema),
    mode: "onChange"
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const { data } = await handleAxiosRequest({
          api: 'masterParameter',
        });
        delete data.createdAt;
        delete data.updatedAt;
        delete data.macId;
        delete data.id;
        reset(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, [reset, setIsError]);

  const onSubmit = async (payloadData) => {
    try {
      await handleAxiosRequest({
        api: 'masterParameter',
        method: 'put',
        payloadData,
      });
      toast.success('master parameter saved successfully', toatsConfig);
    } catch (error) {
      toast.error(error.response.data.message, toatsConfig);
    }
  }

  return (
    <div className="grid-flow-col px-16 py-20">
      <div>
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase">
          master setting
        </h1>
        <h2 className="mt-4 text-inputBlack text-sm md:text-xl lg:text-3xl font-bold uppercase">
          master parameters
        </h2>
      </div>
      {
        isLoading && <Loading />
      }
      {
        isError && (
          <div className="flex justify-center items-center">
            <p className="text-center text-red-500">Failed to master parameter data, please try sometimes later.</p>
          </div>
        )
      }
      {
        !isLoading && !isError && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-3 gap-10 py-10 my-20"
          >
            <div className="flex flex-col gap-10 flex-no-wrap">
              <RecipeInput
                id={GASKET_PRESSURE}
                labelText={"GASKET PRESSURE"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'w-full'}
                inputStyle={'w-full rounded-3xl p-5'}
                labelStyles={'self-center text-nowrap'}
              />
              <RecipeInput
                id={GASKET_PRESSURE_ALARM_TIME}
                labelText={"GASKET PRESSURE"}
                labelText2={"ALARM TIME"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'w-full'}
                inputStyle={'w-full rounded-3xl p-5'}
                labelStyles={'self-center text-nowrap'}
                textWrap={true}
              />
              <RecipeInput
                id={GLOVE_PRESSURE_ALARM_TIME}
                labelText={"GLOVE PRESSURE"}
                labelText2={"ALARM TIME"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'w-full'}
                inputStyle={'w-full rounded-3xl p-5'}
                labelStyles={'self-center text-nowrap'}
              />
            </div>
            <div className="flex flex-col gap-10 flex-no-wrap">
              <RecipeInput
                id={PRESSURE_PURSUING}
                labelText={"PRESSURE PURSUING"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'w-full'}
                inputStyle={'w-full rounded-3xl p-5'}
                labelStyles={'self-center text-nowrap'}
              />
              <RecipeInput
                id={PRESSURE_PURSUING_ALARM_TIME}
                labelText={"PRESSURE PURSUING"}
                labelText2={"ALARM TIME"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'w-full'}
                inputStyle={'w-full rounded-3xl p-5'}
                labelStyles={'self-center text-nowrap'}
              />
              <div className="flex items-center justify-center gap-4 mt-14">
                <button
                  type="submit"
                  className="flex flex-col items-center"
                >
                  <Image
                    src={'/images/save-btn.svg'}
                    width={130}
                    height={130}
                    alt={`save recipe button`}
                  />
                </button>
                <Link href={'/master-settings/maintenance-mode'}>
                  <Image
                    src={"/images/back_button.svg"}
                    width={100}
                    height={100}
                    alt="back button"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-10 flex-no-wrap">
              <RecipeInput
                id={VALVE_PRESSURE_RELEASE}
                labelText={"GLOVE PRESSURE RELEASE"}
                labelText2={"VALVE ON PRESSURE"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'w-full'}
                inputStyle={'w-full rounded-3xl p-5'}
                labelStyles={'self-center -mt-8 text-nowrap'}
              />
              <RecipeInput
                id={VALVE_ON_TIME}
                labelText={"VALVE ON TIME"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'w-full'}
                inputStyle={'w-full rounded-3xl p-5'}
                labelStyles={'self-center mt-8 text-nowrap'}
              />
              <RecipeInput
                id={VALVE_OFF_TIME}
                labelText={"VALVE OFF TIME"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'w-full'}
                inputStyle={'w-full rounded-3xl p-5'}
                labelStyles={'self-center mt-8 text-nowrap'}
              />
            </div>
          </form>
        )
      }
    </div>
  );
};

export default MasterSetting;
