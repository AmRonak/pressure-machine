import Image from "next/image";
import Input from "../inputs/Input";
import Labels from "../inputs/Labels";
import styles from './testInput.module.css';

const TestInput = ({
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
  imageSrc,
  imageStyle,
  textStyle
}) => {
  return (
    <div className={containerStyles}>
      {
        !imageSrc && !placeholder && (
          <Input
            id={id}
            inputStyles={`
              login-input
              rounded-3xl
              py-6
              mb-6
              ${inputStyle}
            `}
            register={register}
            validationSchema={validationSchema}
            errors={errors}
            placeholder={placeholder}
            />
        )
      }
      {
        !imageSrc && placeholder && (
          <div
            className={`relative text-xl ${styles.placeholder} w-full`}
            data-placeholder="Pa"
          >
            <Input
              id={id}
              inputStyles={`
                login-input
                rounded-3xl
                py-6
                mb-6
                text-2xl
                font-normal
                ${inputStyle}
              `}
              register={register}
              validationSchema={validationSchema}
              errors={errors}
              placeholder={false}
            />
          </div>
        )
      }
      {
        imageSrc && (
          <div>
            <Image
              id={id}
              src={`/images/${imageSrc}`}
              width={0}
              height={0}
              alt="pressure white"
              className={`relative top-0 left-0 ${imageStyle}`}
            />
            <p className={textStyle}>1000</p>
          </div>
        )
      }
      <Labels
        id = {id}
        labelStyles={`text-base lg:text-2xl font-bold text-primary ${imageSrc && '-mt-6'} mb-2 text-center ${textWrap && 'text-wrap'} ${labelStyles}`}
        labelText={labelText}
        labelText2={labelText2}
      />
    </div>
  );
};

export default TestInput;
