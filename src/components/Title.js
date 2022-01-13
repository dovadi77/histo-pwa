import React from "react";
import { Typography } from "@mui/material";

const Title = ({ type }) => {
  return (
    <div
      className="centerTitle"
      style={{
        height: type === "login" ? "30vh" : "18vh",
        justifyContent: type === "login" ? "center" : "flex-end",
      }}
    >
      <Typography component="h1" variant="h1" fontWeight="800">
        HISTO
      </Typography>
      <div style={{ transform: "translate(0,-1em)" }}>
        <Typography component="h2" variant="h4">
          Jasmerah
        </Typography>
      </div>
    </div>
  );
};

export default Title;
