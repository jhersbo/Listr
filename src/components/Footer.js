import { Paper } from "@mui/material"

const Footer = ()=>{
    return (
        <Paper elevation={24} sx={{
            bgcolor: "#94d2bd", 
            minHeight: "2em",
            display: 'flex',
            alignContent: 'center',
            justifyContent: "center",
            alignSelf: 'center',
            boxShadow: "0px 5px 20px black",
            borderRadius: "20px",
            position: "fixed",
            bottom: 10,
            width: "98%",
            left: "1%"
        }}>
            <h1>Footer</h1>
        </Paper>
    )
}

export default Footer