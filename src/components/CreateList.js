import { useState, useEffect } from "react"

import { Paper, Card, Button } from "@mui/material"

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
        <Paper sx={{
            margin: '2%',
            boxShadow: "5px 5px 20px black",
            padding: "20% 3% 3%",
            minHeight: "81vh",
        }}>
            <Card>
                <h3>Create your list</h3>
                <Button onClick={async()=>{await createListRequest()}}>Create</Button>
            </Card>
        </Paper>
    )
}

export default CreateList