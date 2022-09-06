import { Avatar, IconButton, Paper } from "@mui/material"
import { minWidth } from "@mui/system"
import PersonIcon from '@mui/icons-material/Person';

const HeroNav = ({ thinScreen, user, setUser})=>{
    if(thinScreen){
        return(
            <Paper elevation={24} sx={{
                bgcolor: "#94d2bd", 
                minHeight: "4em",
                display: 'flex',
                alignContent: 'center',
                justifyContent: "space-between"

            }}>
                <h1 className="hero">Listr</h1>
                <IconButton sx={{ 
                    p: 1,
                }} href='/user'>
                    <Avatar sx={{
                        height: '2em',
                        width: '2em',
                        marginTop: '0.5em',
                        marginRight: '0.5em',
                        boxShadow: '0px 1px 4px black',
                        backgroundColor: '#003554'
                    }}
                        
                    >
                        {user? user.name.charAt(0): <PersonIcon></PersonIcon>}
                    </Avatar>
                </IconButton>
            </Paper>
        )
    }
}

export default HeroNav