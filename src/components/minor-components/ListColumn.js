import Cookies from "cookies-js";

import { Card, Paper, Button, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ListItems from "./ListItems"
import { useState } from "react";

const ListColumn = ({ activeList, setActiveList, user, setUser, listDB, setListDB, clearList, setClearList })=>{

    //server URL
    const serverURL = "http://localhost:3000/"

    let [addingIndex, setAddingIndex] = useState(null)
    let [newItemContent, setNewItemContent] = useState('')
    let [parsedColumns, setParsedColumns] = useState(JSON.parse(activeList.list_arr))

    const unsetActiveListPersistence = ()=>{
        Cookies.set('active', '')
        setActiveList('')
    }

    console.log(parsedColumns)

    const saveNewListVersion = async (element)=>{
        let newList = element.items.concat({
            id: `item-${new Date().getTime()}`,
            content: newItemContent,
            notes: null
        })
        parsedColumns[addingIndex].items = newList
        // console.log(newList)
        // console.log(parsedColumns)
        //this fetch request is timing out. the one on Postman also does.
        
        await fetch(serverURL + "lists", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                list_id: activeList.list_id
            })
        })
        
        
        let response = await fetch(serverURL + "lists" , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                list_id: activeList.list_id,
                list_name: activeList.list_name, 
                list_arr: JSON.stringify(parsedColumns),
                date_created: new Date(),
                user_id: user.user_id
            })
        })
        console.log(response)
        setAddingIndex(null)
        setClearList(true)
        //have to get it to render without refresh
        //add delete buttons
    }

    const renderColumn = ()=>{
        if(activeList){
            // console.log(activeList)
            let mappedList = parsedColumns.map((element, index) =>{
                let parsedItems = element.items
                // console.log(parsedItems)
                return(
                    <Card key={index} className="scroll-box" sx={{
                        boxShadow: "none",
                        bgcolor: "#fefae0",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <h4>{element.column_title}</h4>
                        <ListItems activeList={activeList} setActiveList={setActiveList}parsedItems={parsedItems} clearList={clearList} setClearList={setClearList} ></ListItems>

                        {addingIndex === index?
                            <Card sx={{
                                boxShadow: "none",
                                bgcolor: "#fefae0",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <TextField sx={{
                                    bgcolor: "white",
                                    margin: "0.5em",
                                    boxShadow: "1px 1px 7px black"
                                }} onChange={(e)=>{setNewItemContent(e.target.value)}}></TextField>
                                <Button onClick={async ()=>{await saveNewListVersion(element)}}>Save</Button>
                            </Card>
                        :
                            null    
                        }

                        <Button sx={{
                            border: "1px solid #003554",
                            borderRadius: "15%",
                            width: "20%",
                            alignSelf: "center",
                            bgcolor: "#94d2bd",
                            boxShadow: "1px 1px 5px black",
                            marginBottom: "0.5em"
                        }} onClick={()=>{setAddingIndex(index)}}>
                            <AddIcon fontSize="large" sx={{
                                color: "#003554"
                            }}></AddIcon>
                        </Button>
                    </Card>
                )
            })
            return mappedList
        }
    }

    return(
        <Paper elevation={2} sx={{
            margin: '2%',
            boxShadow: "5px 5px 20px black",
            padding: "20% 3% 3%",
            bgcolor: "#fefae0"
        }}>
             <ArrowBackIosNewIcon onClick={()=>{unsetActiveListPersistence(null)}}></ArrowBackIosNewIcon>
            <h3>{activeList.list_name}</h3>
            {renderColumn()}
        </Paper>
    )
}

export default ListColumn