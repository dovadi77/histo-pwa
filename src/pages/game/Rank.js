import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAPI from "../../hooks/useAPI";
import { getDataFromAPI } from "../../utils/API";
import Leaderboard from "../../components/Leaderboard";
import { Button } from "@mui/material";

const Rank = ({ setTitle, setToken, token, setBack, category = true }) => {
  const [rank, setRank] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const { response, setConfig } = useAPI();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Peringkat");
    setBack(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get data
  useEffect(() => {
    if (response) {
      if (response.message === "Unauthorized") {
        setToken(null);
      } else {
        setRank(response.data.latest);
        setUserRank(response.data.additional);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setToken]);

  // set parameter for API and call it
  useEffect(() => {
    setConfig(getDataFromAPI(`game/leaderboard?limit=50&level=${state[0]}`, token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setConfig, token]);
  return (
    <div className="leaderboard">
      <Leaderboard rows={rank} user={userRank} />
      <Button fullWidth variant="contained" size="large" sx={{ mt: 4 }} onClick={() => navigate("/games/list", { state: state })}>
        Main
      </Button>
    </div>
  );
};

export default Rank;
