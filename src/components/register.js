import { Avatar, Button, Grid, Paper, TextField, Typography, Link } from "@material-ui/core";
import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Register=()=> {

    //MARK: UI COMPONENTS
    const paperStyle = { padding: 20, height: '44vh', width: 300, margin: "200px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const txtField = { margin: '8px 0' }
    const btnStyle = { margin: '10px 0' }
    const chckbox = { margin: '15px 0px' }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Daftar</h2>
                </Grid>
                <TextField label='Email' placeholder='Masukkan email' style={txtField} fullWidth required />
                <TextField label='Buat Kata Sandi' placeholder='Masukkan kata sandi' type='password' style={txtField} fullWidth required />
                <TextField label='Konfirmasi Kata Sandi' placeholder='Masukkan kata sandi' type='password' fullWidth required />
                <FormControlLabel style={chckbox} fullWidth control={<Checkbox 
                name='checked8'
                color='primary'
                />
                } 
                label="Setujui syarat dan ketentuan." 
            />
                <Button type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>Register</Button>
                <Grid align='center'>
                    {/* <Typography>
                        <Link href="#">
                            {'Lupa kata sandi?'}
                        </Link>
                    </Typography> */}
                    <Typography> Sudah memiliki akun?
                        <Link href="#">
                            {'  Masuk'}
                        </Link>
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Register