'use client';

import RecipeInput from "@/components/inputs/RecipeInput";
import Image from "next/image";
import { useForm } from "react-hook-form";

const OLD_PASSWORD = "old_password";
const NEW_PASSWORD = "new_password";
const CONFIRM_PASSWORD = "confirm_password";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
  }

  return (
    <div className="grid-flow-col px-16 py-20">
      <div>
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase">
          user profile
        </h1>
        <h2 className="mt-4 text-inputBlack text-sm md:text-xl lg:text-3xl font-bold uppercase">
          password change
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-10 py-20 my-20"
      >
        <div className="flex flex-col gap-10 col-span-3">
          <RecipeInput
            id={OLD_PASSWORD}
            labelText={"OLD PASSWORD"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-full'}
            inputStyle={'w-full rounded-3xl p-5'}
            labelStyles={'self-start ml-8'}
            placeholder={true}
          />
          <RecipeInput
            id={NEW_PASSWORD}
            labelText={"NEW PASSWORD"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-full'}
            inputStyle={'w-full rounded-3xl p-5'}
            labelStyles={'self-start ml-8'}
            placeholder={true}
          />
          <RecipeInput
            id={CONFIRM_PASSWORD}
            labelText={"CONFIRM PASSWORD"}
            register={register}
            validationSchema={{}}
            errors={errors}
            containerStyles={'w-full'}
            inputStyle={'w-full rounded-3xl p-5'}
            labelStyles={'self-start ml-8'}
            placeholder={true}
          />
        </div>
        <div className="flex flex-col items-center self-end gap-4">
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
    </div>
  );
};

export default UserProfile;
