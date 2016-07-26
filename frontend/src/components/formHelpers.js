import R from 'ramda';


const validateAndFindUntouched = (e, fieldsStatus) => {
  const fieldPairs = R.toPairs(fieldsStatus);
  const pageValid = R.all(pair => pair[1])(fieldPairs);
  if (pageValid) {
    return [];
  }
  e.preventDefault();
  // return untouched fields to mark as invalid for error msg display
  return R.map(pair => pair[0],
    R.filter(pair => pair[1] === undefined, fieldPairs)
  );
};

export { validateAndFindUntouched };
