import React from "react";

const QuizItem = ({ quize, onAnswer }) => {
  const { question, id, options } = quize || {};
  return (
    <div className="space-y-8 ">
      <div className="quiz">
        <h4 className="question">
          Quiz {id} {" -: " + question}
        </h4>
        <form className="quizOptions">
          {options?.map((option, i) => (
            <label key={option.id}  htmlFor={id + "_" + option.id}>
              <input
                type="checkbox"
                value={id + "_" + option.id}
                checked={option.checked || false}
                id={id + "_" + option.id}
                onChange={onAnswer}
              />
              {option.option}
            </label>
          ))}
        </form>
      </div>
    </div>
  );
};
export default React.memo(QuizItem);
