'use client';

const Input = ({
  id,
  inputStyles,
  register,
  errors,
  validationSchema
}) => {
  return (
    <>
      <input
        placeholder="ABC123"
        id={id}
        className={inputStyles}
        {...register(id, validationSchema)}
      />
      {errors && (
        <span className="text-red-600">{errors[id]?.message}</span>
      )}
    </>
  );
};

export default Input;
