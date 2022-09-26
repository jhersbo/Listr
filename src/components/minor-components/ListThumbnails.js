import { Paper, Button, Card } from "@mui/material"

const ListThumbnails = ({ newListPage, renderLists })=>{
    
    return(
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
}

export default ListThumbnails