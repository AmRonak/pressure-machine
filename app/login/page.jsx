'use client';
import LoginButton from "@/components/buttons/LoginButton";
import Input from "@/components/inputs/Input";
import Labels from "@/components/inputs/Labels";
import RecipeInput from "@/components/inputs/RecipeInput";
import { JWT_TOKEN_NAME, PASSWORD_ERROR_MESSAGE } from "@/constants/constants";
import { setAuth } from "@/redux/slices/authSlice";
import { loginSchema } from "@/schema/userManagementSchema.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
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

  const onSubmit = async(data) => {
    let config = {
      method: 'post',
      url: 'http://localhost:5000/api/users/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data
    };
    axios.request(config)
    .then(({data}) => {
      dispatch(setAuth(data.token));
      router.push('/dashboard')
    })
    .catch((error) => {
      setError('root.serverError', {
        type: error.message,
        message: error.response.data.message
      })
    });
  }

  return (
    <div className="grid-flow-col px-16 py-20">
      <p className="text-6xl font-bold">LOGIN</p>
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
