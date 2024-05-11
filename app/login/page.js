'use client';
import LoginButton from "@/components/buttons/LoginButton";
import Input from "@/components/inputs/Input";
import Labels from "@/components/inputs/Labels";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const USERNAME = 'username';
  const PASSWORD = 'password';

  const onSubmit = (data) => {
    console.log({data});
    router.push('/dashboard')
  }

  return (
    <div className="grid-flow-col px-28 py-32">
      <p className="text-6xl font-bold">LOGIN</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-28 mr-56">
        <Labels
          id = {USERNAME}
          labelStyles={"text-2xl font-bold text-primaryDark pl-10 pb-3"}
          labelText="User Name"
        />
        <Input
          id={USERNAME}
          inputStyles={"login-input"}
          {...register("username", { required: true })}
          register={register}
          validationSchema={{
            // required: "Username is required",
            // minLength: {
            //   value: 3,
            //   message: "Please enter a minimum of 3 characters"
            // }
          }}
          errors={errors}
        />
        <Labels
          id = {PASSWORD}
          labelStyles={"text-2xl font-bold text-primaryDark pl-10 pb-3 mt-8"}
          labelText="Password"
        />
        <Input
          id={PASSWORD}
          inputStyles={"login-input mb-8"}
          {...register("username", { required: true })}
          register={register}
          validationSchema={{
            // required: "Password is required",
            // minLength: {
            //   value: 3,
            //   message: "Please enter a minimum of 3 characters"
            // }
          }}
          errors={errors}
        />
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
