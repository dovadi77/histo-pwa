import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import useAPI from "../../hooks/useAPI";
import { getDataFromAPI } from "../../utils/API";
import Multiple from "../multiple/Multiple";
import SpeechToText from "../voice/SpeechToText";

const Game = ({ setBack, setTitle, setToken, token, update }) => {
  const [game, setGame] = useState();
  const [countdown, setCountdown] = useState(4);
  const { response, setConfig } = useAPI();
  const { state } = useLocation();

  const GameType = () => {
    if (game) {
      if (game.type === "multiple") {
        return (
          <Multiple
            content={game.content}
            answer={game.answer}
            setToken={setToken}
            token={token}
            game_id={game.id}
            url={`game/${game.id}`}
            update={update}
            maxTime={game.max_time}
          />
        );
      } else if (game.type === "voice") {
        return (
          <SpeechToText
            content={game.content}
            title={game.title}
            answer={game.answer}
            setToken={setToken}
            token={token}
            game_id={game.id}
            url={`game/${game.id}`}
            update={update}
            maxTime={game.max_time}
          />
        );
      }
    }
    return <></>;
  };

  const CountDown = () => {
    return (
      <div className="flex-center" style={{ flex: 1, justifyContent: "center" }}>
        <Typography component="h1" variant="h1" className="puff-in-center">
          {countdown - 1 > 0 ? countdown - 1 : "GO !!!"}
        </Typography>
      </div>
    );
  };

  useEffect(() => {
    setTitle(game.title === undefined ? "Jawab Soal Berikut!" : game.title);
    setBack(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get data
  useEffect(() => {
    if (response) {
      if (response.message === "Unauthorized") {
        setToken(null);
      } else {
        setGame(response.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setToken]);

  // set parameter for API and call it
  useEffect(() => {
    setConfig(getDataFromAPI(`game/${state}`, token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setConfig, token]);

  useEffect(() => {
    let startCountdown = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearTimeout(startCountdown);
  }, [countdown]);

  return <div style={{ display: "flex", minHeight: "74vh" }}>{countdown > 0 ? <CountDown /> : <GameType />}</div>;
};

export default Game;
