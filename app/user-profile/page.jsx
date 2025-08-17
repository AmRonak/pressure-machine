"use client";

import Navigation from "@/components/buttons/Navigation";
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
    mode: "onChange",
  });

  const onSubmit = async (payloadData) => {
    try {
      await handleAxiosRequest({
        api: "users/changePassword",
        method: "patch",
        payloadData,
      });
      toast.success("Password changed successfully", toatsConfig);
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update password, please try sometimes later.",
        toatsConfig
      );
    }
  };

  return (
    <div className="grid-flow-col px-16 py-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase">
            user profile
          </h1>
          <h2 className="mt-4 text-inputBlack text-sm md:text-xl lg:text-3xl font-bold uppercase">
            password change
          </h2>
        </div>
        <Navigation />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-10 py-5 my-5"
      >
        <div className="flex flex-col gap-10 col-span-full">
          <RecipeInput
            id={CURRENT_PASSWORD}
            labelText={"Old Password"}
            register={register}
            errors={errors}
            containerStyles={"w-full"}
            inputStyle={"w-full"}
            labelStyles={"self-start ml-8"}
            placeholder={true}
            type={"password"}
          />
          <RecipeInput
            id={NEW_PASSWORD}
            labelText={"New Password"}
            register={register}
            errors={errors}
            containerStyles={"w-full"}
            inputStyle={"w-full"}
            labelStyles={"self-start ml-8"}
            placeholder={true}
            type={"password"}
          />
          <RecipeInput
            id={CONFIRM_PASSWORD}
            labelText={"Confirm Password"}
            register={register}
            errors={errors}
            containerStyles={"w-full"}
            inputStyle={"w-full"}
            labelStyles={"self-start ml-8"}
            placeholder={true}
            type={"password"}
          />
        </div>
        <div className="flex items-center justify-center gap-28 w-full fixed bottom-10 left-0 right-0 px-16 py-10">
          <button type="submit">
            <Image
              src={"/images/save-btn.svg"}
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
