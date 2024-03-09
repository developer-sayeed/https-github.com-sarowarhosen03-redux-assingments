import _ from "lodash";

export const calcullateQuizeScore = (quizeState) => {
  let score = 0;
  //calcullate the score
  quizeState.forEach((quize) => {
    let checkedIndexes = [],
      currectIndexes = [];
    quize.options.forEach((option, index2) => {
      if (option.checked) checkedIndexes.push(index2);
      if (option.isCorrect) currectIndexes.push(index2);
    });
    if (_.isEqual(checkedIndexes, currectIndexes)) score = score + 5;
  });
  return score;
};
