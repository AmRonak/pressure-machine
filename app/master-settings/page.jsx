'use client';

import RecipeInput from "@/components/inputs/RecipeInput";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

const OLD_PASSWORD = "gasket_pressure";
const NEW_PASSWORD = "new_password";
const CONFIRM_PASSWORD = "confirm_password";

const GASKET_PRESSURE = "gasket_pressure";
const GASKET_PRESSURE_ALARM_TIME = 'gasket_pressure_alarm_time';
const GLOVE_PRESSURE_ALARM_TIME = 'glove_pressure_alarm_time';
const PRESSURE_PURSUING = 'pressure_pursuing';
const PRESSURE_PURSUING_ALARM_TIME = 'pressure_pursuing_alarm_time';
const VALVE_PRESSURE_RELEASE = 'valve_pressure_release';
const VALVE_ON_TIME = 'valve_on_time';
const VALVE_OFF_TIME = 'valve_off_time';

const MasterSetting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-10 py-10 my-20"
      >
        <div className="flex flex-col gap-10">
          <RecipeInput
            id={GASKET_PRESSURE}
            labelText={"GASKET PRESSURE"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-full'}
            inputStyle={'w-full rounded-3xl p-5'}
            labelStyles={'self-center'}
          />
          <RecipeInput
            id={GASKET_PRESSURE_ALARM_TIME}
            labelText={"GASKET PRESSURE ALARM TIME"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-full'}
            inputStyle={'w-full rounded-3xl p-5'}
            labelStyles={'self-center'}
            textWrap={true}
          />
          <RecipeInput
            id={GLOVE_PRESSURE_ALARM_TIME}
            labelText={"GLOVE PRESSURE ALARM TIME"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-full'}
            inputStyle={'w-full rounded-3xl p-5'}
            labelStyles={'self-center'}
          />
        </div>
        <div className="flex flex-col gap-10">
          <RecipeInput
            id={PRESSURE_PURSUING}
            labelText={"PRESSURE PURSUING"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-full'}
            inputStyle={'w-full rounded-3xl p-5'}
            labelStyles={'self-center'}
          />
          <RecipeInput
            id={PRESSURE_PURSUING_ALARM_TIME}
            labelText={"PRESSURE PURSUING ALARM TIME"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-full'}
            inputStyle={'w-full rounded-3xl p-5'}
            labelStyles={'self-center'}
          />
          <div className="flex items-center justify-center gap-4 mt-14">
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="flex flex-col items-center"
            >
              <Image
                src={'/images/block-btn.svg'}
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
        <div className="flex flex-col gap-10">
          <RecipeInput
            id={VALVE_PRESSURE_RELEASE}
            labelText={"GLOVE PRESSURE RELEASE VALVE ON PRESSURE"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-full'}
            inputStyle={'w-full rounded-3xl p-5'}
            labelStyles={'self-center -mt-8'}
          />
          <RecipeInput
            id={VALVE_ON_TIME}
            labelText={"VALVE ON TIME"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-full'}
            inputStyle={'w-full rounded-3xl p-5'}
            labelStyles={'self-center mt-8'}
          />
          <RecipeInput
            id={VALVE_OFF_TIME}
            labelText={"VALVE OFF TIME"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-full'}
            inputStyle={'w-full rounded-3xl p-5'}
            labelStyles={'self-center mt-8'}
          />
        </div>
      </form>
    </div>
  );
};

export default MasterSetting;
