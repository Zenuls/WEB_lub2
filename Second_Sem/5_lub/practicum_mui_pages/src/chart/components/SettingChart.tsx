import { 
  FormControl, 
  FormLabel, 
  FormControlLabel, 
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Divider
} from '@mui/material';

type tSeries = {
  'Максимальная высота': boolean;
  'Средняя высота': boolean;
  'Минимальная высота': boolean;
};

type CheckboxProps = {
    series: tSeries;
    setSeries: React.Dispatch<
      React.SetStateAction<tSeries>
    >;
};

type SettingChartProps = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
  isBar: boolean;
  setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingChart({ series, setSeries, isBar, setIsBar }: SettingChartProps) {
  const handleSeriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({
      ...series,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChartTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBar(event.target.value === 'bar');
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={4}
      sx={{ m: "20px 0" }}
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">Тип диаграммы:</FormLabel>
        <RadioGroup
          value={isBar ? 'bar' : 'line'}
          onChange={handleChartTypeChange}
        >
          <FormControlLabel 
            value="bar" 
            control={<Radio />} 
            label="Гистограмма" 
          />
          <FormControlLabel 
            value="line" 
            control={<Radio />} 
            label="Линейная" 
          />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">Показать:</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={series['Максимальная высота']}
              onChange={handleSeriesChange}
              name="Максимальная высота"
            />
          }
          label="Максимальную высоту"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={series['Средняя высота']}
              onChange={handleSeriesChange}
              name="Средняя высота"
            />
          }
          label="Среднюю высоту"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={series['Минимальная высота']}
              onChange={handleSeriesChange}
              name="Минимальная высота"
            />
          }
          label="Минимальную высоту"
        />
      </FormControl>
    </Stack>
  );
}

export default SettingChart;