import Cookies from "cookies-js";


import ListColumn from "./minor-components/ListColumn";
import SignedOutPage from "./minor-components/SignedOutPage";
import ListThumbnails from "./minor-components/ListThumbnails";

import { Card, Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";

const ListArea = ({ thinScreen, user, setUser, userDB, listDB, setListDB, noLists, setNoLists, activeList, setActiveList, serverURL })=>{
    
    
    let [clearList, setClearList] = useState(false)

    let [newListName, setNewListName] = useState('')
    let [editingListName, setEditingListName] = useState([false, null])
    let [userListDB, setUserListDB] = useState('')
    let [sharedLists, setSharedLists] = useState('')

    const setActiveListPersistence = (element)=>{
        // console.log(element)
        setActiveList(element)
        Cookies.set('active', JSON.stringify(element))
    }

    const newListPage = ()=>{
        window.location.href = "/create"
    }

    const assignUserLists = async ()=>{
        if(listDB !== null && user){
            let userListsArr = await listDB.filter(element => element.user_id === user.user_id)
            let sortedByDate = userListsArr.sort((a, b)=>{
                return Date.parse(b.date_created) - Date.parse(a.date_created)
            })
            setUserListDB(sortedByDate)
            // console.log(userListDB)
        }else{
            return
        }
    }

    const assignSharedLists = ()=>{
        if(listDB !== null && user){
            //come back to this
        }
    }

    const handleListNameEdits = (index)=>{
        setEditingListName([true, index])
    }

    //need to make it rerender on delete
    const handleDeleteList = async (arr, element, index)=>{
        await fetch(serverURL + "lists", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                list_id: userListDB[index].list_id
            })
        })
        //only way I can get it to rerender
        window.location.href = '/'
    }

    const handleListNameSave = async (index)=>{
        
        userListDB[index].list_name = newListName

        await fetch(serverURL + "lists", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                list_id: userListDB[index].list_id
            })
        })
        
        
        let response = await fetch(serverURL + "lists" , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                list_id: userListDB[index].list_id,
                list_name: userListDB[index].list_name, 
                list_arr: userListDB[index].list_arr,
                date_created: new Date(),
                user_id: user.user_id
            })
        })
        console.log("Response changing list name:")
        console.log(response)
        
        
        setEditingListName([false, null])
    }

    useEffect(()=>{
        assignUserLists()
    }, [user, userDB, listDB])

    const renderLists = ()=>{
        if(userListDB){
            return(
                userListDB.map((element, index)=>{
                    return(
                        <div>
                            <Card key={index} sx={{
                                marginBottom: "0.5em",
                                boxShadow: "1px 1px 7px black",
                                bgcolor: "#fefae0",
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                <h5 key={element.list_id} className='list-names' onClick={()=>{setActiveListPersistence(element)}}>{element.list_name}</h5>
                                {!editingListName[0]?
                                    <Card sx={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                        bgcolor: "#fefae0",
                                        border: "none",
                                        boxShadow: "none"
                                    }}>
                                        <Button onClick={()=>{handleListNameEdits(index)}}>
                                            <EditIcon sx={{
                                                padding: "none",
                                                color: "#003554"
                                            }}></EditIcon>
                                        </Button>
                                        <Button onClick={()=>{handleDeleteList(userListDB, element, index)}}>
                                            <DeleteIcon sx={{
                                                padding: "none",
                                                color: "#d62828",
                                                // textShadow: "1px 1px #003554"
                                            }}></DeleteIcon>
                                        </Button>
                                    </Card>
                                :
                                    <Card sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        bgcolor: "#fefae0",
                                        border: "none",
                                        boxShadow: "none" 
                                    }}>
                                        {editingListName[1] === index?
                                            <Card sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                bgcolor: "#fefae0",
                                                border: "none",
                                                boxShadow: "none"
                                            }}>
                                                <TextField label="Enter new list name." sx={{
                                                    bgcolor: "white",
                                                    margin: "2%"
                                                }} onChange={(e)=>{setNewListName(e.target.value)}}></TextField>
                                                <Button sx={{
                                                    color: "#94d2bd",
                                                    fontFamily: "Antonio, sans-serif",
                                                    // textShadow: "-1px -1px 0 #003554b, 1px -1px 0 #003554b, -1px 1px 0 #003554b, 1px 1px 0 #003554b;",
                                                    fontSize: "21px",
                                                    width: "20%",
                                                    padding: "0%",
                                                    margin: "2%",
                                                    alignSelf: "center",
                                                    border: "1px solid #003554",
                                                    bgcolor: "#003554",
                                                    boxShadow: "1px 1px 5px black"
                                                }} onClick={async ()=>{await handleListNameSave(index)}}>Save</Button>
                                            </Card>
                                        :
                                            null
                                        }
                                    </Card>
                                }
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
            <ListThumbnails newListPage={newListPage} renderLists={renderLists}></ListThumbnails>
        )
    }else if(!user){
        return(
            <SignedOutPage></SignedOutPage>
        )
    }else if(activeList && listDB){
        return(
            <ListColumn activeList={activeList} setActiveList={setActiveList} user={user} setUser={setUser} userListDB={userListDB} setUserListDB={setUserListDB} listDB={listDB} setListDB={setListDB} clearList={clearList} setClearList={setClearList}></ListColumn>
        )
    }

}

export default ListArea