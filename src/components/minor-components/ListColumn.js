import { Card, Paper } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ListItems from "./ListItems"

const ListColumn = ({ activeList, setActiveList })=>{

    const renderColumn = ()=>{
        if(activeList){
            let parsedColumns = JSON.parse(activeList.list_arr)
            console.log(parsedColumns)
            let mappedList = parsedColumns.map((element, index) =>{
                let parsedItems = element.items
                console.log(parsedItems)
                return(
                    <Card key={index} className="scroll-box" sx={{
                        boxShadow: "none",
                        bgcolor: "#fefae0"
                    }}>
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
            padding: "20% 3% 3%",
            bgcolor: "#fefae0"
        }}>
             <ArrowBackIosNewIcon onClick={()=>{setActiveList(null)}}></ArrowBackIosNewIcon>
            <h3>{activeList.list_name}</h3>
            {renderColumn()}
        </Paper>
    )
}

export default ListColumn