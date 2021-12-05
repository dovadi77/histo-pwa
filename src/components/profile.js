import {Grid, Paper, TextField, Button} from "@material-ui/core";
import React from "react";
import { useNavigate } from 'react-router-dom';

function Profile() {
  
    const navigate = useNavigate();

    const paperStyle = { padding: 20, height: '95vh', width: 355, margin: "0 auto" }
    const txtField = { margin: '15px 0' }
    const btnStyle = { margin: '30px 0' }

    return <div> 
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Halaman Profil</h2>
            </Grid>
            <label> Nama </label>
                <TextField disabled
                    id="outlined-disabled" style={txtField} placeholder='Pieter Yonathan' fullWidth />
            <label> Email </label>
                <TextField disabled
                    id="outlined-disabled" style={txtField} placeholder='pieteryonathan@gmail.com' fullWidth  />
                <Button onClick={() => { navigate('/edit_profile') }} type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>Ubah</Button>
        </Paper>
    </Grid>

    </div>
}

export default Profile;