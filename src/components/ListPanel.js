import ListItem from "./ListItem"

const ListPanel = ({ thinScreen, user, listDB })=>{

    // if(!user){
    //     return(
    //         <h3>Sign in to manage your list.</h3>
    //     )
    // }else{
    //     const usersList = listDB.filter(element => element.user_id === user.user_id)
    //     const individualItems = usersList.map((item, index)=>{
    //         return(
    //             <ListItem key={item.item_id} user={user} thinScreen={thinScreen} listDB={listDB}></ListItem>
    //         )
    //     })
    //     return(
    //         <h3>Sug</h3>
    //     )
    // }

}

export default ListPanel