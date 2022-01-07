import React, { useEffect } from "react";
import { Button, Grid, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Box } from "@mui/system";
import useAPI from "../../hooks/useAPI";
import { postDataToAPI, updateDataToAPI } from "../../utils/API";
import { useNavigate } from "react-router";
import { getUserTime } from "../../components/ProgressBar";
import ProgressBar from "../../components/ProgressBar";

function SpeechToText({ content, answer, setToken, setTitle, title, url, quiz_id, game_id, token, update, maxTime }) {
  const [open, setOpen] = React.useState(false);
  const [isRunning, setRunning] = React.useState(false);
  const [score, setScore] = React.useState(null);
  const { response, setConfig } = useAPI();
  const navigate = useNavigate();

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
    sendAnswer();
    reset();
  };

  const reset = () => {
    setRunning(false);
    SpeechRecognition.stopListening();
    setTimeout(() => {
      resetTranscript();
    }, 100);
  };

  const sendAnswer = () => {
    let data = {};
    if (quiz_id) {
      data = {
        quiz_id,
        user_answer: transcript,
      };
    } else {
      data = {
        user_answer: transcript,
        user_time: getUserTime() / 60,
      };
    }
    if (!update) setConfig(postDataToAPI(url, data, token));
    else setConfig(updateDataToAPI(url, data, token));
  };

  const redirect = (val) => {
    navigate(val);
  };

  useEffect(() => {
    setTitle("Bacakan Teks ini!");
  });

  useEffect(() => {
    if (isRunning) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "id",
      });
    } else if (!isRunning) {
      SpeechRecognition.stopListening();
    }
  }, [isRunning]);

  // get data
  useEffect(() => {
    if (response) {
      if (response.message === "Unauthorized") {
        setToken(null);
      } else {
        setScore(response.data.score);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setToken]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }
  return (
    <div className="content">
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Lanjutkan</Button>
        </DialogActions>
      </Dialog>
      {score === null ? (
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
                <Button onClick={sendAnswer} color="primary" variant="text" sx={{ borderRadius: "50%" }} disabled={transcript.length === 0 || isRunning}>
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
          {!quiz_id && <ProgressBar maxTime={maxTime} />}
        </Box>
      ) : (
        <div className="finalPage">
          <h1>Anda telah menyelesaikan {quiz_id ? "QUIZ" : "GAME"}</h1>
          <h3>Skor anda:</h3>
          <h2 style={{ fontSize: "11em", margin: 0 }}>{score}</h2>
          <div className="btn-bottom">
            <Button fullWidth variant="contained" onClick={() => redirect(-2)}>
              Kembali ke {quiz_id ? "Daftar Materi" : "Daftar Game"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpeechToText;
