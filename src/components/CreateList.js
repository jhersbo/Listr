import { useState, useEffect } from "react"

import { Paper, Card, Button, TextField } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

//server URL
const serverURL = "http://localhost:3000/"

const CreateList = ({ user })=>{

    let [listName, setlistName] = useState('')
    let [listColumns, setListColumns] = useState([])

    const createListRequest = async ()=>{
        
        function generateListId(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); 
        }

        let packageColumnData = ()=>{
            let mappedArr = listColumns.map((element, index)=>{
                let dataPacket = {
                    column_title: element,
                    items: []
                }
                return dataPacket
            })
            return mappedArr
        }

        let dataPKG = {
            list_id: generateListId(1, 10000000),
            list_name: listName,
            user_id: user.user_id,
            list_arr: JSON.stringify(packageColumnData()),
            date_created: new Date()
        }
        console.log(dataPKG)
        let response = await fetch(serverURL + "lists" , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataPKG)
        })
        console.log("Response for creating a new list:")
        console.log(response)
    }
    
    return(
        <Paper elevation={24} sx={{
            margin: '2%',
            boxShadow: "5px 5px 20px black",
            padding: "20% 3% 3%",
            minHeight: "81vh",
            bgcolor: "#fefae0"
        }}>
            <Card sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: "#fefae0",
                    boxShadow: 'none'
                }}>
                <Card sx={{
                    bgcolor: "#fefae0",
                    boxShadow: 'none'
                }}>
                    <ArrowBackIosNewIcon onClick={()=>{window.location.href = '/'}}></ArrowBackIosNewIcon>
                    <h2>Create your list:</h2>
                    <TextField label="Name your list!" sx={{
                        bgcolor: 'white',
                    }} onChange={(e)=>{setlistName(e.target.value)}}></TextField>
                    <Card sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        bgcolor: "#fefae0",
                    }}>
                        <Button>
                            <AddIcon sx={{
                                color: '#003554',
                                fontSize: 35
                            }}></AddIcon>
                        </Button>
                        <Button>
                            <RemoveIcon sx={{
                                color: '#003554',
                                fontSize: 35
                            }}></RemoveIcon>
                        </Button>
                    </Card>   
                </Card>
                <Button onClick={async()=>{await createListRequest()}} sx={{
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
                    }}>Create</Button>
            </Card>
        </Paper>
    )
}

export default CreateList