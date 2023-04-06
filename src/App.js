import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'


function App() {
  return (
    <div className="wrapper clear">
      <Drawer />

      <Header />

      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1 >Все кроссовки</h1>  
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск...." />
          </div>
        </div>
        

        <div className="d-flex">
          <Card />
          <Card />
          {/* <div className="card">
            <img width={133} height={112} src="img/sneakers/sn2.jpg" alt="Nike Air Max 270" />
            <h5>Мужские Кроссовки Nike Air Max 270</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена</span>
                <b>12 999 руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="img/plus.svg" alt="Plus" />
              </button>
            </div>
          </div>
          <div className="card">
            <img width={133} height={112} src="img/sneakers/sn3.jpg" alt="Nike Blazer Mid Suede" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена</span>
                <b>8 499 руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="img/plus.svg" alt="Plus" />
              </button>
            </div>
          </div>
          <div className="card">
            <img width={133} height={112} src="img/sneakers/sn4.jpg" alt="Puma X Aka Boku Future Rider" />
            <h5>Кроссовки Puma X Aka Boku Future Rider</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена</span>
                <b>8 999 руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="img/plus.svg" alt="Plus" />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
