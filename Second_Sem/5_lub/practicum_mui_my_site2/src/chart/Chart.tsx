import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { years, countries, types } from "./groupdata";
import GroupGrid from './components/GroupGrid';
import GroupChart from './components/GroupChart';
import SettingChart from './components/SettingChart';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import * as React from 'react';

type tSelect = "Издательство" | "Год" | "Автор";

function Chart() {
  const [group, setGroup] = React.useState<tSelect>("Издательство");
  const [groupData, setGroupData] = React.useState(countries);
  const [series, setSeries] = React.useState({
    'Максимальная читаемость': true,
    'Средняя читаемость': false,
    'Минимальная читаемость': false,
  });
  const [isBar, setIsBar] = React.useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);
    
    switch(value) {
      case "Год":
        setGroupData(years);
        break;
      case "Автор":
        setGroupData(types);
        break;
      default:
        setGroupData(countries);
    }
  };

  return (
    <div>
      <Navbar active="3" />
      
      <Box sx={{ width: 200, m: '20px auto' }}>
        <FormControl fullWidth>
          <InputLabel>Группировать по</InputLabel>
          <Select
            value={group}
            label="Группировать по"
            onChange={handleChange}
          >
            <MenuItem value="Издательство">Издательству</MenuItem>
            <MenuItem value="Год">Году</MenuItem>
            <MenuItem value="Автор">Автору</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <SettingChart 
        series={series} 
        setSeries={setSeries} 
        isBar={isBar} 
        setIsBar={setIsBar} 
      />
      
      <GroupChart 
        data={groupData} 
        series={series} 
        isBar={isBar} 
      />
      
      <GroupGrid data={groupData} />
    <Footer/>
    </div>
  );
}

export default Chart;