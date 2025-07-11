import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { tGroup } from "../groupdata";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

type GroupProps = {
  data: tGroup[];
};

function GroupGrid({ data }: GroupProps) {
  const rows: GridRowsProp = data;
  
  const columns: GridColDef[] = [
    { field: 'Группа', headerName: 'Группа', flex: 1 },
    { field: 'Минимальная читаемость', flex: 0.5 },
    { field: 'Средняя читаемость', flex: 0.5 },
    { field: 'Максимальная читаемость', flex: 0.5 },
    
  ];

  return (
    <Container maxWidth="lg" sx={{ height: 400, mt: '20px' }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
      />
    </Container>
  );
}

export default GroupGrid;