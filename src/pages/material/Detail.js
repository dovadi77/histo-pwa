import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    if (material.score === undefined) navigate("/material/quiz", { state: state.id });
    else navigate("/material/quiz/update", { state: state.id });
  };

  const Material = () => {
    return (
      <div>
        <img alt="abc" src={material.banner} style={{ width: "100%" }} />
        <div style={{ marginTop: theme.spacing(4) }}>
          <Typography component="h1" variant="h4" align="center">
            {material.title}
          </Typography>
          <div style={{ marginTop: theme.spacing(2), textAlign: "justify" }}>
            <ReactMarkdown children={material.content} remarkPlugins={[remarkGfm]} />
          </div>
          {material.score !== undefined && (
            <Typography component={"h3"} variant={"h5"} sx={{ marginTop: theme.spacing(2) }}>
              Skor terakhir : {material.score}
            </Typography>
          )}
        </div>
        <div className="flex-center" style={{ margin: `${theme.spacing(4)} 0` }}>
          <Button fullWidth variant="contained" onClick={() => handleBtnPlay()}>
            {material.score !== undefined ? "Main Lagi" : "Bermain"}
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
