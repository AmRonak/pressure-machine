import React from "react";
import Labels from "./Labels";
import Input from "./Input";

const RecipeInput = ({
  id,
  labelText,
  labelText2,
  register,
  inputStyle,
  validationSchema,
  errors,
  labelStyles,
  containerStyles,
  textWrap=true,
  placeholder=false,
  type,
  isPin,
}) => {
  return (
    <div className={`flex flex-col items-center justify-between ${containerStyles}`}>
      <Labels
        id = {id}
        labelStyles={`text-base lg:text-2xl font-bold text-primary mb-2 text-center ${textWrap && 'text-wrap'} ${labelStyles}`}
        labelText={labelText}
        labelText2={labelText2}
      />
      <Input
        id={id}
        inputStyles={`login-input rounded-2xl ${inputStyle}`}
        register={register}
        validationSchema={validationSchema}
        errors={errors}
        placeholder={placeholder}
        type={type}
        isPin={isPin}
      />
    </div>
  );
};

export default RecipeInput;
