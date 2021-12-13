import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import useToken from "./hooks/useToken";
import Home from "./Home";

const Controller = () => {
	const { token, setToken } = useToken();

	if (!token) {
		return (
			<Routes>
				<Route path="/login" element={<LoginScreen setToken={setToken} />} />
				<Route path="/register" element={<RegisterScreen />} />
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		);
	} else {
		return <Home setToken={setToken} />;
	}
};

export default Controller;
