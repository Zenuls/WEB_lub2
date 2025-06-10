import books from "../table"; 
import { DataGrid, GridRowsProp, GridColDef  } from "@mui/x-data-grid"; 
import { ruRU } from '@mui/x-data-grid/locales'; 
import Container from '@mui/material/Container'; 
 
function BuildingsGrid() { 
 
    const rows: GridRowsProp = books; 
 
    const columns: GridColDef[] = [ 
        { field: 'Название книги', headerName: 'Название', flex: 0.5}, 
        { field: 'Автор', flex: 0.6}, 
        { field: 'Год издания', flex: 0.5}, 
        { field: 'Издательство', flex: 0.3}, 
        { field: 'Кол-во страниц' }, 
        { field: 'Читали (тыс.)'},
    ];  
       
    return ( 
        <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}> 
          <DataGrid  
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} 
            rows={rows}  
            columns={columns}  
            showToolbar={true}
            pageSizeOptions={[10, 20, 30, 100]}
          /> 
        </Container>  
 
  ); 
}

 export default BuildingsGrid;