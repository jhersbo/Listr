import { Card } from "@mui/material"

const ListItem = ({ parsedItems })=>{
    
    const renderList = ()=>{
        let itemList = parsedItems.map((item, index)=>{
            return(
                <Card key={item.id}>
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