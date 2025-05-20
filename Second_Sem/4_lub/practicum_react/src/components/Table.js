import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from "react";
import Filter from './Filter.js';

/*
   компонент, выводящий на страницу таблицу 
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {

    

   
    

    const [activePage, setActivePage] = useState("1");
    

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const [dataTable, setDataTable] = useState(props.data);
    const updateDataTable = (value) => {
      setDataTable(value);
      setActivePage("1");
      
    }



    let rowsToShow = props.showPagination ? props.amountRows : dataTable.length;
    
    
    //количество страниц разбиения таблицы
    let n = Math.ceil(dataTable.length / props.amountRows); 
    
    // массив с номерами страниц
    let arr = Array.from({ length: n }, (v, i) => i + 1);
    
     //формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>  
      
          <span key={ index } className={item == activePage ? "active" : ""} onClick={ changeActive }> 
            {item}
          </span>
    );

    return( 
      <>
        <h4>Фильтры</h4>
        <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data }/>

        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ dataTable  } amountRows={ rowsToShow } numPage={ activePage }/>
        </table>

	      {props.showPagination && (n !== 1) && ( 
          <div className="pagination">
            {pages}
          </div>
        )}
	  </>   
    )   
}

export default Table;