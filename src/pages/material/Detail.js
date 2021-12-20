import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import theme from "../../theme";
import useAPI from "../../hooks/useAPI";
import { getDataFromAPI } from "../../utils/API";
import "react-loading-skeleton/dist/skeleton.css";

const Detail = ({ setBack, setTitle, setToken, token }) => {
  const navigate = useNavigate();
  const [material, setMaterial] = useState();
  const { response, setConfig } = useAPI();
  const { state } = useLocation();

  useEffect(() => {
    setTitle("Pembelajaran");
    setBack(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get data
  useEffect(() => {
    if (response) {
      if (response.message === "Unauthorized") {
        setToken(null);
      } else {
        setTimeout(() => {
          setMaterial(response.data);
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setToken]);

  // set parameter for API and call it
  useEffect(() => {
    setConfig(getDataFromAPI(`material/${state.id}`, token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setConfig, token]);

  const handleBtnPlay = () => {
    navigate("/game-voice");
  };

  const Material = () => {
    return (
      <div style={{ textAlign: "justify" }}>
        <img alt="abc" src={material.banner} style={{ width: "100%" }} />
        <div style={{ marginTop: theme.spacing(4) }}>
          <Typography component="h1" variant="h4">
            {material.title}
          </Typography>
          <Typography sx={{ marginTop: theme.spacing(2) }}>{material.content}</Typography>
        </div>
        <div className="play-btn-container" style={{ marginTop: theme.spacing(4) }}>
          <Button variant="contained" onClick={() => handleBtnPlay()}>
            Bermain
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
      {material ? <Material /> : <SkeletonLoad />}
    </Box>
  );
};

export default Detail;
