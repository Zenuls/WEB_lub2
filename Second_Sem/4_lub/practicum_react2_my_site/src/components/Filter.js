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

	
		const filterField = {
			"Название книги": event.target["name"].value.toLowerCase(),
      "Автор": event.target["author"].value.toLowerCase(),
      "Год издания": {
          min: event.target["year_min"].value,
          max: event.target["year_max"].value
      },
      "Издательство": event.target["house"].value.toLowerCase(),
      "Кол-во страниц": {
          min: event.target["str_min"].value,
          max: event.target["str_max"].value
      },
      "Читали (тыс.)": {
          min: event.target["reader_min"].value,
          max: event.target["reader_max"].value
      }
	    };
			
      
        let arr = props.fullData;
    for (const key in filterField) {
        if (key === "Год издания" || key === "Кол-во страниц" || key === "Читали (тыс.)") {
            const min = filterField[key].min ? Number(filterField[key].min) : null;
            const max = filterField[key].max ? Number(filterField[key].max) : null;
            
            if (min !== null) {
                arr = arr.filter(item => item[key] !== undefined && item[key] !== null && item[key] >= min);
            }
            if (max !== null) {
                arr = arr.filter(item => item[key] !== undefined && item[key] !== null && item[key] <= max);
            }
        } else {
            if (filterField[key]) {
                arr = arr.filter(item => 
                    item[key] && item[key].toLowerCase().includes(filterField[key]));
            }
        }
    }  
        props.filtering(arr);
	}

    const handleReset = () => {
        props.filtering(props.fullData);
    }

    return (
      <form onSubmit={ handleSubmit } onReset={handleReset}>
        <p>
          <label>Название книги: </label>
          <input name="name" type="text" />
        </p>  
        <p>
          <label>Автор: </label>		
          <input name="author" type="text" />
        </p>
        <p>
          <label>Год издания от: </label>		
          <input name="year_min" type="number" />
        </p>
        <p>
          <label>Год издания до: </label>		
          <input name="year_max" type="number" />
        </p>
        <p>
          <label>Издательство: </label>		
          <input name="house" type="text" />
        </p>
        <p>
          <label>Кол-во страниц от: </label>		
          <input name="str_min" type="number" />
        </p>
        <p>
          <label>Кол-во страниц до: </label>		
          <input name="str_max" type="number" />
        </p>
        <p>
          <label>Читатели от: </label>		
          <input name="reader_min" type="number" />
        </p>
        <p>
          <label>Читатели до: </label>		
          <input name="reader_max" type="number" />
        </p>
        <p>         
          <button type="submit">Фильтровать </button>   
		      <button type="reset">Очистить фильтр</button>
		    </p>  
      </form> 
    )
}

export default Filter;