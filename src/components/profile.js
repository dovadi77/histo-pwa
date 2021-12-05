import {Grid, Paper, TextField} from "@material-ui/core";
import React from "react";

function Profile() {
  
    const paperStyle = { padding: 20, height: '95vh', width: 355, margin: "0 auto" }
    const txtField = { margin: '15px 0' }

    return <div> 
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Halaman Profil</h2>
            </Grid>
            <label> Nama </label>
            <TextField style={txtField} placeholder='Pieter Yonathan' fullWidth />
            <label> Email </label>
                <TextField style={txtField} placeholder='pieteryonathan@gmail.com' fullWidth  />
        </Paper>
    </Grid>

    </div>
}

export default Profile;