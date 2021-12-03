import {Grid, Paper, TextField} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { AccountCircle, MenuBook, SportsEsports } from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        width: 400,
        backgroundColor: "#E0E0E0",
    }
})

function Profile() {
  
    const paperStyle = { padding: 20, height: '88vh', width: 355, margin: "0 auto" }

    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const handlechange = (event, newValue) => {
        setValue(newValue)
    }

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

        <BottomNavigation
            className={classes.root}
            showLabels
            value={value}
            onChange={(event, newValue) => handlechange(event, newValue)}
        >
            <BottomNavigationAction label='Profil' icon={<AccountCircle />} />
            <BottomNavigationAction label='Materi' icon={<MenuBook />} />
            <BottomNavigationAction label='Permainan' icon={<SportsEsports />} />
        </BottomNavigation>
    </div>
}

export default Profile;