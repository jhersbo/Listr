import ListColumn from "./minor-components/ListColumn";

import { Card, Paper } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useState, useEffect } from "react";

const ListPanel = ({ thinScreen, user, listDB, setListDB, userListDB, setUserListDB, noLists, setNoLists })=>{
    // fake data generator
    const getItems = (count, offset = 0) =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k + offset}-${new Date().getTime()}`,
            content: `item ${k + offset}`
    }));
    
    //with react-beautiful-dnd
    const reorder = (list, startIndex, endIndex)=>{
        let result = Array.from(list)
        let [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
    }

    //one list to another
    const move = (source, destination, droppableSource, droppableDestination)=>{
        let sourceClone = Array.from(source)
        let destClone = Array.from(destination)
        let [removed] = sourceClone.splice(droppableSource.index, 1)
        
        destClone.splice(droppableDestination.index, 0, removed)

        const result = {}
        result[droppableSource.droppableId] = sourceClone
        result[droppableDestination.droppableId] = destClone

        return result;
    }

    const assignUserLists = async ()=>{
        let userListsArr = await listDB.filter(element => element.user_id === user.user_id)
        setUserListDB(userListsArr)
        console.log(userListDB)
        //having issues setting the no list state. It will set the "no list" state if the API call takes too long, but will correct once the listDB variable is set. 
    }

    useEffect(()=>{
        assignUserLists()
    }, [user, listDB])

    // const renderList = ()=>{
    //     userListDB.map((element, index)=>{
    //         return(
    //             <Card key={index}>
    //                 <h5>item</h5>
    //             </Card>
    //         )
    //     })
    // }
    
    if(user){
        return(
            <Paper>
                <h1>Your list:</h1>
                <Paper>
                    {/* {renderList} */}
                </Paper>
            </Paper>
        )
    }else{
        return(
            <Paper>
                <h2>Sign in to manage your lists.</h2>
            </Paper>
        )
    }

}

export default ListPanel