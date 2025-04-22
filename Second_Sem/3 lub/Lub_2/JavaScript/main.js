document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height) ;

    
    const buttonDraw = document.getElementsByTagName("input")[11];
    const buttonClear = document.getElementsByTagName("input")[12];

    const dataForm = document.getElementById("setting");

    buttonDraw.addEventListener("click", function(){
        runAnimation(dataForm);
    });

    buttonClear.addEventListener("click", function(){
        svg.selectAll('*').remove();
    });


   

})

let draw = (dataForm) => {
	const svg = d3.select("svg");
    let pict = drawPict(svg);
    pict.attr("transform", `translate(${dataForm.cx.value},${dataForm.cy.value}) scale(${dataForm.mx.value}, ${dataForm.my.value}) rotate(${dataForm.ang.value})`);
    
}

let runAnimation = (dataForm) => {
    const select = document.querySelector("select");
    const time = dataForm.time.value * 1000;
    const easingFunctions = [d3.easeLinear, d3.easeElastic, d3.easeBounce];
    
    let path = drawPath();    
    const svg = d3.select("svg");
    let pict = drawPict(svg);
    
    pict.transition()
        .ease(easingFunctions[select.selectedIndex])
        .duration(time)
        .attrTween('transform', translateAlong(path.node(), dataForm.mx.value, dataForm.my.value, dataForm.mx1.value, dataForm.my1.value, dataForm.ang.value, dataForm.ang1.value));
}
