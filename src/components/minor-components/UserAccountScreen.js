import { Paper, Card, Button } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const UserAccountScreen = ({ user, handleLogout, buttonStyle })=>{
    return(
        <Paper elevation={2} sx={{
            margin: '2%',
            boxShadow: "5px 5px 20px black",
            padding: "10% 3% 3%",
            bgcolor: "#fefae0"
        }}>
            <Card className="account-screen"sx={{
                justifyContent: 'center', 
                marginTop: '5%', 
                display: 'flex', 
                flexDirection: 'column', 
                padding: '5%',
                boxShadow: "5px 5px 20px black"
            }}>
                <ArrowBackIosNewIcon onClick={()=>{window.location.href = '/'}} sx={{
                    marginTop: "3%",
                }}></ArrowBackIosNewIcon>
                <h3>Account information</h3>
                <h6>Username: {user.username}</h6>
                <h6>Name: {user.name}</h6>
                <Button variant="contained" onClick={()=>{handleLogout()}} sx={buttonStyle}>Logout</Button>
            </Card>
        </Paper>
    )
}

export default UserAccountScreen