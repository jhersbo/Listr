import { Paper } from "@mui/material"


const SignedOutPage = ()=>{
    return(
        <Paper elevation={2} sx={{
            margin: '2%',
            boxShadow: "5px 5px 20px black",
            padding: "20% 3% 3%"
        }}>
            <h2>Sign in to manage your lists.</h2>
        </Paper>
    )
}

export default SignedOutPage