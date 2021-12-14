import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import DetailLearnPages from "./pages/DetailLearnPages";
import LeaderBoardScreen from "./pages/LeaderBoardScreen";
import Quiz from "./pages/quiz/QuizMain";
import SpeechToText from "./pages/voice/SpeechToText";
import Cookie from "./utils/Cookies";

const Home = ({ setToken }) => {
  // ambil cookie
  const { checkCookie } = Cookie();

  useEffect(() => {
    let check = setInterval(() => {
      if (!checkCookie("token")) {
        clearInterval(check);
        setToken({
          message: "Session Invalid",
          token: null,
        });
      }
    }, 30000);
    return () => check;
  }, [checkCookie, setToken]);

  return (
    <Routes>
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/detail-learn" element={<DetailLearnPages />} />
      <Route path="/leader-board" element={<LeaderBoardScreen />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/game-voice" element={<SpeechToText />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Home;
