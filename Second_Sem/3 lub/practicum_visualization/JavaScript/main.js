document.addEventListener("DOMContentLoaded", function() { 
    showTable('build', buildings); 

    let toggleButton = d3.select("#toggle-table");
    let isVisible = true;
    let table = d3.select("#build");

    toggleButton.on("click", function() {
        isVisible = !isVisible;
        
        if (isVisible) {
            
           
            table.attr("hidden", null);
            toggleButton.attr("value", "Скрыть таблицу");
        } else {
        
            table.attr("hidden", true);
            toggleButton.attr("value", "Показать таблицу");
            
        }
    });

    // Обработчик для построения графика
    d3.select("#build-chart").on("click", function() {
        const keyX = d3.select('input[name="ox-axis"]:checked').node().value;
        const oyMax = d3.select("#oy-max").node().checked;
        const oyMin = d3.select("#oy-min").node().checked;
        const chartType = d3.select("#chart-type").node().value;
        
        drawGraph(buildings, keyX, oyMax, oyMin, chartType);
    });

    drawGraph(buildings, "Страна", true, false, "scatter");


    d3.selectAll('input[name="oy-axis"]').on('change', function() {
        
        let checkedBoxes = d3.selectAll('input[name="oy-axis"]:checked')
            .nodes() 
            .reduce((acc, node) => { 
                acc.push(node.value);
                return acc;
            }, []);
    
        if (checkedBoxes.length === 0) {
            d3.select("#error-message").text("Выберите хотя бы одно значение по оси OY!");
            d3.select("svg").style("height", "0px");
        } else {
            d3.select('#error-message').text('');
            d3.select("svg").style("height", "400px");
        }
    
    });


    

}) 