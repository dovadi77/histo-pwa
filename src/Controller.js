import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthScreen from "./pages/AuthScreen";
import useToken from "./hooks/useToken";
import Home from "./Home";

const Controller = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<AuthScreen setToken={setToken} type="login" />}
        />
        <Route
          path="/register"
          element={<AuthScreen setToken={setToken} type="register" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  } else {
    return <Home setToken={setToken} />;
  }
};

export default Controller;
