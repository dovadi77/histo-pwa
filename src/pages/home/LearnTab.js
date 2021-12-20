import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Paper, Box } from "@mui/material";
import Category from "../material/Category";
import List from "../material/List";
import Detail from "../material/Detail";

function LearnTab({ token, setToken, setBack, setTitle }) {
  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={4} sx={{ minHeight: "77vh", px: 2, py: 1, borderRadius: "30px" }}>
        <Routes>
          <Route index element={<Category token={token} setToken={setToken} setBack={setBack} setTitle={setTitle} />} />
          <Route path="list" element={<List token={token} setToken={setToken} setBack={setBack} setTitle={setTitle} />} />
          <Route path="list/detail" element={<Detail token={token} setToken={setToken} setBack={setBack} setTitle={setTitle} />} />
          <Route path="*" element={<Navigate to={""} />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default LearnTab;
