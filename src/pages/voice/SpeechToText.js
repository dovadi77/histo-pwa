import React, { useEffect } from "react";
import { Button, Grid, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Box } from "@mui/system";

function SpeechToText({ content, answer, setToken, url, quiz_id, token, update, title, setTitle }) {
  const [open, setOpen] = React.useState(false);
  const [isRunning, setRunning] = React.useState(false);
  const [score, setScore] = React.useState(null);

  //MARK: -Command Speech Recognition
  const commands = [
    {
      command: answer,
      callback: () => handleClickOpen(),
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  //MARK: -Show or Hidden  PopUp
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetTranscript();
  };

  const reset = () => {
    setRunning(false);
    SpeechRecognition.stopListening();
    setTimeout(() => {
      resetTranscript();
    }, 100);
  };

  useEffect(() => {
    setTitle("Bacakan Teks ini!");
  });

  useEffect(() => {
    console.log(isRunning);
    if (isRunning) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "id",
      });
    } else if (!isRunning) {
      SpeechRecognition.stopListening();
    }
  }, [isRunning]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"MERDEKA"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Pada hari Proklamasi Kemerdekaan yakni hari Jumat tanggal 17 Agustus 1945 pukul 0.00 WIB., teks ini dibacakan oleh Soekarno didampingi Mohammad
            Hatta di serambi depan rumah Soekarno yang terletak di Jl. Pegangsaan Timur Nomor 56, Jakarta (sekarang Jl. Proklamasi Nomor 5, Jakarta Pusat).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Lanjutkan</Button>
        </DialogActions>
      </Dialog>

      <Box>
        <Paper elevation={0}>
          <Grid align="center">
            <h2>{title}</h2>
          </Grid>
          <p>{answer}</p>
        </Paper>
        <Paper elevation={0}>
          <div style={{ position: "relative", textAlign: "center" }}>
            <h2>Hasil Input</h2>
            <div style={{ position: "absolute", top: 0, right: 0 }}>
              <Button onClick={reset} color="primary" variant="text" sx={{ borderRadius: "50%" }}>
                <DeleteIcon />
              </Button>
            </div>
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <Button color="primary" variant="text" sx={{ borderRadius: "50%" }}>
                <ManageSearchIcon />
              </Button>
            </div>
          </div>
          <div className="voice-input">
            <p>{transcript}</p>
          </div>
        </Paper>
        <Button
          onClick={() => setRunning(true)}
          color="primary"
          variant="contained"
          fullWidth
          sx={{ display: isRunning ? "none" : "inherit", marginBottom: "1em" }}
        >
          Mulai
        </Button>
        <Button
          fullWidth
          onClick={() => setRunning(false)}
          type="submit"
          color="primary"
          variant="contained"
          sx={{ display: !isRunning ? "none" : "inherit", marginBottom: "1em" }}
        >
          Stop
        </Button>
      </Box>
    </div>
  );
}

export default SpeechToText;
