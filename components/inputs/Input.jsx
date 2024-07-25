'use client';

import { useState } from "react";
import PasswordInput from "./PasswordInput";

const Input = ({
  id,
  inputStyles,
  register,
  errors,
  validationSchema,
  placeholder=true,
  type="text"
}) => {
  const placeholderValue = (placeholder && typeof placeholder === 'boolean') ? "ABC123" : placeholder;
  const [passwordType, setPasswordType] = useState(true);
  return (
    <>
      { type !== 'password' && (
        <input
          placeholder={placeholderValue}
          id={id}
          className={`bg-background-input ${inputStyles}`}
          type={type}
          autocomplete="off"
          {...register(id, validationSchema)}
        />
      )}
      { type === 'password' && (
        <div className="relative w-full">
          <div className="absolute inset-y-0 right-2 bottom-2 flex items-center px-2">
            <input className="hidden js-password-toggle" id={`${id}ShowPassword`} type="checkbox" onChange={() => {setPasswordType(!passwordType)}} />
            <label className="rounded px-2 text-sm font-mono cursor-pointer js-password-label" for={`${id}ShowPassword`}>show</label>
          </div>
          <input
            placeholder={placeholderValue}
            id={id}
            className={`bg-background-input ${inputStyles} col`}
            type={passwordType ? 'password': 'text'}
            autocomplete="off"
            {...register(id, validationSchema)}
          />
        </div>
      )}
      {errors && (
        <span className="text-red-600">{errors[id]?.message}</span>
      )}
    </>
  );
};

export default Input;
