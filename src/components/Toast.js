import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

function Toast({ color, message, openIt, setOpenIt }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenIt(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color={color}
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={openIt}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}

Toast.propTypes = {
  color: PropTypes.string,
  message: PropTypes.string,
  openIt: PropTypes.bool,
  setOpenIt: PropTypes.func,
};

export default Toast;
