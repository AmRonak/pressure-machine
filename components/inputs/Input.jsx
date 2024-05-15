'use client';

const Input = ({
  id,
  inputStyles,
  register,
  errors,
  validationSchema,
  placeholder=true
}) => {
  const placeholderValue = (placeholder && typeof placeholder === 'boolean') ? "ABC123" : placeholder
  return (
    <>
      <input
        placeholder={placeholderValue}
        id={id}
        className={`bg-background-input ${inputStyles}`}
        {...register(id, validationSchema)}
      />
      {errors && (
        <span className="text-red-600">{errors[id]?.message}</span>
      )}
    </>
  );
};

export default Input;
