import React, { useState, useEffect } from "react";
import "./Answer.css";

const Answer = (props) => {
  const [clickedAnswer, setClickedAnswer] = useState(null);
  const checkAnswer = (ans) => {
    if (!clickedAnswer) {
      setClickedAnswer(ans);
      props.saveAnswer(ans);
    }
  };

  useEffect(() => {
    setClickedAnswer(null);
  }, [props.answer]);

  const Choices = () => {
    const answerClass = (index) => {
      let res = "";
      if (clickedAnswer !== null) {
        if (index === parseInt(props.correctAnswer)) {
          res = "correct";
        } else {
          res = "incorrect";
        }
        if (index === clickedAnswer) {
          res += " choosed";
        }
      }
      return res;
    };
    return props.answer.map((choice, index) => (
      <li className={answerClass(index)} onClick={() => checkAnswer(index)} key={choice}>
        {choice}
      </li>
    ));
  };

  return (
    <>
      <ul disabled={props.clickedAnswer ? true : false} className="Answer">
        <Choices />
      </ul>
      <div>{clickedAnswer !== null ? (clickedAnswer === parseInt(props.correctAnswer) ? "Correct Answer!" : "Incorrect Answer!") : ""}</div>
    </>
  );
};

export default Answer;
