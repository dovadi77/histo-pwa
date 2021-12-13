import { Grid, Paper, TextField, Button, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useNavigate } from 'react-router-dom';

function Edit_Profile() {

    const navigate = useNavigate();

    //MARK: Component UI
    const paperStyle = { padding: 20, height: '95vh', width: 355, margin: "0 auto" }
    const txtField = { margin: '15px 0' }
    const btnStyle = { margin: '30px 0' }

    return <div>
        <Grid>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIcon sx={{ color: "white" }} />
                    </IconButton>
                    <Typography variant="h6">Ubah Profil</Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Halaman Profil</h2>
                </Grid>
                <label> Nama </label>
                <TextField style={txtField} placeholder='Pieter Yonathan' fullWidth />
                <label> Email </label>
                <TextField style={txtField} placeholder='pieteryonathan@gmail.com' fullWidth />
                <Button onClick={() => { navigate('/home') }} type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>save</Button>
            </Paper>
        </Grid>

    </div>
}

export default Edit_Profile;