'use client';

const Labels = ({id, labelStyles, labelText, labelText2}) => {
  return (
    <label htmlFor={id} className={`${labelStyles}`}>
      <p className="text-start">{labelText}</p>
      {labelText2 && <p className="text-start">{labelText2}</p>}
    </label>
  );
};

export default Labels;
