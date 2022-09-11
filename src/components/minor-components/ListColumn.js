import { Card, Paper } from "@mui/material"
import ListItems from "./ListItems"

const ListColumn = ({ activeList })=>{

    const renderColumn = ()=>{
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
        <Paper elevation={2} sx={{
            margin: '2%',
            boxShadow: "5px 5px 20px black",
            padding: "3%"
        }}>
            <h3>{activeList.list_name}</h3>
            <Card>
                {renderColumn()}
            </Card>
        </Paper>
    )
}

export default ListColumn