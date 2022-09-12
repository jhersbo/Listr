import ListColumn from "./minor-components/ListColumn";

import { Card, Paper, Button } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useState, useEffect } from "react";
// import Cookies from "cookies";

const ListArea = ({ thinScreen, user, setUser, userDB, listDB, setListDB, userListDB, setUserListDB, noLists, setNoLists })=>{
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

    //component states
    let [activeList, setActiveList] = useState(null)
    let [clearList, setClearList] = useState(false)

    // if(clearList){
    //     ListColumn.render()
    //     setClearList(true)
    // }

    const newListPage = ()=>{
        window.location.href = "/create"
    }

    const assignUserLists = async ()=>{
        if(listDB !== null && user){
            let userListsArr = await listDB.filter(element => element.user_id === user.user_id)
            setUserListDB(userListsArr)
            console.log(userListDB)
        }else{
            return
        }
        //having issues setting the no list state. It will set the "no list" state if the API call takes too long, but will correct once the listDB variable is set. Maybe try .then in useEffect?
    }

    useEffect(()=>{
        assignUserLists()
    }, [user, userDB, listDB])

    const renderLists = ()=>{
        if(userListDB){
            let sortedByDate = userListDB.sort((a, b)=>{
                return Date.parse(b.date_created) - Date.parse(a.date_created)
            })
            return(
                sortedByDate.map((element, index)=>{
                    return(
                        <div>
                            <Card onClick={()=>{setActiveList(element)}} sx={{
                                marginBottom: "0.5em",
                                boxShadow: "1px 1px 7px black",
                                bgcolor: "#fefae0"
                            }}>
                                <h5 key={element.list_id}>{element.list_name}</h5>
                            </Card>
                        </div>
                    )
                })
            )
        }else{
            return(
                <h3>Loading...</h3>
            )
        }
    }
    
    if(user && listDB && !activeList){
        return(
            //button for creating new list
            <Paper elevation={2} sx={{
                margin: '2%',
                boxShadow: "5px 5px 20px black",
                padding: "20% 3% 3%",
                minHeight: "81vh",
            }}>
                <h2>Your lists:</h2>
                <Button variant="text" onClick={()=>{newListPage()}}sx={{
                    color: "#94d2bd",
                    fontFamily: "Antonio, sans-serif",
                    textShadow: "-1px -1px 0 #22223b, 1px -1px 0 #22223b, -1px 1px 0 #22223b, 1px 1px 0 #22223b;",
                    fontSize: "21px",
                    width: "50%",
                    padding: "0%",
                    alignSelf: "center"
                }}>New List                                
                </Button>
                <Paper>
                    {renderLists()}
                </Paper>
            </Paper>
        )
    }else if(!user){
        return(
            <Paper elevation={2} sx={{
                margin: '2%',
                boxShadow: "5px 5px 20px black",
                padding: "20% 3% 3%"
            }}>
                <h2>Sign in to manage your lists.</h2>
            </Paper>
        )
    }else if(activeList){
        return(
            <ListColumn activeList={activeList} setActiveList={setActiveList} user={user} setUser={setUser} userListDB={userListDB} setUserListDB={setUserListDB} listDB={listDB} setListDB={setListDB} clearList={clearList} setClearList={setClearList}></ListColumn>
        )
    }

}

export default ListArea