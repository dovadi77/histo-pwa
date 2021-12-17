import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import create from "zustand";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const useModal = create((set) => ({
  title: "",
  BodyEl: <></>,
  open: false,
  onClick: undefined,
  close: () => set({ open: false }),
}));

export const openModal = (title, BodyEl, open, onClick) => {
  useModal.setState({
    title,
    BodyEl,
    open,
    onClick,
  });
};

export const closeModal = () => {
  useModal.getState().close();
};

export default function Modal() {
  const { title, BodyEl, onClick, close, open } = useModal();
  return (
    <div>
      <BootstrapDialog onClose={close} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={close}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>{BodyEl}</DialogContent>
        <DialogActions>
          {console.log(onClick)}
          <Button variant="contained" autoFocus onClick={onClick} disabled={onClick && false}>
            Save
          </Button>
          <Button autoFocus onClick={close}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
