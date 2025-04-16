"use client";
import Dropdown from "@/components/inputs/Dropdown";
import RecipeInput from "@/components/inputs/RecipeInput";
import {
  ADMINISTRATOR,
  COMMENT,
  MANAGER,
  OPERATOR,
  SUPERVISOR,
} from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userManagementSchema } from "@/schema/userManagementSchema.yup";
import { toatsConfig } from "@/constants/toast";
import handleAxiosRequest from "@/util/handleRequest";
import { toast } from "react-toastify";
import Navigation from "@/components/buttons/Navigation";

const USERNAME = "username";
const PASSWORD = "password";
const CONFIRM_PASSWORD = "confirmPassword";
const PIN = "pin";
const CONFIRM_PIN = "confirmPin";
const USER_LEVEL = "userLevel";
const AUTO_UNBLOCK_TIME = "autoUnblockTime";
const NO_OF_ATTEMPTS = "attempts";
const AUTO_LOGOUT_TIME = "autoLogoutTime";
const PASSWORD_EXPIRY = "passwordExpiry";
const EXPIRY_DAYS_NOTIFICATION = "expiryDaysNotification";

const defaultValues = {
  username: "",
  password: "",
  pin: "",
  confirmPassword: "",
  confirmPin: "",
  userLevel: OPERATOR,
  autoUnblockTime: 300,
  attempts: 4,
  autoLogoutTime: 300,
  passwordExpiry: 90,
  expiryDaysNotification: 3,
  comments: "",
};

const userLevels = [
  { value: "choose", text: "Select Role" },
  { value: ADMINISTRATOR, text: "Administrator" },
  { value: SUPERVISOR, text: "Supervisor" },
  { value: MANAGER, text: "Manager" },
  { value: OPERATOR, text: "Operator" },
];

const UserCreation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(userManagementSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (payloadData) => {
    try {
      const { data } = await handleAxiosRequest({
        api: "users/register",
        method: "post",
        payloadData,
      });
      const successMessage = `${data.username} is created successfully`;
      toast.success(successMessage, toatsConfig);
      reset();
    } catch (error) {
      setError("root.serverError", {
        type: error.message,
        message: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="grid-flow-col mx-auto px-16 pt-10">
      <div className="flex justify-between items-center">
        <p className="text-5xl lg:text-6xl font-bold uppercase text-wrap max-w-[500px] lg:max-w-[800px]">
          user creation
        </p>
        <Navigation />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-flow-row gap-y-10 mt-10"
      >
        <div className="grid grid-flow-col grid-cols-2 gap-28 gap-y-10">
          <div className="grid grid-flow-row col-span-1 gap-20">
            <RecipeInput
              id={USERNAME}
              labelText={"USER NAME"}
              register={register}
              errors={errors}
              containerStyles={""}
              inputStyle={"w-full rounded-4xl p-5"}
              placeholder="DUMMY DUMMY"
              labelStyles={"self-start ml-8"}
            />
            <div className="grid grid-cols-3 gap-14">
              <RecipeInput
                id={PASSWORD}
                labelText={"PASSWORD"}
                placeholder="********"
                register={register}
                errors={errors}
                containerStyles={"col-span-2"}
                inputStyle={"w-full rounded-4xl p-5"}
                labelStyles={"self-start ml-8"}
                type={"password"}
              />
              <RecipeInput
                id={PIN}
                labelText={"PIN"}
                placeholder="****"
                register={register}
                errors={errors}
                containerStyles={"col-span-1"}
                inputStyle={"w-full rounded-4xl p-5"}
                type={"Number"}
                isPin={true}
              />
            </div>
            <div className="grid grid-cols-3 gap-14">
              <RecipeInput
                id={CONFIRM_PASSWORD}
                labelText={"CONFIRM PASSWORD"}
                placeholder="********"
                register={register}
                errors={errors}
                containerStyles={"col-span-2"}
                inputStyle={"w-full rounded-4xl p-5"}
                labelStyles={"self-start ml-8"}
                type={"password"}
              />
              <RecipeInput
                id={CONFIRM_PIN}
                labelText={"CONFIRM PIN"}
                placeholder="****"
                register={register}
                errors={errors}
                containerStyles={"col-span-1"}
                inputStyle={"w-full rounded-4xl p-5"}
                labelStyles={"text-nowrap"}
                type={"Number"}
                isPin={true}
              />
            </div>
          </div>
          <div className="grid grid-flow-row col-span-1 gap-20">
            <div className="grid grid-cols-3 gap-14">
              <Dropdown
                id={USER_LEVEL}
                labelText={"USER LEVEL"}
                register={register}
                errors={errors}
                containerStyles={"col-span-2"}
                inputStyle={"w-full rounded-4xl p-5"}
                options={userLevels}
              />
              <RecipeInput
                id={AUTO_UNBLOCK_TIME}
                labelText={"AUTO"}
                labelText2={"UNBLOCK TIME"}
                register={register}
                errors={errors}
                containerStyles={"col-span-1"}
                inputStyle={"w-full rounded-4xl p-5"}
                labelStyles={"text-nowrap -mt-4"}
                type={"Number"}
              />
            </div>
            <div className="grid grid-cols-2 gap-14">
              <RecipeInput
                id={NO_OF_ATTEMPTS}
                labelText={"NO. OF"}
                labelText2={"ATTEMPTS"}
                register={register}
                errors={errors}
                inputStyle={"w-full rounded-4xl p-5"}
                type={"Number"}
              />
              <RecipeInput
                id={AUTO_LOGOUT_TIME}
                labelText={"AUTO"}
                labelText2={"LOGOUT TIME"}
                register={register}
                errors={errors}
                containerStyles={"col-span-1"}
                inputStyle={"w-full rounded-4xl p-5"}
                labelStyles={"text-nowrap"}
                type={"Number"}
              />
            </div>
            <div className="grid grid-cols-2 gap-14">
              <RecipeInput
                id={PASSWORD_EXPIRY}
                labelText={"PASSWORD"}
                labelText2={"EXPIRY"}
                register={register}
                errors={errors}
                inputStyle={"w-full rounded-4xl p-5"}
                type={"Number"}
              />
              <RecipeInput
                id={EXPIRY_DAYS_NOTIFICATION}
                labelText={"EXPIRY"}
                labelText2={"DAYS NOTIFICATION"}
                register={register}
                errors={errors}
                inputStyle={"w-full rounded-4xl p-5"}
                labelStyles={"text-nowrap"}
                type={"Number"}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-flow-col gap-28 mb-8">
          <div className="">
            <RecipeInput
              id="comments"
              labelText={"COMMENT"}
              register={register}
              validationSchema={{}}
              errors={errors}
              inputStyle={"w-full"}
              containerStyles={"w-full"}
            />
          </div>
          <div className="flex items-center justify-around gap-28 mb-8">
            <button type="submit" className="block h-14">
              <Image
                src={"/images/create-btn.svg"}
                width={130}
                height={130}
                alt={`create user button`}
              />
            </button>
            <button className="block h-14 scale-125">
              <Link href={"/user-management/permission"}>
                <Image
                  src={"/images/permissions-btn.svg"}
                  width={130}
                  height={130}
                  alt="permissions page link"
                />
              </Link>
            </button>
            <button>
              <Link href={"/user-management/user-list"}>
                <Image
                  src={"/images/back_button.svg"}
                  width={100}
                  height={100}
                  alt="back button"
                />
              </Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserCreation;
