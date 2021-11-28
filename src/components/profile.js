import { Avatar, Button, Grid, Paper, TextField, Typography, Link } from "@material-ui/core";
import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

function Profile() {
    //MARK: UI COMPONENTS
    const paperStyle = { padding: 20, height: '100vh', width: 355, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const txtField = { margin: '8px 0' }

    return <div> 
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Halaman Profil</h2>
            </Grid>
            <TextField label='Email' placeholder='Masukkan email' style={txtField} fullWidth required />
            <TextField label='Kata Sandi' placeholder='Masukkan kata sandi' type='password' fullWidth required />
            <Grid align='center'>
                <Typography>
                    <Link href="#">
                        {'Lupa kata sandi?'}
                    </Link>
                </Typography>
                <Typography> Belum memiliki akun?
                    <Link href="/register">
                        {'  Register'}
                    </Link>
                </Typography>
            </Grid>
        </Paper>
    </Grid>
    </div>
}

export default Profile;