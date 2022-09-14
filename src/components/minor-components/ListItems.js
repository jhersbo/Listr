import Cookies from "cookies-js";
import { Card, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

const serverURL = "http://localhost:3000/"

const ListItem = ({ parsedItems, activeList, setActiveList, parsedColumns, setParsedColumns, columnIndex, user })=>{

    let [update, setUpdate ] = useState(false)

    //governs rerendering. switches state back and forth on each user input
    if(update){
        setUpdate(false)
    }

    const deleteItem = async (index)=>{
        let removed = parsedItems.splice(index, 1)
        console.log(removed)
        console.log(parsedItems)

        parsedColumns[columnIndex].items = parsedItems
        activeList.list_arr = JSON.stringify(parsedColumns)
        
        //update DB list
        await fetch(serverURL + "lists", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                list_id: activeList.list_id
            })
        })
        
        await fetch(serverURL + "lists" , {
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
        console.log("Response from deletion of an item:")
        setParsedColumns(parsedColumns)
        setActiveList(activeList)
        Cookies.set('active', JSON.stringify(activeList))
        setUpdate(true)
    }
    
    const renderList = ()=>{
        let itemList = parsedItems.map((item, index)=>{
            return(
                <Card key={item.id} sx={{
                    margin: "0.5em",
                    boxShadow: "1px 1px 7px black"
                }}>
                    <Card sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <h5 id="item-labels">{item.content}</h5>
                        <Button sx={{
                            
                        }} onClick={async ()=>{await deleteItem(index)}}>
                            <DeleteIcon sx={{
                                color: "#003554",
                                position: 'relative',
                                zIndex: 0
                            }}></DeleteIcon>
                        </Button>
                    </Card>
                </Card>
            )
        })
        return itemList
    }
    
    return(
        <div>
            {renderList()}
        </div>
    )
}

export default ListItem