import { Paper, Button } from "@mui/material"

const handleClick = ()=>{
    window.location.href = '/user'
}


const SignedOutPage = ()=>{
    return(
        <Paper elevation={2} sx={{
            margin: '2%',
            boxShadow: "5px 5px 20px black",
            padding: "20% 3% 3%",
            display: "flex",
            flexDirection: "column"
        }}>
            <h2>Sign in to manage your lists!</h2>
            <Button variant="text" onClick={()=>{handleClick()}}sx={{
                    color: "#94d2bd",
                    fontFamily: "Antonio, sans-serif",
                    // textShadow: "-1px -1px 0 #003554b, 1px -1px 0 #003554b, -1px 1px 0 #003554b, 1px 1px 0 #003554b;",
                    fontSize: "21px",
                    width: "50%",
                    padding: "0%",
                    margin: "2%",
                    alignSelf: "center",
                    border: "1px solid #003554",
                    bgcolor: "#003554",
                    boxShadow: "1px 1px 5px black"
                }}>Sign in</Button>
        </Paper>
    )
}

export default SignedOutPage