document.addEventListener("DOMContentLoaded", function() {
    /*
    let pict = drawSmile(svg);
    pict.attr("transform", "translate(200, 200)");
    let pict1 = drawSmile(svg); 
    pict1.attr("transform", `translate(400, 400) scale(1.5, 1.5) rotate(180)`);
    */
    document.getElementById("Draw").onclick = function() {
        draw(document.getElementById("setting"));
    };

    document.getElementById("Clear").onclick = function() {
        d3.select("svg").selectAll('*').remove()
    };

    document.getElementById("Animat").onclick = function() {
        
        runAnimation(document.getElementById("setting"));
        
    };
})

document.addEventListener('change', function() {
    if (document.getElementById("animateToggle").checked) {
        document.getElementById("options").style.display = '';
        document.getElementById("An").style.display = '';
        document.getElementById("Draw").style.display = 'none';
        document.getElementById("cx_finish_blok").style.display = '';
        document.getElementById("cx_finish_blok2").style.display = '';
        document.getElementById("cx_finish_blok3").style.display = '';
    } else {
        document.getElementById("options").style.display = 'none';
        document.getElementById("An").style.display = 'none';
        document.getElementById("Draw").style.display = '';
        document.getElementById("cx_finish_blok").style.display = 'none';
        document.getElementById("cx_finish_blok2").style.display = 'none';
        document.getElementById("cx_finish_blok3").style.display = 'none';
        document.getElementById("Ane").checked = false;
    }
    if (document.getElementById("Ane").checked) {
        document.getElementById("cx_finish_blok4").style.display = 'none';
        document.getElementById("cx_finish_blok4_1").style.display = 'none';
        document.getElementById("cx_finish_blok1").style.display = '';
        document.getElementById("cx_finish_blok").style.display = 'none';
        document.getElementById("cx_finish_blok4_2").style.display = '';
    } else {
        document.getElementById("cx_finish_blok1").style.display = 'none';
        document.getElementById("cx_finish_blok").style.display = '';
        document.getElementById("cx_finish_blok4").style.display = '';
        document.getElementById("cx_finish_blok4_1").style.display = '';
        document.getElementById("cx_finish_blok4_2").style.display = 'none';
    }
});

let draw = (dataForm) => {
    const width = 600;
    const height = 600;
	const svg = d3.select("svg")
        .attr("width", width)
	    .attr("height", height);
    let pict = drawSmile(svg)
    pict.attr("transform", `translate(${dataForm.cx.value},
                                      ${dataForm.cy.value}) scale(${dataForm.on_x.value},
                                                                  ${dataForm.on_y.value}) rotate(${dataForm.rotation.value})`);
}

let runAnimation = (dataForm) => {
    const width = 600;
        const height = 600;
        const svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);
        let pict = drawSmile(svg)
if (!(document.getElementById("Ane").checked)) {

    
        let easeType = document.getElementById("options").value;
        let easingFunc = d3[easeType];
        pict.attr("transform", `translate(${dataForm.cx.value},
                                        ${dataForm.cy.value}) scale(${dataForm.on_x.value},
                                                                    ${dataForm.on_y.value}) rotate(${dataForm.rotation.value})`)
        .transition()
        .duration(6000)

        .ease(easingFunc)
        .attr("transform", `translate(${dataForm.cx_finish.value},
                                        ${dataForm.cy_finish.value}) scale(${dataForm.do_x.value},
                                                                    ${dataForm.do_y.value}) rotate(${dataForm.f_rotation.value})`);
} else {
    let easeType = document.getElementById("options").value;
    let easingFunc = d3[easeType];
   let path = drawPath(document.getElementById("cx_finish_blok1_s").selectedIndex);	
   
   pict.transition()
   
   .ease(easingFunc) // установить в зависимости от настроек формы
   .duration(6000)
   .attrTween('transform', translateAlong(path.node()));
}

}