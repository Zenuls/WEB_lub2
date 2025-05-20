/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {

    const handleSubmit= (event) => {        
        event.preventDefault();		

		// создаем словарь со значениями полей формы
		const filterField = {
			"Название": event.target["structure"].value.toLowerCase(),
		    "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
            "Год": {
                min: event.target["year_min"].value,
                max: event.target["year_max"].value
            },
            "Высота": {
                min: event.target["height_min"].value,
                max: event.target["height_max"].value
            }
	    };
			
        //фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        for(const key in  filterField) {
			if (key === "Год" || key === "Высота") {
                // Фильтрация по числовым диапазонам для года и высоты
                if (filterField[key].min) {
                    arr = arr.filter(item => item[key] >= Number(filterField[key].min));
                }
                if (filterField[key].max) {
                    arr = arr.filter(item => item[key] <= Number(filterField[key].max));
                }
            } else {
                // Фильтрация по строковым значениям для остальных полей
                if (filterField[key]) {
                    arr = arr.filter(item => 
                        item[key].toLowerCase().includes(filterField[key]));
                }
            }
        }  
                
        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        props.filtering(arr);
	}

    const handleReset = () => {
        props.filtering(props.fullData);
    }

    return (
      <form onSubmit={ handleSubmit } onReset={ handleReset }>
        <p>
          <label>Название: </label>
          <input name="structure" type="text" />
        </p>  
        <p>
          <label>Тип: </label>		
          <input name="type" type="text" />
        </p>
        <p>
          <label>Страна: </label>		
          <input name="country" type="text" />
        </p>
        <p>
          <label>Город: </label>		
          <input name="city" type="text" />
        </p>
        <p>
          <label>Год от: </label>		
          <input name="year_min" type="number" />
        </p>
        <p>
          <label>Год до: </label>		
          <input name="year_max" type="number" />
        </p>
        <p>
          <label>Высота от: </label>		
          <input name="height_min" type="number" />
        </p>
        <p>
          <label>Высота до: </label>		
          <input name="height_max" type="number" />
        </p>
        <p>         
          <button type="submit">Фильтровать</button>   
		  <button type="reset">Очистить фильтр</button>
		</p>  
      </form> 
    )
}

export default Filter;