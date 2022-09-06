import { useState } from "react"
import Cookies from 'cookies-js'

import { Card, Paper, TextField, Button } from "@mui/material"

const LoginReg = ({ user, setUser, userDB, setUserDB, thinScreen })=>{
    
    let [username, setUsername] = useState(user? user.username: '')
    let [password, setPassword] = useState(user? user.password: '')
    let [name, setName] = useState('')
    let [newUser, setNewUser] = useState(false)
    
    const handleLogin = (e)=>{
        let usernamesInDB = userDB.map(user => user.username)
        let passwordsInDB = userDB.map(user => user.password)
        if (usernamesInDB.includes(username) && passwordsInDB.includes(password)){
            let index = usernamesInDB.indexOf(username)
            if(userDB[index].password === password){
                setUser(userDB[index])
                Cookies.set('user', JSON.stringify(userDB[index]))
                console.log('You are logged in')
            }
        }
    }

    const handleLogout = ()=>{
        setUser(undefined)
        Cookies.set('user', undefined)
    }

    const handleRegistration = (e)=>{
        setNewUser(false)
    }

    if(!user){
        return(
            <Paper elevation={2} sx={{
                margin: '2%'
            }}>
                {!newUser?
                    <Card>
                        <Card sx={{
                            justifyContent: 'center', 
                            marginTop: '5%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            padding: '5%'
                        }}>
                            <h3>Log in</h3>
                            <TextField
                            required
                            id="outlined-required"
                            label="Username"
                            onChange={(e)=>{setUsername(e.target.value)}}
                            />
                            <TextField
                            required
                            id="outlined-required"
                            label="Password"
                            onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <Button variant="contained" onClick={()=>{handleLogin()}} sx={{
                                marginTop: '2%'
                            }}>Login</Button>
                        </Card>
                        <Card sx={{
                            justifyContent: 'center', 
                            marginTop: '0%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            padding: '5%'
                        }}>
                            <h5 style={{'margin': '0%'}}>Don't have an account?</h5>
                            <Button variant="text" onClick={()=>{setNewUser(true)}}>Register Here!</Button>
                        </Card>
                    </Card>
                    :
                    <Card>
                        <Card sx={{
                            justifyContent: 'center', 
                            marginTop: '5%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            padding: '5%'
                        }}>
                            <h3>Register Here</h3>
                            <TextField
                            required
                            id="outlined-required"
                            label="Username"
                            onChange={(e)=>{setUsername(e.target.value)}}
                            />
                            <TextField
                            required
                            id="outlined-required"
                            label="Password"
                            onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <Button variant="contained" onClick={()=>{handleRegistration()}} sx={{
                                marginTop: '2%'
                            }}>Register</Button>
                        </Card>
                        <Card sx={{
                            justifyContent: 'center', 
                            marginTop: '0%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            padding: '5%'
                        }}>
                        </Card>
                    </Card>
                }
            </Paper>
        )
    }else{
        return(
            <Paper elevation={2} sx={{
                margin: '2%'
            }}>
                <Card sx={{
                    justifyContent: 'center', 
                    marginTop: '5%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    padding: '5%'
                }}>
                    <h3>Account information</h3>
                    <h6>Username: {user.username}</h6>
                    <h6>Name: {user.name}</h6>
                    <Button variant="contained" onClick={()=>{handleLogout()}}>Logout</Button>
                </Card>
            </Paper>
        )
    }
}

export default LoginReg