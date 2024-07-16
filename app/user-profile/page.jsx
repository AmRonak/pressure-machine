'use client';

import RecipeInput from "@/components/inputs/RecipeInput";
import { toatsConfig } from "@/constants/toast";
import { passwordChangeSchema } from "@/schema/userManagementSchema.yup";
import handleAxiosRequest from "@/util/handleRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CURRENT_PASSWORD = "currentPassword";
const NEW_PASSWORD = "newPassword";
const CONFIRM_PASSWORD = "confirmPassword";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordChangeSchema),
    mode: "onChange"
  });

  const onSubmit = async (payloadData) => {
    try {
      await handleAxiosRequest({
        api: 'users/changePassword',
        method: 'patch',
        payloadData: {
          ...payloadData,
          confirmPassword: 'ronakData@08'
        },
      });
      toast.success("Password changed successfully", toatsConfig);
      reset();
    } catch (error) {
      toast.error('Failed to update password, please try sometimes later.', toatsConfig);
    }
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
            id={CURRENT_PASSWORD}
            labelText={"OLD PASSWORD"}
            register={register}
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
