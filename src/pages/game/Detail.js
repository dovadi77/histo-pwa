import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import theme from "../../theme";
import useAPI from "../../hooks/useAPI";
import { getDataFromAPI } from "../../utils/API";
import Leaderboard from "../../components/Leaderboard";
import "react-loading-skeleton/dist/skeleton.css";

const Detail = ({ setBack, setTitle, setToken, token }) => {
  const navigate = useNavigate();
  const [game, setGame] = useState();
  const [rank, setRank] = useState();
  const [userRank, setUserRank] = useState();
  const { response, setConfig } = useAPI();
  const { state } = useLocation();

  useEffect(() => {
    setTitle("Games");
    setBack(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get data
  useEffect(() => {
    if (response) {
      if (response.message === "Unauthorized") {
        setToken(null);
      } else {
        if (response.data.latest) {
          setRank(response.data.latest);
          setUserRank(response.data.additional);
        } else {
          setTimeout(() => {
            setGame(response.data);
          }, 1000);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setToken]);

  // set parameter for API and call it
  useEffect(() => {
    setConfig(getDataFromAPI(`game/${state.id}`, token));
    setTimeout(() => {
      setConfig(getDataFromAPI(`game/${state.id}/leaderboard`, token));
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setConfig, token]);

  const handleBtnPlay = () => {
    navigate("/games/play", { state: state.id });
  };

  const Game = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <Typography component="h1" variant="h4">
          {`${game.title} (${game.type.toUpperCase()})`}
        </Typography>
        <Typography component="h3" variant="h5" sx={{ marginTop: theme.spacing(2) }}>
          {`Batas waktu : ${game.max_time} detik`}
        </Typography>
        <div style={{ marginTop: theme.spacing(4) }}>
          <Leaderboard rows={rank} user={userRank} overflow={false} />
        </div>
        <div className="flex-center" style={{ margin: `${theme.spacing(4)} 0` }}>
          <Button fullWidth variant="contained" onClick={() => handleBtnPlay()} disabled={game.user_answer ? true : false}>
            {"Bermain"}
          </Button>
        </div>
      </div>
    );
  };

  const SkeletonLoad = () => {
    return (
      <div style={{ height: "60vh" }}>
        <div>
          <Skeleton height={150} />
        </div>
        <div style={{ marginTop: theme.spacing(4) }}>
          <Skeleton height={300} />
        </div>
        <div style={{ marginTop: theme.spacing(4) }}>
          <Skeleton height={50} />
        </div>
      </div>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        marginTop: "1em",
      }}
    >
      {game ? <Game /> : <SkeletonLoad />}
    </Box>
  );
};

export default Detail;
