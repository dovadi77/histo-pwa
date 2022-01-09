import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import useToken from "./hooks/useToken";
import Home from "./pages/Home";

const Controller = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<Auth setToken={setToken} type="login" />} />
        <Route path="/register" element={<Auth setToken={setToken} type="register" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    return <Home setToken={setToken} token={token} />;
  }
};

export default Controller;
