'use client';
import LoginButton from "@/components/buttons/LoginButton";
import Navigation from "@/components/buttons/Navigation";
import RecipeInput from "@/components/inputs/RecipeInput";
import { setAuth } from "@/redux/slices/authSlice";
import { loginSchema } from "@/schema/userManagementSchema.yup";
import handleAxiosRequest from "@/util/handleRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange'
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const USERNAME = 'username';
  const PASSWORD = 'password';

  const onSubmit = async (payloadData) => {
    try {
      const { data: dataToken } = await handleAxiosRequest({
        api: 'users/login',
        method: 'post',
        payloadData,
      });
      dispatch(setAuth(dataToken.token));
      router.push('/dashboard')
    } catch (error) {
      setError('root.serverError', {
        type: error.message,
        message: error.response.data.message
      })
    }
  }

  return (
    <div className="grid-flow-col mx-auto px-16 pt-10">
      <div className="flex justify-between items-center">
        <p className="text-6xl font-bold">
          LOGIN
        </p>
        <Navigation />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-2 mt-28 max-w-[800px] gap-16">
        <RecipeInput
          id={USERNAME}
          labelText={"USER NAME"}
          register={register}
          errors={errors}
          containerStyles={''}
          inputStyle={'w-full rounded-4xl p-5'}
          placeholder="DUMMY DUMMY"
          labelStyles={'self-start ml-8'}
        />
        <RecipeInput
          id={PASSWORD}
          labelText={"PASSWORD"}
          placeholder="********"
          register={register}
          errors={errors}
          inputStyle={'w-full rounded-4xl p-5'}
          labelStyles={'self-start ml-8'}
          type={'password'}
        />
        {errors?.root?.serverError && <p className="pt-3 mt-5 text-center text-red-600">{errors.root.serverError.message}</p>}
        <div className="flex justify-center items-center gap-20 mt-8">
          <LoginButton
            btnStyle='w-60 h-14'
            textStyle='sm:text-2xl sm:tracking-[.4rem] lg: xl:text-3xl xl:tracking-[.5rem]'
            type="submit"
          />
          <Link href={'/'}>
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

export default Login;
