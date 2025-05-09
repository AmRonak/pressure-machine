"use client";

import { useState } from "react";

const Input = ({
  id,
  inputStyles,
  register,
  errors,
  validationSchema,
  placeholder = true,
  type = "text",
  isPin = false,
}) => {
  const placeholderValue =
    placeholder && typeof placeholder === "boolean" ? "ABC123" : placeholder;
  const [passwordType, setPasswordType] = useState(true);
  return (
    <>
      {!(type === "password" || type === "loginPassword") && !isPin && (
        <input
          placeholder={placeholderValue}
          id={id}
          className={`bg-background-input ${inputStyles}`}
          type={type}
          autoComplete="off"
          {...register(id, validationSchema)}
        />
      )}
      {(type === "password" || type === "loginPassword" || isPin) && (
        <div className="relative w-full">
          <input
            placeholder={placeholderValue}
            id={id}
            className={`bg-background-input ${inputStyles} ${
              isPin && "pl-0 -ml-2"
            }`}
            type={passwordType ? "password" : "text"}
            autoComplete="off"
            {...register(id, validationSchema)}
          />
          {type !== "loginPassword" && (
            <div className="absolute inset-y-0 right-2 px-4 bottom-3 flex items-center">
              <input
                className="hidden js-password-toggle"
                id={`${id}ShowPassword`}
                type="checkbox"
                onChange={() => {
                  setPasswordType(!passwordType);
                }}
              />
              <label
                className={`rounded text-sm font-mono cursor-pointer js-password-label `}
                for={`${id}ShowPassword`}
              >
                {passwordType ? "show" : "hide"}
              </label>
            </div>
          )}
        </div>
      )}
      {errors && <span className="text-red-600">{errors[id]?.message}</span>}
    </>
  );
};

export default Input;
