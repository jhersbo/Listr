import { Card, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

const ListItem = ({ parsedItems, activeList, setActiveList })=>{
    
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
                        <h5>{item.content}</h5>
                        <Button sx={{
                            
                        }} onClick={async ()=>{}}>
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