'use client';

const Labels = ({id, labelStyles, labelText, labelText2}) => {
  return (
    <label htmlFor={id} className={`${labelStyles}`}>
      <p>{labelText}</p>
      {labelText2 && <p>{labelText2}</p>}
    </label>
  );
};

export default Labels;
