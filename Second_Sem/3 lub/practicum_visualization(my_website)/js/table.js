//выводим таблицу на страницу
let createTable = (data, idTable) => {
	// находим таблицу
	let table = document.getElementById(idTable);

     
    
	if (table.rows.length < 1) {
       // формируем заголовочную строку из ключей нулевого элемента массива
        let tr = document.createElement('tr');

        for(key in data[0]) {
            let th = document.createElement('th');
            th.innerHTML = key;
            tr.append(th);
        }

        table.append(tr);	
    }
	
	
	// самостоятельно сформировать строки таблицы на основе массива data
	data.forEach((item) => {
           // создать новую строку таблицы tr
           let row = document.createElement('tr');
           // перебрать ключи очередного элемента массива
           for (let key in item) {
               // создать элемент td
               let cell = document.createElement('td');
               // занести в него соответствующее значение из массива
               cell.innerHTML = item[key]; 
               // добавить элемент td к строке
               row.append(cell);
           }

          // строку добавить в таблицу
          table.append(row);
	});	
}

let clearTable = (idTable) => {
    let table = document.getElementById(idTable);
    
    
    // Удаляем все строки таблицы, начиная с последней
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    
    
}