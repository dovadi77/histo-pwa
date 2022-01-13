import React from "react";
import { Box } from "@mui/material";
import Title from "../components/Title";

const Verify = () => {
  return (
    <div>
      <div style={{ minHeight: "20vh" }}>
        <Title type={"verify"} />
      </div>
      <div className="verifyForm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Verifikasi Akun mu!</h1>
        </Box>
      </div>
    </div>
  );
};

export default Verify;
