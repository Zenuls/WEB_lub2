/*
let Numbers = (...nums) => nums.filter(num => String(num).split('').every((digit, index, arr) => arr.indexOf(digit)=== arr.lastIndexOf(digit))).filter((num, index, arr) => arr.indexOf(num) === index).join(' ');

console.log(Numbers(111));
console.log(Numbers(55, 4));
console.log(Numbers(1, 11, 12));
console.log(Numbers(11, 12, 12)); 
console.log(Numbers(11, 12, 24));

*/






document.addEventListener("DOMContentLoaded", function() {
    createTable(books, 'list');

    document.getElementById("FindFilter").onclick = function() {
        filterTable(books, 'list', document.getElementById('filter'));
        clearSortTable(document.getElementById('sort'));
    };
    document.getElementById("ClearFilter").onclick = function() {
        clearFilter('list', books);
        clearSortTable(document.getElementById('sort'));
    };

    setSortSelects(books, document.getElementById('sort'));

    document.getElementById("fieldsFirst").onchange = function() {
        changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'));
        checkPrevSelect('fieldsSecond', 'fieldsFirst');
    };

    document.getElementById("fieldsSecond").onchange = function() {
        changeNextSelect('fieldsThird', document.getElementById('fieldsSecond'), document.getElementById('fieldsFirst'));
        checkPrevSelect('fieldsThird', 'fieldsSecond');
        removeSelectedFromHigherLevels('fieldsSecond');
        
    };

    document.getElementById("fieldsThird").onchange = function() {
        removeSelectedFromHigherLevels('fieldsThird');
    };

    document.getElementById("SortTable").onclick = function() {
        sortTable('list', document.getElementById('sort'));
    };

    document.getElementById("ClearSort").onclick = function() {
        clearSortTable(document.getElementById('sort'));
    };


})

// формирование полей элемента списка с заданным текстом и значением
let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

// формирование поля со списком 
// параметры – массив со значениями элементов списка и элемент select
let setSortSelect = (arr, sortSelect) => {
    
    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));
    
    // перебираем все ключи переданного элемента массива данных
    for (let i in arr) {
       // создаем OPTION из очередного ключа и добавляем в SELECT
       // значение атрибута VAL увеличиваем на 1, так как значение 0 имеет опция Нет
        sortSelect.append(createOption(arr[i], Number(i) + 1));
    }
}

//  формируем поля со списком для многоуровневой сортировки
let setSortSelects = (data, dataForm) => { 

    // выделяем ключи словаря в массив
    let head = Object.keys(data[0]);

    // находим все SELECT в форме
    let allSelect = dataForm.getElementsByTagName('select');
    
    for(let j = 0; j < allSelect.length; j++) {
        //формируем очередной SELECT
        setSortSelect(head, allSelect[j]);
        //САМОСТОЯТЕЛЬНО все SELECT, кроме первого, сделать неизменяемым
        if (j > 0) {
            allSelect[j].disabled = true;
        }
    }
}

// настраиваем поле для следующего уровня сортировки
let changeNextSelect = (nextSelectId, curSelect, prevSelect = null) => {

    if (curSelect == document.getElementById('fieldsFirst')) {
        document.getElementById('fieldsThird').disabled = true;
        document.getElementById('fieldsThird').value = 0;
        

        document.getElementById('fieldsSecond').disabled = false;
        //setSortSelects(books, document.getElementById('sort'));
        document.getElementById('fieldsSecond').value = 0;
    }

    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    // в следующем SELECT выводим те же option, что и в текущем
    nextSelect.innerHTML = curSelect.innerHTML;
    
    // Удаляем уже выбранные опции в предыдущих селекторах
    let selectedValues = [curSelect.value];
    if (prevSelect) {
        selectedValues.push(prevSelect.value);
    }

    if (curSelect.value == 0) {
        nextSelect.disabled = true;
        let thirdSelect = document.getElementById('fieldsThird');
        if (thirdSelect) {
            thirdSelect.disabled = true;
            thirdSelect.value = 0;
        }
    } else {
        let options = nextSelect.options;
        for (let i = options.length - 1; i >= 0; i--) {
            if (selectedValues.includes(options[i].value)) {
                nextSelect.remove(i);
            }
        }
    }

    

};


let checkPrevSelect = (curSelectId, prevSelectId) => {
    let curSelect = document.getElementById(curSelectId);
    let prevSelect = document.getElementById(prevSelectId);
    
    if (prevSelect.value == 0) {
        curSelect.disabled = true;
        curSelect.value = 0;
        let nextSelect = document.getElementById('fieldsThird');
        if (nextSelect) {
            nextSelect.disabled = true;
            nextSelect.value = 0;
        }
    } else {
        curSelect.disabled = false;
        
        // Удаляем из текущего списка уже выбранный элемент в предыдущем
        let selectedValue = prevSelect.value;
        let options = curSelect.options;
        for (let i = options.length - 1; i >= 0; i--) {
            if (options[i].value === selectedValue) {
                curSelect.remove(i);
            }
        }
    }
};

let removeSelectedFromHigherLevels = (curSelectId) => {
    let curSelect = document.getElementById(curSelectId);
    let selectedValue = curSelect.value;
    
    if (curSelectId === 'fieldsSecond') {
        let firstSelect = document.getElementById('fieldsFirst');
        let options = firstSelect.options;
        for (let i = options.length - 1; i >= 0; i--) {
            if (options[i].value === selectedValue) {
                firstSelect.remove(i);
            }
        }
    }
    
    if (curSelectId === 'fieldsThird') {
        let firstSelect = document.getElementById('fieldsFirst');
        let secondSelect = document.getElementById('fieldsSecond');
        let selectedValues = [selectedValue];
        
        let removeOptions = (select) => {
            let options = select.options;
            for (let i = options.length - 1; i >= 0; i--) {
                if (selectedValues.includes(options[i].value)) {
                    select.remove(i);
                }
            }
        };
        
        removeOptions(firstSelect);
        removeOptions(secondSelect);
    }
};
