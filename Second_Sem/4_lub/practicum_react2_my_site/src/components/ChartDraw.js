import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
	const chartRef = useRef(null);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
    


	useEffect(() => {
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
    }, []); 

	const  margin = {
		top:10, 
		bottom:80, 
		left:60, 
		right:10
	};

    const boundsWidth = width -  margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;


    const allValues = [];
    if (props.showMax) allValues.push(...props.data.map(d => d.maxValue));
    if (props.showMin) allValues.push(...props.data.map(d => d.minValue));
    
    const [min, max] = d3.extent(allValues);

    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
            .padding(0.2);
    }, [props.data, boundsWidth]);
  
    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min * 0.3, max * 1.1 ])
            .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);

    	
	useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        

        const xAxis = d3.axisBottom(scaleX);     
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
    
        if (props.chartType === "scatter") {
        
            if (props.showMax) {
                svg.selectAll(".max-dot")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("class", "max-dot")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.maxValue))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red");
            }

            if (props.showMin) {
                svg.selectAll(".min-dot")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("class", "min-dot")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.minValue))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue");
            }
        } else {
            // Гистограмма
            if (props.showMax) {
                svg.selectAll(".max-bar")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("class", "max-bar")
                    .attr("x", d => scaleX(d.labelX))
                    .attr("y", d => scaleY(d.maxValue))
                    .attr("width", scaleX.bandwidth() / (props.showMin ? 2 : 1))
                    .attr("height", d => boundsHeight - scaleY(d.maxValue))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red");
            }

            if (props.showMin) {
                svg.selectAll(".min-bar")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("class", "min-bar")
                    .attr("x", d => scaleX(d.labelX) + (props.showMax ? scaleX.bandwidth() / 2 : 0))
                    .attr("y", d => scaleY(d.minValue))
                    .attr("width", scaleX.bandwidth() / (props.showMax ? 2 : 1))
                    .attr("height", d => boundsHeight - scaleY(d.minValue))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue");
            }
        }

    }, [scaleX, scaleY, props.data, props.showMax, props.showMin, props.chartType, margin.top, margin.bottom, margin.left, boundsHeight, height]); 

    return (
      <svg ref={ chartRef}>  </svg>
    )
}

export default ChartDraw;