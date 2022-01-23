import React, { useEffect } from "react";
import { Button, Grid, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/system";
import useAPI from "../../hooks/useAPI";
import { postDataToAPI, updateDataToAPI } from "../../utils/API";
import { useNavigate } from "react-router";
import { getUserTime } from "../../components/ProgressBar";
import ProgressBar from "../../components/ProgressBar";

function SpeechToText({ content, answer, setToken, title, url, quiz_id, token, update, maxTime }) {
  const [open, setOpen] = React.useState(false);
  const [word, setWord] = React.useState("");
  const [score, setScore] = React.useState(null);
  const { response, setConfig } = useAPI();
  const navigate = useNavigate();

  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  //MARK: -Show or Hidden  PopUp
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <Button onClick={handleClose}>Tutup</Button>
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
                <h2>Hasil Input Suara</h2>
                <div style={{ position: "absolute", top: 0, right: 0 }}>
                  <IconButton onClick={reset} color="primary" variant="text">
                    <DeleteIcon />
                  </IconButton>
                </div>
                <div style={{ position: "absolute", top: 0, left: 0 }}>
                  <IconButton onClick={handleClickOpen} color="primary" variant="text">
                    <InfoIcon />
                  </IconButton>
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
              color={listening ? "error" : "success"}
              variant="contained"
              fullWidth
              sx={{ marginBottom: "1em" }}
            >
              {listening ? "Stop Berbicara" : "Mulai Berbicara"}
            </Button>
            <Button color="primary" variant="contained" sx={{ marginBottom: "1em" }} onClick={sendAnswer} fullWidth disabled={word.length === 0 || listening}>
              Cek Jawaban
            </Button>
            {!quiz_id && <ProgressBar maxTime={maxTime} />}
          </Box>
        ) : (
          <div className="finalPage">
            <h1>Anda telah menyelesaikan {quiz_id ? "KUIS" : "PERMAINAN"}</h1>
            <h3>Skor anda:</h3>
            <h2 style={{ fontSize: "11em", margin: 0 }}>{score}</h2>
            <div className="btn-bottom">
              <Button fullWidth variant="contained" onClick={() => redirect(-2)}>
                Kembali ke {quiz_id ? "Daftar Materi" : "Daftar Permainan"}
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
              Kembali ke {quiz_id ? "Daftar Materi" : "Daftar Permainan"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpeechToText;
