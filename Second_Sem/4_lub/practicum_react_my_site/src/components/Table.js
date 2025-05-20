import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from "react";
import Filter from './Filter.js';
import Sort from './Sorting.js';

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

    const [filteredData, setFilteredData] = useState(props.data); 
    const [dataTable, setDataTable] = useState(props.data); 
    const updateFilteredData = (filtered) => {
      setFilteredData(filtered);
      setDataTable(filtered); 
      setActivePage("1");
    }

    const updateDataTable = (sorted) => {
      setDataTable(sorted);
      setActivePage("1");
    }


    
    let rowsToShow = props.showPagination ? props.amountRows : dataTable.length;
    
    
    
    let n = Math.ceil(dataTable.length / props.amountRows); 
    
    
    let arr = Array.from({ length: n }, (v, i) => i + 1);
    
     
    const pages = arr.map((item, index) =>  
      
          <span key={ index } className={item == activePage ? "active" : ""} onClick={ changeActive }> 
            {item}
          </span>
    );

    return( 
      <>
      <div class = "controls" style={{ }}>
        <div>
          <h4>Фильтры</h4>
          <Filter filtering={updateFilteredData} data={dataTable} fullData={props.data} />
        </div>

        <div>
          <h4>Сортировка</h4>
          <Sort fullData={filteredData} sorting={updateDataTable} list={props.data} />
        </div>
      </div>
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