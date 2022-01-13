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
          res += "correct ";
        }
        if (index === clickedAnswer) {
          res += "choosed ";
          if (index !== parseInt(props.correctAnswer)) {
            res += "incorrect ";
          }
        }
      }
      return res;
    };
    return props.answer.map((choice, index) => (
      <li className={answerClass(index)} onClick={() => checkAnswer(index)} key={index}>
        {choice}
      </li>
    ));
  };

  return (
    <>
      <ul disabled={clickedAnswer !== null ? true : false} className="Answer">
        <Choices />
      </ul>
      <div>{clickedAnswer !== null ? (clickedAnswer === parseInt(props.correctAnswer) ? "Jawaban Benar!" : "Jawaban Salah!") : ""}</div>
    </>
  );
};

export default Answer;
