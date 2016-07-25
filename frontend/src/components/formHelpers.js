import R from 'ramda';


const onNextClick = (e, fieldsStatus, numOfFields) => {
  const fieldPairs = R.toPairs(fieldsStatus);
  const pageValid = R.all(pair => pair[1])(fieldPairs);
  if (!pageValid || fieldPairs.length < numOfFields) {
    e.preventDefault();
  }
};

export { onNextClick };
