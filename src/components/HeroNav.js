import { Paper } from "@mui/material"

const HeroNav = ({ thinScreen, user, setUser})=>{
    if(thinScreen){
        return(
            <Paper elevation={24} sx={{
                bgcolor: "#94d2bd", 
                minHeight: "4em",
                display: 'flex',
                alignContent: 'center'
            }}>
                <h1 className="hero">Listr</h1>
            </Paper>
        )
    }
}

export default HeroNav