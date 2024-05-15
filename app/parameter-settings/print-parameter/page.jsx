'use client';

import RecipeInput from "@/components/inputs/RecipeInput";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

const COMPANY_NAME = "company_name";
const DEPARTMENT_NAME = "department_name";
const EQUIPMENT_NAME = "equipment_name";
const EQUIPMENT_NUMBER = "equipment_serial_number";

const AREA_NAME = "area_name";
const BATCH_NAME = "batch_name";
const BATCH_NO = "batch_no";
const LEAK_TEST_STATUS = "leak_test_status";

const ParameterSetting = () => {
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
          parameter setting
        </h1>
        <h2 className="text-inputBlack text-sm md:text-xl lg:text-3xl font-bold uppercase">
          print parameter
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-20 justify-between py-20 my-10">
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
                labelText={"Batch Name"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'w-48 lg:w-72'}
                inputStyle={'w-48 lg:w-72 p-5'}
                placeholder={true}
              />
              <RecipeInput
                id={LEAK_TEST_STATUS}
                labelText={"Leak Test Status"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={''}
                inputStyle={'w-48 lg:w-72 p-5'}
                textWrap={false}
                placeholder={'0'}
              />
            </div>
          </div>
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
          <button type="submit" onClick={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <Image
              src={'/images/block-btn.svg'}
              width={130}
              height={130}
              alt={`save recipe button`}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParameterSetting;
