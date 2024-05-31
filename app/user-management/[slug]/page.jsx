'use client';

import RecipeInput from "@/components/inputs/RecipeInput";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

const USERNAME = "username";
const PASSWORD = "password";
const CONFIRM_PASSWORD = "confirmPassword";
const PIN = "pin";
const CONFIRM_PIN = "confirmPin";
const USER_LEVEL = "userLevel";
const AUTO_UNBLOCK_TIME = "autoUnblockTime";
const NO_OF_ATTEMPTS = "noOfAttempts";
const AUTO_LOGOUT_TIME = "autoLogoutTime";
const PASSWORD_EXPIRY = "passwordExpiry";
const EXPIRY_DAYS_NOTIFICATION = "expiryDaysNotification";

const UserModification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({data})
  }

  return (
    <div className="grid-flow-col mx-auto px-16 pt-20">
      <p className="text-5xl lg:text-6xl font-bold uppercase mb-20 text-wrap max-w-[500px] lg:max-w-[800px]">
        user modification
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-flow-row gap-y-10 mt-10">
        <div className="grid grid-flow-col grid-cols-2 gap-28 gap-y-10">
          <div className="grid grid-flow-row col-span-1 gap-20">
            <RecipeInput
              id={USERNAME}
              labelText={"USER NAME"}
              register={register}
              validationSchema={{}}
              errors={errors}
              containerStyles={''}
              inputStyle={'w-full rounded-4xl p-5'}
              placeholder="DUMMY DUMMY"
              labelStyles={'self-start ml-8'}
            />
            <div className="grid grid-cols-3 gap-14">
              <RecipeInput
                id={PASSWORD}
                labelText={"PASSWORD"}
                placeholder="********"
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'col-span-2'}
                inputStyle={'w-full rounded-4xl p-5'}
                labelStyles={'self-start ml-8'}
              />
              <RecipeInput
                id={PIN}
                labelText={"PIN"}
                placeholder="****"
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'col-span-1'}
                inputStyle={'w-full rounded-4xl p-5'}
              />
            </div>
            <div className="grid grid-cols-3 gap-14">
              {/* this div is only for styling */}
            </div>
          </div>
          <div className="grid grid-flow-row col-span-1 gap-20">
            <div className="grid grid-cols-3 gap-14">
              <RecipeInput
                id={USER_LEVEL}
                labelText={"USER LEVEL"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'col-span-2'}
                inputStyle={'w-full rounded-4xl p-5'}
              />
              <RecipeInput
                id={AUTO_UNBLOCK_TIME}
                labelText={"AUTO"}
                labelText2={"UNBLOCK TIME"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'col-span-1'}
                inputStyle={'w-full rounded-4xl p-5'}
                labelStyles={"text-nowrap -mt-4"}
              />
            </div>
            <div className="grid grid-cols-2 gap-14">
              <RecipeInput
                id={NO_OF_ATTEMPTS}
                labelText={"No. Of"}
                labelText2={"Attempts"}
                register={register}
                validationSchema={{}}
                errors={errors}
                inputStyle={'w-full rounded-4xl p-5'}
              />
              <RecipeInput
                id={AUTO_LOGOUT_TIME}
                labelText={"AUTO"}
                labelText2={"LOGOUT TIME"}
                register={register}
                validationSchema={{}}
                errors={errors}
                containerStyles={'col-span-1'}
                inputStyle={'w-full rounded-4xl p-5'}
                labelStyles={"text-nowrap"}
              />
            </div>
            <div className="grid grid-cols-2 gap-14">
              <RecipeInput
                id={PASSWORD_EXPIRY}
                labelText={"PASSWORD"}
                labelText2={"EXPIRY"}
                register={register}
                validationSchema={{}}
                errors={errors}
                inputStyle={'w-full rounded-4xl p-5'}
              />
              <RecipeInput
                id={EXPIRY_DAYS_NOTIFICATION}
                labelText={"EXPIRY"}
                labelText2={"DAYS NOTIFICATION"}
                register={register}
                validationSchema={{}}
                errors={errors}
                inputStyle={'w-full rounded-4xl p-5'}
                labelStyles={"text-nowrap"}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-28 mb-8">
          <button type="submit" className="flex flex-col items-center">
            <Image
              src={'/images/save-btn.svg'}
              width={130}
              height={130}
              alt={`save button`}
            />
          </button>
          <Link href={'/user-management/user-list'}>
            <Image
              src={"/images/back_button.svg"}
              width={100}
              height={100}
              alt="back button"
            />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserModification;
