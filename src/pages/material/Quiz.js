import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import useAPI from "../../hooks/useAPI";
import { getDataFromAPI } from "../../utils/API";
import Multiple from "../multiple/Multiple";
import SpeechToText from "../voice/SpeechToText";

const Quiz = ({ setBack, setTitle, setToken, token, update }) => {
  const [quiz, setQuiz] = useState();
  const { response, setConfig } = useAPI();
  const { state } = useLocation();

  const QuizType = () => {
    if (quiz) {
      if (quiz.type === "multiple") {
        return (
          <Multiple
            content={quiz.content}
            answer={quiz.answer}
            setToken={setToken}
            token={token}
            quiz_id={quiz.id}
            url={`material/${quiz.material_id}/quiz`}
            update={update}
          />
        );
      } else {
        return (
          <SpeechToText
            content={quiz.content}
            title={quiz.title}
            answer={quiz.answer}
            setToken={setToken}
            token={token}
            quiz_id={quiz.id}
            url={`material/${quiz.material_id}/quiz`}
            update={update}
            setTitle={setTitle}
          />
        );
      }
    }
    return <></>;
  };

  useEffect(() => {
    setTitle("Jawab Soal Berikut!");
    setBack(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get data
  useEffect(() => {
    if (response) {
      if (response.message === "Unauthorized") {
        setToken(null);
      } else {
        setQuiz(response.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setToken]);

  // set parameter for API and call it
  useEffect(() => {
    setConfig(getDataFromAPI(`material/${state}/quiz`, token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setConfig, token]);

  return (
    <div style={{ display: "flex", minHeight: "74vh" }}>
      <QuizType />
    </div>
  );
};

export default Quiz;
