// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка

function createArrGraph(data, key) {  
  
    groupObj = d3.group(data, d => d[key]);

    let arrGraph =[];
    for(let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d['Читали (тыс.)']));
        arrGraph.push({labelX : entry[0], values : minMax});
     }

     return arrGraph;
}

function drawGraph(data, keyX, oyMax, oyMin, chartType) {
    // создаем массив для построения графика
    const arrGraph = createArrGraph(data, keyX);

    let svg = d3.select("svg")  
    svg.selectAll('*').remove();
    svg.style("height", "600px");

    // создаем словарь с атрибутами области вывода графика
    attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 100,
        marginBottom: 100,
    }

    if (!oyMax && !oyMin) {
        d3.select("#error-message").text("Выберите хотя бы одно значение по оси OY!");
        d3.select("svg").style("height", "0px");
        return;
    }
    let [scX, scY] = createAxis(svg, arrGraph, attr_area, ((!oyMax) ? 0 : 1));
    d3.select("#error-message").text("");   

    if (chartType == "scatter") {
        if (arrGraph.length < 1) {
            d3.select("#error-message").text("График невозможно построить по отфильтрованным данным");
            d3.select("svg").style("height", "0px");
            return;
        }
        if (oyMin) {
            createChart(svg, arrGraph, scX, scY, attr_area, "blue", 0);
        }
    
        if (oyMax) {
            createChart(svg, arrGraph, scX, scY, attr_area, "red", 1);
        }
    } else if (chartType == "bar") {
        if (arrGraph.length < 1) {
            d3.select("#error-message").text("График невозможно построить по отфильтрованным данным");
            d3.select("svg").style("height", "0px");
            return;
        }
        if (oyMin) {
            createGystos(svg, arrGraph, scX, scY, attr_area, "blue", 0);
        }
    
        if (oyMax) {
            createGystos(svg, arrGraph, scX, scY, attr_area, "red", 1);
        }        
    } else if (chartType == "line") {
        if (arrGraph.length < 2) {
            d3.select("#error-message").text("График невозможно построить по отфильтрованным данным");
            d3.select("svg").style("height", "0px");
            return;
        }
        if (oyMin) {
            createLine(svg, arrGraph, scX, scY, attr_area, "blue", 0);
        }
    
        if (oyMax) {
            createLine(svg, arrGraph, scX, scY, attr_area, "red", 1);
        }        
    }  

}

function createAxis(svg, data, attr_area, maxH){
    // находим интервал значений, которые нужно отложить по оси OY 
    // максимальное и минимальное значение и максимальных высот по каждой стране
    let [min, max] = d3.extent(data.map(d => d.values[maxH]));
    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
     let scaleX = d3.scaleBand()
                    .domain(data.map(d => d.labelX))
                    .range([0, attr_area.width - 2 * attr_area.marginX]);
                    
     let scaleY = d3.scaleLinear()
                    .domain([min * 0, max * 1.03 ])
                    .range([attr_area.height - 2 * attr_area.marginY, 0]);               
     
     // создание осей
    let axisX = d3.axisBottom(scaleX); // горизонтальная 
    let axisY = d3.axisLeft(scaleY); // вертикальная

    // отрисовка осей в SVG-элементе
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, 
                                      ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text") // подписи на оси - наклонные
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");
    
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);
        
    return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, max) {
    const r = 4;
    let changing = 0;
    if (color == 'red') changing += 3;
    if (color == 'green') changing += 6;

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[max]) + changing)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}

function createGystos(svg, data, scaleX, scaleY, attr_area, color, max) {
    const w = 5;
    let changing = -2.5;
    if (color == 'blue') changing += 5;

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => (scaleX(d.labelX) + scaleX.bandwidth() * 0.487) - changing)
        .attr("y", d => scaleY(d.values[max]))
        .attr("width", w)
        .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values[max]))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}

function createLine(svg, data, scaleX, scaleY, attr_area, color, max) {
    // Аналогично вашему стилю с гистограммами
    let changing = 0;
    if (color == 'blue') changing += 3;
    
    svg.selectAll(".line-segment")
        .data(data.slice(0, -1)) // Берем все точки кроме последней
        .enter()
        .append("line")
        .attr("x1", d => (scaleX(d.labelX) + scaleX.bandwidth() / 2))
        .attr("y1", d => scaleY(d.values[max])+ changing)
        .attr("x2", d => (scaleX(data[data.indexOf(d) + 1].labelX) + scaleX.bandwidth() / 2))
        .attr("y2", d => scaleY(data[data.indexOf(d) + 1].values[max])+ changing)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("stroke", color)
        .style("stroke-width", 2);
}