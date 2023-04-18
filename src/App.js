import { useEffect, useState } from 'react';
import {
  Routes, Route
} from "react-router-dom";
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './context.js';




function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorite, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpenned, setCartOpenned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() =>{
    
    async function fetchData(){
      try {
        const [cartItemsResponse, favoritesResponse, itemsRsponse] =  await Promise.all([
          axios.get('https://my-json-server.typicode.com/oxytoc/react-sneakers/cart'), 
          axios.get('https://my-json-server.typicode.com/oxytoc/react-sneakers/favorite'), 
          axios.get('https://my-json-server.typicode.com/oxytoc/react-sneakers/items')
        ]);
        // const cartItemsResponse = await axios.get('http://localhost:3001/cart');
        // const favoritesResponse = await axios.get('http://localhost:3001/favorite');
        // const itemsRsponse = await axios.get('http://localhost:3001/items');
  
        setIsLoading(false);
        setItems(itemsRsponse.data);
        setCartItems(cartItemsResponse.data);
        setFavorites(favoritesResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error);
      }
    }
    fetchData();
  }, [])

  const onAddToCart = async (obj) =>{
    try {
      if(cartItems.find(item => Number(item.id) === Number(obj.id))){
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id))) 
        await axios.delete(`https://my-json-server.typicode.com/oxytoc/react-sneakers/cart/${obj.id}`);
      }else{
        setCartItems(prev => [...prev,obj]);
        await axios.post('https://my-json-server.typicode.com/oxytoc/react-sneakers/cart', obj);
      }
    } catch (error) {
      alert('Не удалось добавить в корзину');
      console.error(error);
    }
  };

  const onRemoveItem = async (id) =>{
    try {
      setCartItems((prev) => prev.filter((item) => item.id !== id)) 
      await axios.delete(`https://my-json-server.typicode.com/oxytoc/react-sneakers/cart/${id}`);
    } catch (error) {
      alert('Не удалось удалить');
      console.error(error);
    }
  }

  const onAddToFavorite = async (obj) =>{
    try {
      if(favorite.find(faVobj => Number(faVobj.id) === Number(obj.id))){
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        await axios.delete(`https://my-json-server.typicode.com/oxytoc/react-sneakers/favorite/${obj.id}`);
      } else {
        setFavorites(prev => [...prev,obj]);
        await axios.post(`https://my-json-server.typicode.com/oxytoc/react-sneakers/favorite`, obj);
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
      console.error(error);
    }
  }

  const onChangeSearchInput = (event) =>{
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id));
  }

  const isItemFavorite = (id) => {
    return favorite.some(obj => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={ {items, cartItems, favorite, isItemAdded, isItemFavorite, setCartOpenned, setCartItems} }>
      <>
        <div className="wrapper clear">

        <Drawer items={cartItems} onClose ={() => setCartOpenned(false)} onRemove={onRemoveItem} opened={cartOpenned} />

          <Header onClickCart ={() => setCartOpenned(true)}/>

          <Routes>
            <Route exact path="/" element={
              <Home 
                // favorite={favorite}
                // cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                items={items}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                isLoading = {isLoading}
              />
            } />

            <Route path="/favorites" element={
            <Favorites onAddToFavorite={onAddToFavorite}/>
            } />
            <Route path="/orders" element={
            <Orders
            />
            
            } />
          </Routes>

        </div>
      </>
    </AppContext.Provider>
  );
}

export default App;
