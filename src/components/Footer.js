import { Paper, Button } from "@mui/material"

const Footer = ()=>{
    return (
        <Paper elevation={24} sx={{
            bgcolor: "#94d2bd", 
            minHeight: "5%",
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
            <Button></Button>
        </Paper>
    )
}

export default Footer