import './CSS/App.css';
import books from './data.js';
import Table from './components/Table.js';


function App() {
  return (
    <div className="App">
       <h3>Самые популярные книги мира</h3>
       <Table data={ books } amountRows="10" showPagination={false} />
    </div>
  );
}

export default App;