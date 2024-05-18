'use client';

const Labels = ({id, labelStyles, labelText, LabelText2}) => {
  return (
    <label htmlFor={id} className={`${labelStyles}`}>
      <p>{labelText}</p>
      {LabelText2 && <p>{LabelText2}</p>}
    </label>
  );
};

export default Labels;
