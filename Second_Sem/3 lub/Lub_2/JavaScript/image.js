function drawPict(svg) {
    let pict = svg.append("g")
                

    pict.append("circle") 
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 90)
        .style("fill", "lightgreen");


    pict.append("circle") 
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 70)
        .style("fill", "lightblue");

    
    pict.append("circle") 
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .style("fill", "red");

    
    pict.append("polygon")
        .attr("points", "0,-50 47.05,-15.45 29.39,40.45 -29.39,40.45 -47.05,-15.45")
        .style("fill", "purple");
    
  
    pict.append("polygon")
        .attr("points", "0,-30 9.5,-9.66 29.39,-9.66 15.0,0 23.0,19.1 0,11.0 -23.0,19.1 -15.0,0 -29.39,-9.66 -9.5,-9.66")
        .style("fill", "yellow");

 
    pict.append("circle") 
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 10)
        .style("fill", "white");

    return pict;  
}
