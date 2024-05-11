'use client';

const Labels = ({id, labelStyles, labelText}) => {
  return (
    <label htmlFor={id} className={labelStyles}>
      {labelText}
    </label>
  );
};

export default Labels;
