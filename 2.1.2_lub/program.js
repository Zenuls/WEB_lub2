function showInputFields() {
    const inputType = document.getElementById('inputType').value;
    const label3 = document.getElementById('label3');
    const input3 = document.getElementById('input3');

    if (inputType === 'sideAndAngle') {
        label3.textContent = 'Угол α (в градусах):';
        input3.style.display = 'inline';
        document.getElementById('trapezoidImage').src = 'trapezoid_side_angle.png';
    } else if (inputType === 'sideAndSide') {
        label3.textContent = 'Боковая сторона c:';
        input3.style.display = 'inline';
        document.getElementById('trapezoidImage').src = 'trapezoid_side_side.png';
    }
}

window.onload = function() {
    let input1 = document.getElementById('input1');
    let input2 = document.getElementById('input2');
    let input3 = document.getElementById('input3');
    let input4 = document.getElementById('calculations');
    let output = document.getElementById('output');

    input1.onfocus = function() {
        this.classList.remove('error'); 
        output.innerHTML = '';
    };
    input2.onfocus = function() {
        this.classList.remove('error'); 
        output.innerHTML = '';
    };
    input3.onfocus = function() {
        this.classList.remove('error'); 
        output.innerHTML = '';
    };
    input4.onfocus = function() {
        document.getElementById('calculation').classList.remove('error'); 
        output.innerHTML = '';
    };
};

function calculate() {
    const inputType = document.getElementById('inputType').value;
    const a = parseFloat(document.getElementById('input1').value);
    const b = parseFloat(document.getElementById('input2').value);
    const cOrAlpha = parseFloat(document.getElementById('input3').value);
    const output = document.getElementById('output');
    output.innerHTML = '';

    if (isNaN(a)  || a <= 0 ) {
        document.getElementById('input1').classList.add("error")
        output.innerHTML = '<p class="error">Ошибка: некорректные данные в 1 поле.</p>';
        return;
    }

    if (isNaN(b) || b <= 0) {
        document.getElementById('input2').classList.add("error")
        output.innerHTML = '<p class="error">Ошибка: некорректные данные в 2 поле.</p>';
        return;
    }
    
    if (isNaN(cOrAlpha) || cOrAlpha <= 0 || (inputType === 'sideAndAngle' && (cOrAlpha > 45 ))) {

        document.getElementById('input3').classList.add("error")
        if (inputType === 'sideAndAngle' && (cOrAlpha > 45 )) {
            output.innerHTML = '<p class="error">Ошибка: некорректные данные в 3 поле.<br>Угол не должен быть более 45*</p>';
        }
        else output.innerHTML = '<p class="error">Ошибка: некорректные данные в 3 поле.</p>';
        return;
    }

    let height, area, perimeter;

    if (inputType === 'sideAndAngle') {
        const alpha = cOrAlpha * (Math.PI / 180); // Перевод в радианы
        height = Math.abs(b - a) * Math.tan(alpha);
    } else if (inputType === 'sideAndSide') {
        const c = cOrAlpha;
        height = Math.sqrt(c ** 2 - (b - a) ** 2);
    }

    area = ((a + b) / 2) * height;
    perimeter = a + b + 2 * Math.sqrt(height ** 2 + ((b - a) / 2) ** 2);



    const calculations = document.getElementById('calculations');
    if (calculations.selectedOptions.length === 0) {
        document.getElementById('calculation').classList.add("error")
        output.innerHTML = '<p class="error">Ошибка: выберите хотя бы одну характеристику.</p>';
        return;
    }

    let result = '<p>Результаты:</p>';
    for (let option of calculations.selectedOptions) {
        if (option.value === 'height') {
            result += `<p>Высота: ${height.toFixed(2)}</p>`;
        } else if (option.value === 'area') {
            result += `<p>Площадь: ${area.toFixed(2)}</p>`;
        } else if (option.value === 'perimeter') {
            result += `<p>Периметр: ${perimeter.toFixed(2)}</p>`;
        }
    }
    output.innerHTML = result;
}

function clearData() {
    document.getElementById('input1').value = '';
    document.getElementById('input1').classList.remove("error"); 
    document.getElementById('input2').value = '';
    document.getElementById('input2').classList.remove("error"); 
    document.getElementById('input3').value = '';
    document.getElementById('input3').classList.remove("error"); 
    document.getElementById('output').innerHTML = '';
    document.getElementById('calculations').selectedIndex = -1;

}


 


 
 

