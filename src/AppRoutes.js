import React from "react";
import { Route, Routes } from "react-router";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import HomeScreen from "./pages/HomeScreen";
import DetailLearnPages from "./pages/DetailLearnPages";
import LeaderBoardScreen from "./pages/LeaderBoardScreen";
import Quiz from "./pages/quiz/QuizMain";
import SpeechToText from "./pages/voice/SpeechToText";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />
			<Route path="/home" element={<HomeScreen />} />
			<Route path="/detail-learn" element={<DetailLearnPages />} />
			<Route path="/leader-board" element={<LeaderBoardScreen />} />
			<Route path="/quiz" element={<Quiz />} />
			<Route path="/game-voice" element={<SpeechToText />} />
		</Routes>
	);
};

export default AppRoutes;
