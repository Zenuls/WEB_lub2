import { useState, useEffect } from "react";
import * as d3 from "d3";
import ChartDraw from './ChartDraw.js';


const Chart = (props) => {
    const [ox, setOx] = useState("Автор");
    const [oy, setOy] = useState([true, false]);
    const [chartType, setChartType] = useState("scatter");
    const [error, setError] = useState(null);
    const [shouldRenderChart, setShouldRenderChart] = useState(false);

 
    useEffect(() => {
        if (!oy[0] && !oy[1]) {
            setError("Выберите хотя бы одно значение по оси OY");
        } else {
            setError(null);
        }
    }, [oy]); 

    const handleSubmit = (event) => {        
        event.preventDefault();

        if (!oy[0] && !oy[1]) {
            setError("Выберите хотя бы одно значение по оси OY");
            setShouldRenderChart(false);
            return;
        }
        setOx(event.target["ox"].value); 
        setChartType(event.target["chartType"].value);
        setShouldRenderChart(true);
		
	}

    const handleCheckboxChange = (index) => {
        const newOy = [...oy];
        newOy[index] = !newOy[index];
        setOy(newOy);
        setShouldRenderChart(false); 
    };

    const createArrGraph =(data, key)=>{   
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Читали (тыс.)']));
            arrGraph.push({labelX: entry[0], minValue: minMax[0], maxValue: minMax[1] });
        }

        if (key === "Год издания") {
            arrGraph.sort((a, b) => {
                
                const yearA = parseInt(a.labelX);
                const yearB = parseInt(b.labelX);
                return yearA - yearB;
            });
        }
        return arrGraph;
    }



    return (
        <>
        <h4>Визуализация</h4>
        <form onSubmit={ handleSubmit}>
            <p> Значение по оси OX: </p>
            <div>
                <input type="radio" name="ox" value="Автор" defaultChecked={ ox === "Автор" }/>
                Автор
                <br/>		
                <input type="radio" name="ox" value="Год издания" />
                Год издания
                <br/>		
                <input type="radio" name="ox" value="Издательство" />
                Издательство
            </div>

            <p> Значение по оси OY </p>
            <div>
                <input type="checkbox" name="oy" defaultChecked={ oy[0] === true } onChange={() => handleCheckboxChange(0)}/>
                Максимальная читаемость <br/>
                <input  type="checkbox" name="oy" onChange={() => handleCheckboxChange(1)}/>
                Минимальная читаемость
            </div>

             <p>Тип диаграммы:</p>
            <select name="chartType" defaultValue={chartType}>
                <option value="scatter">Точечная диаграмма</option>
                <option value="bar">Гистограмма</option>
            </select>

            {error && <div style={{ color: "red" }}>{error}</div>}

            <p>  
                <button type="submit">Построить </button>
            </p>
        </form>  
        {shouldRenderChart && !error &&  (
        <ChartDraw data={ createArrGraph(props.data, ox)} showMax={oy[0]} showMin={oy[1]} chartType={chartType}/>  
        )}
        </>
    )
}

export default Chart;