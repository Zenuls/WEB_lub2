// устанавливаем соответствие между полями формы и столбцами таблицы
let correspond = {
    "Название книги": "name",
    "Автор": "author",
    "Год издания": ["min_yers", "max_yers"],
    "Издательство": "house",
    "Кол-во страниц": ["min_lists", "max_lists"],
    "Читали (тыс.)": ["min_readers", "max_readers"]
}

let dataFilter = (dataForm) => {
    let dictFilter = {};
    
    // перебираем все элементы формы с фильтрами
    for (let j = 0; j < dataForm.elements.length; j++) {
        // выделяем очередной элемент формы
        let item = dataForm.elements[j];
        
        // получаем значение элемента
        let valInput = item.value;

        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        } 
        // обработка числовых полей
        else if (item.type == "number") {
            if (valInput) {
                // преобразуем значение к числу
                valInput = Number(valInput);
            } else {
                // если поле пусто и его id включает "From" - заносим -бесконечность
                if (item.id.includes("min")) {
                    
                    valInput = -Infinity;
                }
                // если поле пусто и его id включает "To" - заносим +бесконечность
                else if (item.id.includes("max")) {
                    valInput = Infinity;
                }
            }
        }

        // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput;
    }
    
    return dictFilter;
}

// фильтрация таблицы
let filterTable = (data, idTable, dataForm) =>{
    
    // получаем данные из полей формы
    let datafilter = dataFilter(dataForm);
    
    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {

        /* в этой переменной будут "накапливаться" результаты сравнения данных
           с параметрами фильтра */
        let result = true;
        
        // строка соответствует фильтру, если сравнение всех значения из input 
        // со значением ячейки очередной строки - истина
        for(let key in item) {
            
            let val = item[key];
            
            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                val = item[key].toLowerCase() 
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1 
            } else if (typeof val != 'string') {
                let min = datafilter[correspond[key][0]];
                let max = datafilter[correspond[key][1]];

                if (key === "Год издания" || key === "Кол-во страниц" || key === "Читали (тыс.)") {
                    result &&= (val >= min && val <= max);
                }
            }
         }
         return result;
    });     

    // САМОСТОЯТЕЛЬНО вызвать функцию, которая удаляет все строки таблицы с id=idTable
    clearTable(idTable);

    // показать на странице таблицу с отфильтрованными строками
    createTable(tableFilter, idTable);  
}

function clearFilter(idTable, data) {
    const form = document.getElementById('filter');
    const inputs = form.getElementsByTagName('input');
    for (let input of inputs) {
        input.value = '';
    }
    inputs[9].value = 'Найти';
    inputs[10].value = 'Очистить фильтры';

    clearTable(idTable);
    createTable(data, idTable);
    
}