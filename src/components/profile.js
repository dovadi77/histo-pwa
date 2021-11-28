import { Avatar, Button, Grid, Paper, TextField, Typography, Link } from "@material-ui/core";
import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

function Profile() {
    //MARK: UI COMPONENTS
    const paperStyle = { padding: 20, height: '100vh', width: 355, margin: "0 auto" }

    return <div> 
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Halaman Profil</h2>
            </Grid>
            <label> Nama </label>
            <TextField placeholder='Pieter Yonathan' fullWidth />
            <label> Email </label>
            <TextField placeholder='pieteryonathan@gmail.com' fullWidth  />
        </Paper>
    </Grid>
    </div>
}

export default Profile;