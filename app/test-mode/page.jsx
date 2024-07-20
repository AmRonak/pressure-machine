'use client';
import Labels from "@/components/inputs/Labels";
import TestInput from "@/components/testInput/TestInput";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

const SET_PRESSURE = 'set_pressure';
const GLOVE_NUMBER = 'glover_number';
const START_PRESSURE = 'start_pressure';
const STABALISATION_TIME = 'stabalisation time';
const RESULT = 'result';
const DIFFRENCE = 'difference';
const ACTUAL_PRESSURE = 'actual_pressure';
const END_PRESSURE = 'end_pressure';

const TestMode = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="grid-flow-col mx-auto px-16 pt-20 pb-5">
      <p className="text-5xl lg:text-6xl font-bold uppercase mb-10 text-wrap max-w-[500px] lg:max-w-[800px]">
        Test Mode
      </p>
      <form className="grid grid-flow-row gap-y-10 py-5 mx-10">
        <div className="grid grid-flow-col grid-cols-3 gap-28 gap-y-10 place-items-center">
          <div className="grid grid-flow-row col-span-1 gap-10 place-items-center">
            <TestInput
              id={SET_PRESSURE}
              labelText={"SET PRESSURE"}
              imageSrc={"pressure-white.svg"}
              imageStyle="min-w-48 min-h-48 lg:min-w-60 lg:min-h-60 p-2"
              textStyle="relative text-2xl lg:text-3xl bottom-[7.5rem] left-16 lg:bottom-36 lg:left-20"
              containerStyles={"flex flex-col items-center justify-between w-full"}
            />
            <TestInput
              id={GLOVE_NUMBER}
              labelText={"GLOVE NUMBER"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={'flex flex-col items-center justify-between mt-8 w-full'}
              inputStyle={'w-full'}
            />
            <TestInput
              id={START_PRESSURE}
              labelText={"START PRESSURE"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={'flex flex-col items-center justify-between'}
              inputStyle={'w-full mt-8'}
              placeholder="Pa"
            />
          </div>
          <div className="flex flex-col gap-28 lg:gap-8">
            <div>
              <Image
                id={'pressure'}
                src={`/images/pressure-yellow.svg`}
                width={0}
                height={0}
                alt="pressure white"
                className={`min-w-80 min-h-8min-w-80 lg:min-w-[30rem] lg:min-h-[30rem] p-2 mb-6`}
              />
              <Labels
                id = {ACTUAL_PRESSURE}
                labelStyles={`text-base lg:text-2xl font-bold text-primary my-2 text-center`}
                labelText={"ACTUAL PRESSURE"}
              />
            </div>
            <TestInput
              id={END_PRESSURE}
              labelText={"END PRESSURE"}
              register={register}
              validationSchema={{}}
              errors={errors}
              inputStyle={'w-full mt-8'}
              placeholder="Pa"
              containerStyles={'flex flex-col items-center justify-between'}
            />
          </div>
          <div className="grid grid-flow-row col-span-1 gap-10 place-items-center">
            <TestInput
              id={STABALISATION_TIME}
              labelText={"STABALISATION TIME"}
              imageSrc={"pressure-yellow.svg"}
              imageStyle="min-w-48 min-h-48 lg:min-w-60 lg:min-h-60 p-2"
              textStyle="relative text-2xl lg:text-3xl bottom-[7.5rem] left-16 lg:bottom-36 lg:left-20"
              containerStyles={'flex flex-col items-center justify-between'}
            />
            <TestInput
              id={RESULT}
              labelText={"RESULT"}
              register={register}
              validationSchema={{}}
              errors={errors}
              inputStyle={'w-full'}
              containerStyles={'flex flex-col items-center justify-between mt-8 w-full'}
            />
            <TestInput
              id={DIFFRENCE}
              labelText={"DIFFRENCE"}
              register={register}
              validationSchema={{}}
              errors={errors}
              inputStyle={'w-full mt-8'}
              placeholder="Pa"
              containerStyles={'flex flex-col items-center justify-between'}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestMode;
