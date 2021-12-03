import { Avatar, Button, Grid, Paper, TextField, Typography, Link } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import React from "react";
import LockOutlinedIcon  from "@material-ui/icons/LockOutlined";


function Login() {

    const navigate = useNavigate();
    //MARK: UI COMPONENTS
    const paperStyle={padding: 20, height: '44vh', width:300, margin:"200px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const txtField={margin: '8px 0'}
    const btnStyle={ margin: '30px 0'}

    return(
    <div>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Masuk</h2>
                </Grid>
                <TextField label='Email' placeholder='Masukkan email' style={txtField} fullWidth required/>
                <TextField label='Kata Sandi' placeholder='Masukkan kata sandi' type='password' fullWidth required />
             
            <Button onClick={() => {navigate('/profile')}} type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>Masuk</Button>
            <Grid align='center'>

            <Typography> Belum memiliki akun?
                    <Link href="/register">
                        {'  Register'}
                    </Link>
            </Typography>
            </Grid>
            </Paper>
        </Grid>
    </div>
    );
}

export default Login;