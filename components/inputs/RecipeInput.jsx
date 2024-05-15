import React from "react";
import Labels from "./Labels";
import Input from "./Input";

const RecipeInput = ({
  id,
  labelText,
  register,
  inputStyle,
  validationSchema,
  errors,
  labelStyles,
  containerStyles,
  textWrap=true,
  placeholder=false,
}) => {
  return (
    <div className={`flex flex-col items-center justify-between ${containerStyles}`}>
      <Labels
        id = {id}
        labelStyles={`text-base lg:text-2xl font-bold text-primary mb-2 text-center ${textWrap && 'text-wrap'} ${labelStyles}`}
        labelText={labelText}
      />
      <Input
        id={id}
        inputStyles={`login-input rounded-2xl ${inputStyle}`}
        {...register("stabilization_time", { required: true })}
        register={register}
        validationSchema={validationSchema}
        errors={errors}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RecipeInput;
