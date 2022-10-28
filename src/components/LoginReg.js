import { useState } from "react"
import Cookies from 'cookies-js'

import { Card, Paper, TextField, Button } from "@mui/material"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { fontSize, padding } from "@mui/system"

import UserAccountScreen from "./minor-components/UserAccountScreen";

const LoginReg = ({ user, setUser, userDB, setUserDB, thinScreen, setActiveList, serverURL })=>{
    
    let [username, setUsername] = useState(user? user.username: '')
    let [password, setPassword] = useState(user? user.password: '')
    let [passwordCON, setPasswordCON] = useState(null)
    let [name, setName] = useState(user? user.name: '')
    let [newUser, setNewUser] = useState(false)

    const buttonStyle = {
        marginTop: '2%',
        bgcolor: "#94d2bd",
        color: 'black',
        fontFamily: "Combo, cursive",
        fontSize: "18px"
    }

    const textFieldStyle = {
        marginBottom: "2%"
    }
    
    async function handleLogin(){
        //add behavior for when username is not found/wrong
        let isolatedUser = userDB.filter(user => user.username === username)
        let userID = isolatedUser[0].user_id
        let response = await fetch(serverURL + "users/auth",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userID,
                password: password
            })
        })
        if (response.status === 200){
            setUser(isolatedUser[0])
            Cookies.set('user', JSON.stringify(isolatedUser[0]))
            console.log('You are logged in.')
            window.location.href = '/'
        }else if(response.status === 204){
            console.log("User not found in DB.")
        }else if(response.status === 401){
            console.log("Incorrect password")
        }else{
            console.log("Something else happened.")
        }
    }

    const handleLogout = ()=>{
        setUser(undefined)
        Cookies.set('user', undefined)
        Cookies.set('active', '')
        setActiveList('')
    }

    function generateUserId(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    }

    const handleRegistration = async ()=>{
        if (password === passwordCON){
            setNewUser(false)
            let newUser = {
                user_id: generateUserId(1, 10000000),
                name: name,
                username: username,
                password: password
            }
            let response = await fetch(serverURL + "users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            if(response.ok){
                setUser(newUser)
                Cookies.set('user', JSON.stringify(newUser))
                window.location.href = '/'
            }else{
                console.log("Response status: " + response.status)
            }
        }else{
            window.alert('Passwords do not match.')
        }
    }

    if(!user){
        return(
            <Paper elevation={2} sx={{
                margin: '2%',
                boxShadow: "5px 5px 20px black",
                padding: "10% 3% 3%",
                bgcolor: "#fefae0"
            }}>
                {!newUser?
                    <Card className="account-screen" sx={{
                        boxShadow: "5px 5px 20px black"
                    }}>
                        <Card sx={{
                            justifyContent: 'center', 
                            marginTop: '0%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            padding: "15% 3% 3%",
                        }} className="ind-cards">
                            <h3>Log in here!</h3>
                            <TextField
                            required
                            id="filled-basic" variant="filled"
                            label="Username"
                            sx={textFieldStyle}
                            onChange={(e)=>{setUsername(e.target.value)}}
                            />
                            <TextField
                            required
                            id="filled-basic" variant="filled" type="password"
                            label="Password"
                            sx={textFieldStyle}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <Button className="submit" variant="contained" onClick={async()=>{await handleLogin()}} sx={buttonStyle}>Login</Button>
                        </Card>
                        <Card sx={{
                            justifyContent: 'center', 
                            marginTop: '0%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            padding: '5%'
                        }}className="ind-cards">
                            <h5 style={{'margin': '0%'}}>Don't have an account?</h5>
                            <Button variant="text" onClick={()=>{setNewUser(true)}}sx={{
                                color: "#94d2bd",
                                fontFamily: "Antonio, sans-serif",
                                textShadow: "-1px -1px 0 #22223b, 1px -1px 0 #22223b, -1px 1px 0 #22223b, 1px 1px 0 #22223b;",
                                fontSize: "21px",
                                width: "60%",
                                padding: "0%",
                                alignSelf: "center",
                                margin: "3%"
                            }}>
                                <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                                Register Here!
                                <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
                            </Button>
                        </Card>
                    </Card>
                    :
                    <Card className="account-screen" sx={{
                        boxShadow: "5px 5px 20px black"
                    }}>
                        <Card sx={{
                            justifyContent: 'center', 
                            marginTop: '5%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            padding: '5%'
                        }} className="ind-cards">
                            <h3>Register Here</h3>
                            <TextField
                            required
                            id="filled-basic" variant="filled"
                            label="Legal Name"
                            sx={textFieldStyle}
                            onChange={(e)=>{setName(e.target.value)}}
                            />
                            <TextField
                            required
                            id="filled-basic" variant="filled"
                            label="Username"
                            sx={textFieldStyle}
                            onChange={(e)=>{setUsername(e.target.value)}}
                            />
                            <TextField
                            required
                            id="filled-basic" variant="filled" type="password"
                            label="Password"
                            sx={textFieldStyle}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <TextField
                            required
                            id="filled-basic" variant="filled" type="password"
                            label="Confirm Password"
                            sx={textFieldStyle}
                            onChange={(e)=>{setPasswordCON(e.target.value)}}
                            />
                            <Button className="submit" variant="contained" onClick={async ()=>{await handleRegistration()}} sx={buttonStyle}>Register</Button>
                        </Card>
                        <Card sx={{
                            justifyContent: 'center', 
                            marginTop: '0%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            padding: '5%'
                        }} className="ind-cards">
                        </Card>
                    </Card>
                }
            </Paper>
        )
    }else{
        return(
            <UserAccountScreen user={user} handleLogout={handleLogout} buttonStyle={buttonStyle}></UserAccountScreen>
        )
    }
}

export default LoginReg