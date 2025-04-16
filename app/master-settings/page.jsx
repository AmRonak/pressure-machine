"use client";

import Navigation from "@/components/buttons/Navigation";
import RecipeInput from "@/components/inputs/RecipeInput";
import Loading from "@/components/Loading";
import { toatsConfig } from "@/constants/toast";
import { masterSettingSchema } from "@/schema/masterSettingSchema.yup";
import handleAxiosRequest from "@/util/handleRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setDataChanged } from "@/redux/slices/devices";

const GASKET_PRESSURE = "gasketPressure";
const GASKET_PRESSURE_ALARM_TIME = "gasketPressureAlarmTime";
const GLOVE_PRESSURE_ALARM_TIME = "glovePressureAlarmTime";
const PRESSURE_PURSUING = "pressurePursuingPressure";
const PRESSURE_PURSUING_REPEAT_TIME = "pressurePursuingTime";
const VALVE_PRESSURE_RELEASE = "glovePressure";
const VALVE_ON_TIME = "valveOnTime";
const VALVE_OFF_TIME = "valveOffTime";

const MasterSetting = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
    getValues,
  } = useForm({
    resolver: yupResolver(masterSettingSchema),
    mode: "onChange",
    values: {
      setPressure: 0,
      ...initialData,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const { data } = await handleAxiosRequest({
          api: "masterParameter",
        });
        const { data: recipeSettings } = await handleAxiosRequest({
          api: "recipeSetting",
        });

        delete data.createdAt;
        delete data.updatedAt;
        delete data.macId;
        delete data.id;
        setInitialData({
          ...data,
          setPressure: recipeSettings?.setPressure ?? "",
        });
        reset(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [reset, setIsError]);

  useEffect(() => {
    const currentValues = getValues();
    const hasChanged = Object.keys(initialData).some((key) => {
      if (
        key === "motor1" ||
        key === "motor2" ||
        key === "motor3" ||
        key === "valve1" ||
        key === "valve2"
      )
        return false;
      const val = +currentValues[key];
      return val !== initialData[key];
    });
    setIsChanged(isDirty && hasChanged);
  }, [watchedValues, isDirty, getValues, initialData]);

  const onSubmit = async (payloadData) => {
    try {
      await handleAxiosRequest({
        api: "masterParameter",
        method: "patch",
        payloadData,
      });
      toast.success("master parameter saved successfully", toatsConfig);
      dispatch(setDataChanged());

      // ✅ Set new initial data to current values
      setInitialData(payloadData);

      // ✅ Reset form state to mark it as "not dirty"
      reset(payloadData);
    } catch (error) {
      toast.error(error.response.data.message, toatsConfig);
    }
  };

  return (
    <div className="grid-flow-col px-16 py-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase">
            master setting
          </h1>
          <h2 className="mt-4 text-inputBlack text-sm md:text-xl lg:text-3xl font-bold uppercase">
            master parameters
          </h2>
        </div>
        <Navigation />
      </div>
      <div></div>
      {isLoading && <Loading />}
      {isError && (
        <div className="flex justify-center items-center">
          <p className="text-center text-red-500">
            Failed to master parameter data, please try sometimes later.
          </p>
        </div>
      )}
      {!isLoading && !isError && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-10 pt-10 mt-10"
        >
          <div className="flex flex-col gap-10 flex-no-wrap">
            <RecipeInput
              id={GASKET_PRESSURE}
              labelText={"GASKET PRESSURE"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={"w-full"}
              inputStyle={"w-full rounded-3xl p-5"}
              labelStyles={"self-center text-nowrap"}
            />
            <RecipeInput
              id={GASKET_PRESSURE_ALARM_TIME}
              labelText={"GASKET PRESSURE"}
              labelText2={"ALARM TIME"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={"w-full"}
              inputStyle={"w-full rounded-3xl p-5"}
              labelStyles={"self-center text-nowrap"}
              textWrap={true}
            />
            <RecipeInput
              id={GLOVE_PRESSURE_ALARM_TIME}
              labelText={"GLOVE PRESSURE"}
              labelText2={"ALARM TIME"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={"w-full"}
              inputStyle={"w-full rounded-3xl p-5"}
              labelStyles={"self-center text-nowrap"}
            />
          </div>
          <div className="flex flex-col gap-10 flex-no-wrap">
            <RecipeInput
              id={PRESSURE_PURSUING}
              labelText={"PRESSURE PURSUING"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={"w-full"}
              inputStyle={"w-full rounded-3xl p-5"}
              labelStyles={"self-center text-nowrap"}
            />
            <RecipeInput
              id={PRESSURE_PURSUING_REPEAT_TIME}
              labelText={"PRESSURE PURSUING"}
              labelText2={"REPEAT TIME"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={"w-full"}
              inputStyle={"w-full rounded-3xl p-5"}
              labelStyles={"self-center text-nowrap"}
            />
            <div className="flex items-center justify-center gap-4 mt-14">
              <button
                type="submit"
                disabled={!isChanged}
                className={`flex flex-col items-center ${
                  !isChanged ? "opacity-50" : "opacity-100"
                }`}
              >
                <Image
                  src={"/images/save-btn.svg"}
                  width={130}
                  height={130}
                  alt={`save recipe button`}
                />
              </button>
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
              containerStyles={"w-full"}
              inputStyle={"w-full rounded-3xl p-5"}
              labelStyles={"self-center -mt-8 text-nowrap"}
            />
            <RecipeInput
              id={VALVE_ON_TIME}
              labelText={"VALVE ON TIME"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={"w-full"}
              inputStyle={"w-full rounded-3xl p-5"}
              labelStyles={"self-center mt-8 text-nowrap"}
            />
            <RecipeInput
              id={VALVE_OFF_TIME}
              labelText={"VALVE OFF TIME"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={"w-full"}
              inputStyle={"w-full rounded-3xl p-5"}
              labelStyles={"self-center mt-8 text-nowrap"}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default MasterSetting;
