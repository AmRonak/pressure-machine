import { useState } from 'react';
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
  inputStyle,
  specialStyles = "",
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleOnChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className={specialStyles || `flex flex-col items-start justify-between ${containerStyles} relative ${styles.selectDiv}`}>
      <Labels
        id={id}
        labelStyles={`text-base lg:text-2xl font-bold text-primary mb-2 text-start ml-2 ${labelStyles}`}
        labelText={labelText}
      />
      <select
        id={id}
        className={`bg-background-input login-input rounded-2xl ${inputStyle} ${styles.select}`}
        {...register(id, validationSchema)}
        onChange={handleOnChange}
        value={selectedValue}
      >
        {
          options.map(({ value, text }) => (
            <option
              key={value}
              value={value}
              className={`${styles.option} ${selectedValue === value ? styles.selectedOption : ''}`}
            >
              {text}
            </option>
          ))
        }
      </select>
      {errors[id] && (
        <span className="text-red-600">{errors[id]?.message}</span>
      )}
    </div>
  );
}

export default Dropdown;