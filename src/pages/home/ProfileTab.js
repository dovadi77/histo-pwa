import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Show from "../profile/Show";
import Update from "../profile/Update";
import ChangePass from "../profile/ChangePass";
import { getDataFromAPI } from "../../utils/API";
import useAPI from "../../hooks/useAPI";

const ProfileTab = ({ token, setToken, setBack, setTitle }) => {
  const { response, setConfig } = useAPI();
  const [user, setUser] = useState({});
  const [updateUser, setUpdateUser] = useState();

  // update profile from API response
  useEffect(() => {
    if (response) {
      if (response.message === "Unauthorized") {
        setToken(null);
      } else {
        setUser(response.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, user, updateUser]);

  // set parameter for API and call it
  useEffect(() => {
    setConfig(getDataFromAPI("user/me", token));
  }, [setConfig, token, updateUser]);

  return (
    <Box sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={4} sx={{ minHeight: "75vh" }}>
        <Routes>
          <Route index element={<Show token={token} setToken={setToken} user={user} setBack={setBack} setTitle={setTitle} />} />
          <Route
            path="update"
            element={<Update token={token} setToken={setToken} user={user} setUpdateUser={setUpdateUser} setBack={setBack} setTitle={setTitle} />}
          />
          <Route path="change-pass" element={<ChangePass token={token} setToken={setToken} user={user} setBack={setBack} setTitle={setTitle} />} />
          <Route path="*" element={<Navigate to={""} />} />
        </Routes>
      </Paper>
    </Box>
  );
};

export default ProfileTab;
