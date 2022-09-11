import { Card, Paper } from "@mui/material"
import ListItems from "./ListItems"

const ListColumn = ({ activeList })=>{

    const renderList = ()=>{
        if(activeList){
            let parsedColumns = JSON.parse(activeList.list_arr)
            console.log(parsedColumns)
            let mappedList = parsedColumns.map((element, index) =>{
                let parsedItems = element.items
                console.log(parsedItems)
                return(
                    <Card key={index}>
                        <h4>{element.column_title}</h4>
                        <ListItems activeList={activeList} parsedItems={parsedItems}></ListItems>
                    </Card>
                    
                )
            })
            return mappedList
        }
    }

    return(
        <Paper>
            <h3>{activeList.list_name}</h3>
            <Card>
                {renderList()}
            </Card>
        </Paper>
    )
}

export default ListColumn