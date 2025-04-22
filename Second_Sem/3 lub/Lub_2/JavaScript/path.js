function createPathEpicycloid() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")
    let data = [];
    
    const k = 3;
    const r = 40; 
    const centerX = width / 2;
    const centerY = height / 2;
    
   
    for (let phi = 0; phi <= Math.PI * 2 * 4; phi += 0.01) {
        const x = centerX + r * (k + 1) * (Math.cos(phi) - Math.cos((k + 1) * phi) / (k + 1));
        const y = centerY + r * (k + 1) * (Math.sin(phi) - Math.sin((k + 1) * phi) / (k + 1));
        data.push({x, y});
    }
    
    return data;
}

let drawPath = () => {
    
    const dataPoints = createPathEpicycloid(); 
    
    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);
    const svg = d3.select("svg")
         
    const path = svg.append('path')
        .attr('d', line(dataPoints))
        .attr('stroke', 'black')
        .attr('fill', 'none');
        
    return path;    
}

function translateAlong(path, mx, my, mx1, my1, ang, ang1) {
    const length = path.getTotalLength();
    const interpolateScaleX  = d3.interpolate(mx, mx1);
    const interpolateScaleY  = d3.interpolate(my, my1);
    const interpolateRotate  = d3.interpolate(ang, ang1);
    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            const scaleX  = interpolateScaleX(t);
            const scaleY  = interpolateScaleY(t);
            const rotate  = interpolateRotate(t);
            return `translate(${x},${y}) scale(${scaleX},${scaleY}) rotate(${rotate})`;
        }
    }
}

