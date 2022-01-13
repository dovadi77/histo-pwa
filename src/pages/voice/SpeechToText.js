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
  const [word, setWord] = React.useState("");
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
  const { transcript, resetTranscript, listening } = useSpeechRecognition({ commands });

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
    SpeechRecognition.stopListening();
    setTimeout(() => {
      resetTranscript();
      setWord("");
    }, 100);
  };

  const sendAnswer = () => {
    let data = {};
    if (quiz_id) {
      data = {
        quiz_id,
        user_answer: word,
      };
    } else {
      data = {
        user_answer: word,
        user_time: getUserTime(),
      };
    }
    if (!update) setConfig(postDataToAPI(url, data, token));
    else setConfig(updateDataToAPI(url, data, token));
  };

  const startListening = () => {
    SpeechRecognition.startListening({
      language: "id",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const redirect = (val) => {
    navigate(val);
  };

  useEffect(() => {
    if (!listening && transcript.length > 0) {
      setWord((old) => {
        return old + (old.length === 0 ? "" : " ") + transcript;
      });
    }
  }, [listening, transcript]);

  useEffect(() => {
    setTitle("Bacakan Teks ini!");
  });

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

  return (
    <div className="content">
      <Dialog open={open || word === answer} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content[0]}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Lanjutkan</Button>
        </DialogActions>
      </Dialog>
      {SpeechRecognition.browserSupportsSpeechRecognition() ? (
        score === null ? (
          <Box>
            <Paper elevation={0}>
              <Grid align="center">
                <h2>{title}</h2>
              </Grid>
              <p>{content[1]}</p>
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
                  <Button onClick={sendAnswer} color="primary" variant="text" sx={{ borderRadius: "50%" }} disabled={word.length === 0 || listening}>
                    <ManageSearchIcon />
                  </Button>
                </div>
              </div>
              <div className="voice-input">
                <p>{listening ? word + (word.length === 0 ? "" : " ") + transcript : word}</p>
              </div>
            </Paper>
            <Button
              onClick={() => {
                listening ? stopListening() : startListening();
              }}
              color="primary"
              variant="contained"
              fullWidth
              sx={{ marginBottom: "1em" }}
            >
              {listening ? "Stop" : "Mulai"}
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
        )
      ) : (
        <div className="finalPage">
          <h1>Ups terdapat kesalahan</h1>
          <h3>Agar bisa memainkan permainan ini mohon untuk memberikan akses mic anda</h3>
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
