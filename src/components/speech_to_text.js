import React, { useState, useEffect } from "react";
import {Button, Grid, Paper, TextField } from "@material-ui/core";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
 
function Speech_To_Text() {
    const { transcript, resetTranscript } = useSpeechRecognition()

    if (!SpeechRecognition.browserSupportsSpeechRecognition()){
    return null
    }

    const paperStyle1 = { padding: 20, height: '40vh', width: 300, margin: "20px auto" }
    const paperStyle2 = { padding: 20, height: '30vh', width: 300, margin: "30px auto" }
    const btnStyleStart = { padding: 20, height: '7vh', width: 170, margin: "20px 10px"}
    const btnStyleStop = { padding: 20, height: '7vh', width: 170, margin: "20px 10px" }
    const btnStyleReset = { padding: 20, height: '7vh', width: 170, margin: "20px 10px" }
    return (
        <div>
            <Grid>
                <Paper elevation={10} style={paperStyle1}>
                    <Grid align='center'>
                        <h2>Teks Proklamasi</h2>
                    </Grid>
                    <label> Kami bangsa Indonesia dengan ini menyatakan Kemerdekaan Indonesia. Hal-hal yang mengenai pemindahan kekuasaan dan lain lain, di selenggarakan dengan cara seksama dan dalam tempo yang sesingkat-singkatnya.  </label>
                </Paper>
                <Paper elevation={10} style={paperStyle2}>
                    <Grid align='center'>
                        <h2>Hasil Input</h2>
                    </Grid>
                    <p>{transcript}</p>
                </Paper>
                <Button onClick={() => SpeechRecognition.startListening({continuous: true, language: 'id'})}
                type='submit' 
                color='primary' 
                variant='contained' 
                style={btnStyleStart}>Start</Button>
                <Button onClick={SpeechRecognition.stopListening}
                    type='submit'
                    color='primary'
                    variant='contained'
                    style={btnStyleStop}>Stop</Button>
                <Button onClick={resetTranscript}
                    type='submit'
                    color='primary'
                    variant='contained'
                    style={btnStyleReset}>Reset</Button>
            </Grid>
        </div>
    )
}

export default Speech_To_Text;