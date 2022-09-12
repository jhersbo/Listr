import { Card, Paper, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ListItems from "./ListItems"
import { useState } from "react";

const ListColumn = ({ activeList, setActiveList })=>{

    let [newItem, setNewItem] = useState(false)
    let [newItemContent, setNewItemContent] = useState('')

    const renderColumn = ()=>{
        
        

        const addItem = (target)=>{

        }
        
        if(activeList){
            let parsedColumns = JSON.parse(activeList.list_arr)
            console.log(parsedColumns)
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
                        <Button sx={{
                            border: "1px solid #1d3557",
                            borderRadius: "15%",
                            width: "20%",
                            alignSelf: "center",
                            bgcolor: "#94d2bd",
                            boxShadow: "1px 1px 5px black",
                            marginBottom: "0.5em"
                        }}>
                            <AddIcon fontSize="large" sx={{
                                color: "#1d3557"
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