import { Avatar, Button, Grid, Paper, TextField, Typography, Link } from "@material-ui/core";
import React from "react";
import LockOutlinedIcon  from "@material-ui/icons/LockOutlined";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Login=()=>{

    //MARK: UI COMPONENTS
    const paperStyle={padding: 20, height: '60vh', width:300, margin:"150px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const txtField={margin: '8px 0'}
    const btnStyle={ margin: '30px 0'}

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Sign In</h2>
                </Grid>
                <TextField label='Email' placeholder='Masukkan email' style={txtField} fullWidth required/>
                <TextField label='Kata Sandi' placeholder='Masukkan kata sandi' type='password' fullWidth required />
                {/* <FormControlLabel control={<Checkbox 
                name='checked8'
                color='primary'
                />
                } 
                label="Ingat saya" 
            /> */}
            <Button type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>Login</Button>
            <Typography>
                    <Link href="#">
                        {'Lupa kata sandi?'}
                    </Link>
            </Typography>
            <Typography> Belum memiliki akun?
                    <Link href="#">
                        {'Register'}
                    </Link>
            </Typography>
            </Paper>
        </Grid>
    )
}

export default Login