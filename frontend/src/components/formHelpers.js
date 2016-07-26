import R from 'ramda';


const validateAndFindUntouched = (e, fieldsStatus) => {
  const fieldPairs = R.toPairs(fieldsStatus);
  const pageValid = R.all(pair => pair[1])(fieldPairs);
  if (pageValid) {
    return [];
  }
  e.preventDefault();
  // return untouched field names to mark as invalid for error msg display
  return R.map(pair => pair[0].slice(0, -9),
    R.filter(pair => pair[1] === undefined, fieldPairs)
  );
};

export { validateAndFindUntouched };
