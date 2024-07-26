'use client';

import Dropdown from "@/components/inputs/Dropdown";
import RecipeInput from "@/components/inputs/RecipeInput";
import Loading from "@/components/Loading";
import { ADMINISTRATOR, MANAGER, OPERATOR, SUPERVISOR } from "@/constants/constants";
import { toatsConfig } from "@/constants/toast";
import { userManagementSchema } from "@/schema/userManagementSchema.yup";
import handleAxiosRequest from "@/util/handleRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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


const userLevels = [
  {value: 'choose', text: 'Select Role'},
  {value: ADMINISTRATOR, text: 'Administrator'},
  {value: SUPERVISOR, text: 'Supervisor'},
  {value: MANAGER, text: 'Manager'},
  {value: OPERATOR, text: 'Operator'},
];

const UserModification = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, setError }
  } = useForm({
    resolver: yupResolver(userManagementSchema),
    mode: "onChange",
    reValidateMode: 'onSubmit'
  });
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const api = `users/${userId}`;
  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const { data } = await handleAxiosRequest({
          api,
          method: 'get',
        });
        const {
          username,
          userLevel,
          autoLogoutTime,
          passwordExpiry,
          expiryDaysNotification,
          autoUnblockTime,
          attempts,
          password,
          pin
        } = data.data.user;

        const userData = {
          username,
          userLevel,
          autoLogoutTime,
          passwordExpiry,
          expiryDaysNotification,
          autoUnblockTime,
          attempts,
          password,
          pin,
          confirmPassword: password,
          confirmPin: pin
        };
        reset(userData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);

      }
    }
    fetchUserData();
  }, [reset, setError, api]);

  const onSubmit = async (payloadData) => {
    try {
      const { data } = await handleAxiosRequest({
        api,
        method: 'put',
        payloadData,
      });
      const successMessage = `${data.username}'s data updated successfully`;
      toast.success(successMessage, toatsConfig);
      router.push('/user-management/user-list')
    } catch (error) {
      setError('root.serverError', {
        type: error.message,
        message: error.response.data.message
      })
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="grid-flow-col mx-auto px-16 pt-20">
      <p className="text-5xl lg:text-6xl font-bold uppercase mb-20 text-wrap max-w-[500px] lg:max-w-[800px]">
        user modification
      </p>
      {
        isLoading && <Loading />
      }
      {
        isError && (
          <div className="flex justify-center items-center">
            <p className="text-center text-red-500">Failed to load user data, please try sometimes later.</p>
          </div>
        )
      }
      {
        !isError && !isLoading && (
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
                    type={"password"}
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
                    containerStyles={'col-span-2'}
                    inputStyle={'w-full rounded-4xl p-5'}
                    labelStyles={'self-start ml-8'}
                    type={"password"}
                  />
                  <RecipeInput
                    id={CONFIRM_PIN}
                    labelText={"CONFIRM PIN"}
                    placeholder="****"
                    register={register}
                    errors={errors}
                    containerStyles={'col-span-1'}
                    inputStyle={'w-full rounded-4xl p-5'}
                    labelStyles={"text-nowrap"}
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
                    containerStyles={'col-span-2'}
                    inputStyle={'w-full rounded-4xl p-5'}
                    options={userLevels}
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
      )}
    </div>
  );
};

export default UserModification;
