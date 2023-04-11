import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { useEffect, useState } from 'react';
import axios from 'axios';




function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpenned, setCartOpenned] = useState(false);

  useEffect(() =>{
    // fetch('https://642ffa0ec26d69edc887f702.mockapi.io/items').then(res =>{
    //   return res.json();
    // }).then(json=>{
    //   setItems(json)
    // });

    axios.get('http://localhost:3001/items').then(res =>{
      setItems(res.data);
    });
    axios.get('http://localhost:3001/cart').then(res =>{
      setCartItems(res.data);
    })
  }, [])

  const onAddToCart = (obj) =>{
    axios.post('http://localhost:3001/cart', obj);
    setCartItems(prev => [...prev,obj]);
  };

  const onRemoveItem = (id) =>{
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id ));
  }

  const onChangeSearchInput = (event) =>{
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">

      {cartOpenned ? <Drawer items={cartItems} onClose ={() => setCartOpenned(false)} onRemove={onRemoveItem} /> : null}

      <Header onClickCart ={() => setCartOpenned(true)}/>

      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>  
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && <img onClick={() => setSearchValue('')} className="removeBtn cu-p clear" src="/img/btn-remove.svg" alt="Remove" />}
            <input onChange={onChangeSearchInput} vlaue={searchValue} placeholder="Поиск...." />
          </div>
        </div>
        

        <div className="d-flex flex-wrap">

          {items.filter(item=>item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            <Card
            title={item.title}
            imageUrl={item.imageUrl}
            price={item.price}
            onPlus={(obj) => onAddToCart(obj)}
            key={index}
          />
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;
