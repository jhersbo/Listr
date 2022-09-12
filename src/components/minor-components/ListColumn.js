import { Card, Paper, Button, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ListItems from "./ListItems"
import { useState } from "react";

const ListColumn = ({ activeList, setActiveList })=>{

    let [addingIndex, setAddingIndex] = useState(null)
    let [newItemContent, setNewItemContent] = useState('')

    const saveNewItem = ()=>{
        setAddingIndex(null)
    }
    
    let parsedColumns = JSON.parse(activeList.list_arr)

    const renderColumn = ()=>{
        if(activeList){
            let mappedList = parsedColumns.map((element, index) =>{
                let parsedItems = element.items
                console.log(parsedItems)
                return(
                    <Card key={index} className="scroll-box" sx={{
                        boxShadow: "none",
                        bgcolor: "#fefae0",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <h4>{element.column_title}</h4>
                        <ListItems activeList={activeList} parsedItems={parsedItems}></ListItems>

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
                                <Button onClick={()=>{saveNewItem()}}>Save</Button>
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
             <ArrowBackIosNewIcon onClick={()=>{setActiveList(null)}}></ArrowBackIosNewIcon>
            <h3>{activeList.list_name}</h3>
            {renderColumn()}
        </Paper>
    )
}

export default ListColumn