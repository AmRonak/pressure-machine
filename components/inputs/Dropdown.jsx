import Labels from './Labels';
import styles from './dropdown.module.scss';

const Dropdown = ({
  id,
  labelStyles,
  labelText,
  containerStyles,
  register,
  validationSchema,
  errors,
  options,
  inputStyle
}) => {
  return (
    <div className={`flex flex-col items-center justify-between ${containerStyles} relative ${styles.selectDiv}`}>
      <Labels
        id = {id}
        labelStyles={`text-base lg:text-2xl font-bold text-primary mb-2 text-center${labelStyles}`}
        labelText={labelText}
      />
      <select
        id={id}
        className={`bg-background-input login-input rounded-2xl ${inputStyle} ${styles.select}`}
        {...register(id, validationSchema)}
      >
        {
          options.map(({value, text}) => (
            <option key={value} value={value} className='text-primary mt-2' >
              {text}
            </option>
          ))
        }
      </select>
      {errors && (
        <span className="text-red-600">{errors[id]?.message}</span>
      )}
    </div>
  )
}

export default Dropdown;
