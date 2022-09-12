import { Card } from "@mui/material"

const ListItem = ({ parsedItems, activeList, setActiveList })=>{
    
    const renderList = ()=>{
        let itemList = parsedItems.map((item, index)=>{
            return(
                <Card key={item.id} sx={{
                    margin: "0.5em",
                    boxShadow: "1px 1px 7px black"
                }}>
                    <h5>{item.content}</h5>
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