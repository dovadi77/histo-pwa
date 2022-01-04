import React, { useEffect } from "react";
import create from "zustand";
import Question from "./question/Question";
import Answer from "./answer/Answer";
import { postDataToAPI, updateDataToAPI } from "../../utils/API";
import useAPI from "../../hooks/useAPI";
import "./Multiple.css";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import ProgressBar from "../../components/ProgressBar";
import { getUserTime } from "../../components/ProgressBar";

const useMultiple = create((set) => ({
  userAnswer: [],
  step: 0,
  score: 0,
}));

const Multiple = ({ content, answer, setToken, url, quiz_id, game_id, token, update, maxTime }) => {
  const correctAnswers = answer.split(",");
  const { userAnswer, step, score } = useMultiple();
  const { response, setConfig } = useAPI();
  const navigate = useNavigate();

  // flush data
  useEffect(() => {
    useMultiple.setState({
      userAnswer: [],
      step: 0,
      score: 0,
    });
  }, []);

  // get data
  useEffect(() => {
    if (response) {
      if (response.message === "Unauthorized") {
        setToken(null);
      } else {
        useMultiple.setState({ score: response.data.score });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setToken]);

  const saveAnswer = (ans) => {
    useMultiple.setState({
      userAnswer: [...userAnswer, ans],
    });
  };

  const nextStep = () => {
    useMultiple.setState({
      step: step + 1,
    });
    if (step >= content.length - 1) {
      sendAnswer();
    }
  };

  const sendAnswer = () => {
    let data = {};
    if (quiz_id) {
      data = {
        quiz_id,
        user_answer: userAnswer.join(","),
      };
    } else {
      data = {
        user_answer: userAnswer.join(","),
        user_time: getUserTime() / 60,
      };
    }
    if (!update) setConfig(postDataToAPI(url, data, token));
    else setConfig(updateDataToAPI(url, data, token));
  };

  const redirect = () => {
    navigate(-2);
  };

  return (
    <div className="Content">
      {step < content.length ? (
        <>
          <Box>
            <Question question={content[step].question} />
            <Answer answer={content[step].choices} saveAnswer={saveAnswer} correctAnswer={correctAnswers[step]} />
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ marginY: "1em" }}
              disabled={userAnswer.length - 1 === step ? false : true}
              onClick={nextStep}
            >
              Next
            </Button>
          </Box>
          {!quiz_id && <ProgressBar maxTime={maxTime} />}
        </>
      ) : (
        <div className="finalPage">
          <h1>Anda telah menyelesaikan {quiz_id ? "QUIZ" : "GAME"}</h1>
          <h3>Skor anda:</h3>
          <h2 style={{ fontSize: "11em", margin: 0 }}>{score}</h2>
          <div className="btn-bottom">
            <Button fullWidth variant="contained" onClick={redirect}>
              Kembali ke {quiz_id ? "Daftar Materi" : "Daftar Game"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Multiple;
