'use client';

import MenuButton from "@/components/buttons/MenuButton";
import Input from "@/components/inputs/Input";
import Labels from "@/components/inputs/Labels";
import RecipeInput from "@/components/inputs/RecipeInput";
import Image from "next/image";
import { useForm } from "react-hook-form";

const STABILIZATION_TIME = "stabilization_time";
const INITIAL_PRESSURE = "initial_pressure";
const SET_PRESSURE = "set_pressure";
const TEST_TIME = "test_time";
const LEAK_PRESSURE = "leak_pressure";
const LOWER_PRESSURE = "lower_pressure";
const COMMENT = "comment";

const Recipe = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="grid-flow-col mx-auto px-16 py-20">
      <p className="text-5xl lg:text-6xl font-bold uppercase">
        Recipe
      </p>
      <div className="grid grid-cols-2 gap-48 p-3">
        <Image
          src={`/images/home_icon.svg`}
          width={120}
          height={120}
          alt="stabilization icon"
          className="ml-10"
        />
        <Image 
          src={`/images/home_icon.svg`}
          width={120}
          height={120}
          alt="time icon"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-10">
        <div className="flex justify-between items-center">
          <RecipeInput
            id={STABILIZATION_TIME}
            labelText={"STABILIZATION TIME"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-48 lg:w-72'}
            inputStyle={'w-48 lg:w-72'}
          />
          <RecipeInput
            id={INITIAL_PRESSURE}
            labelText={"INITIAL PRESSURE"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-48 lg:w-72'}
            inputStyle={'w-48 lg:w-72'}
          />
          <RecipeInput
            id={SET_PRESSURE}
            labelText={"SET PRESSURE"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-48 lg:w-72'}
            inputStyle={'w-48 lg:w-72'}
          />
        </div>
        <div className="flex justify-between items-center">
          <RecipeInput
            id={TEST_TIME}
            labelText={"TEST TIME"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-48 lg:w-72'}
            inputStyle={'w-48 lg:w-72 mt-8'}
          />
          <RecipeInput
            id={LEAK_PRESSURE}
            labelText={"LEAK TEST LIMIT TIME PRESSURE"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-48 lg:w-72'}
            inputStyle={'w-48 lg:w-72'}
          />
          <RecipeInput
            id={LOWER_PRESSURE}
            labelText={"LOWER TEST LIMIT PRESSURE"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-48 lg:w-72'}
            inputStyle={'w-48 lg:w-72'}
          />
        </div>
        <div className="grid grid-cols-2 items-center xl:gap-48">
          <RecipeInput
            id={COMMENT}
            labelText={"COMMENT"}
            register={register}
            validationSchema={{}}
            errors={errors}
            inputStyle={'w-full'}
            containerStyles={'w-full'}
          />
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

export default Recipe;
