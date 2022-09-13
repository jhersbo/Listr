import Cookies from "cookies-js";

import ListColumn from "./minor-components/ListColumn";

import { Card, Paper, Button } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useState, useEffect } from "react";
// import Cookies from "cookies";

const ListArea = ({ thinScreen, user, setUser, userDB, listDB, setListDB, userListDB, setUserListDB, noLists, setNoLists})=>{
    let [clearList, setClearList] = useState(false)
    let [activeList, setActiveList] = useState(null)

    const setActiveListPersistence = (element)=>{
        Cookies.set('active', JSON.stringify(element))
        setActiveList(element)
    }

    const newListPage = ()=>{
        window.location.href = "/create"
    }

    const assignUserLists = async ()=>{
        if(listDB !== null && user){
            let userListsArr = await listDB.filter(element => element.user_id === user.user_id)
            setUserListDB(userListsArr)
            // console.log(userListDB)
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
                            <Card onMouseDown={()=>{setActiveListPersistence(element)}} key={index} sx={{
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
                <Card sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    border: "none",
                    boxShadow: "none"
                }}>
                    <h2>Your lists:</h2>
                    <Button variant="text" onClick={()=>{newListPage()}}sx={{
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
                    }}>New List                                
                    </Button>
                </Card>
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