/*формируем массив для сортировки по уровням вида 
  (в нашем случае в форме три уровня сортировки):
   [
    {column: номер столбца, по которому осуществляется сортировка, 
     order: порядок сортировки (true по убыванию, false по возрастанию)
    },
    {column: номер столбца, 
     order: порядок сортировки
    },
    {column: номер столбца, 
     order: порядок сортировки
    }
   ]
*/

let createSortArr = (data) => {
    let sortArr = [];
    
    let sortSelects = data.getElementsByTagName('select');
    
    for (let i = 0; i < sortSelects.length; i++) {   
       // получаем номер выбранной опции
        let keySort = sortSelects[i].value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем номер значение флажка для порядка сортировки
        // имя флажка сформировано как имя поля SELECT и слова Desc
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push(
          {column: keySort - 1, 
           order: desc}
        ); 
    }
    return sortArr; 
};

let sortTable = (idTable, data) => {
    
    // формируем управляющий массив для сортировки
    let sortArr = createSortArr(data);
    
    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        return false;
    }
    //находим нужную таблицу
    let table = document.getElementById(idTable);

    // преобразуем строки таблицы в массив 
    let rowData = Array.from(table.rows);
    
    // удаляем элемент с заголовками таблицы
    rowData.shift();

    
    
   
    // используется массив sortArr
    rowData.sort((first, second) => {
        for (let i = 0; i < sortArr.length; i++) {
            let key = sortArr[i].column;
            let val1 = (key == 0 || key == 1 || key == 3) ? first.cells[key].innerHTML : Number(first.cells[key].innerHTML);
            let val2 = (key == 0 || key == 1 || key == 3) ? second.cells[key].innerHTML : Number(second.cells[key].innerHTML);
            
            if (val1 > val2) return sortArr[i].order ? -1 : 1;
            if (val1 < val2) return sortArr[i].order ? 1 : -1;
        }
        return 0;
    });
    
    rowData.forEach(row => table.appendChild(row));

    
};

let clearSortTable = (data) => {
    let sortSelects = data.getElementsByTagName('select');
    for (let i = 0; i < sortSelects.length; i++) {
        sortSelects[i].innerHTML = '';
        setSortSelect(Object.keys(books[0]), sortSelects[i]);
        sortSelects[i].value = 'Нет';
        sortSelects[i].selectedIndex = 0;
        document.getElementById(sortSelects[i].id + 'Desc').checked = false;
    }
    
    changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'));
    changeNextSelect('fieldsThird', document.getElementById('fieldsSecond'));


    filterTable(books, 'list', document.getElementById('filter'));

};