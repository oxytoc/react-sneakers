import { useEffect, useState } from 'react';
import {
  Routes, Route
} from "react-router-dom";
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';



function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorite, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpenned, setCartOpenned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() =>{
    
    async function fetchData(){
      const cartItemsResponse = await axios.get('http://localhost:3001/cart');
      const favoritesResponse = await axios.get('http://localhost:3001/favorite');
      const itemsRsponse = await axios.get('http://localhost:3001/items');

      setIsLoading(false);
      setItems(itemsRsponse.data);
      setCartItems(cartItemsResponse.data);
      setFavorites(favoritesResponse.data);
    }

    fetchData();
  }, [])

  const onAddToCart = (obj) =>{
    try {
      if(cartItems.find(item => Number(item.id) === Number(obj.id))){
        axios.delete(`http://localhost:3001/cart/${obj.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) != Number(obj.id))) 
      }else{
      axios.post('http://localhost:3001/cart', obj);
      setCartItems(prev => [...prev,obj]);
      }
    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  };

  const onRemoveItem = (id) =>{
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id != id)) 
  }

  const onAddToFavorite = (obj) =>{
    try {
      if(favorite.find(faVobj => Number(faVobj.id) === Number(obj.id))){
        axios.delete(`http://localhost:3001/favorite/${obj.id}`);
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post(`http://localhost:3001/favorite`, obj);
        setFavorites(prev => [...prev,obj]);
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
    }
  }

  const onChangeSearchInput = (event) =>{
    setSearchValue(event.target.value);
  }

  console.log(favorite);
  return (
    <>
    <div className="wrapper clear">

    {cartOpenned ? <Drawer items={cartItems} onClose ={() => setCartOpenned(false)} onRemove={onRemoveItem} /> : null}

      <Header onClickCart ={() => setCartOpenned(true)}/>

      <Routes>
        <Route exact path="/" element={
          <Home 
            favorite={favorite}
            cartItems={cartItems}
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
         <Favorites items={favorite} onAddToFavorite={onAddToFavorite}/>
        } />
      </Routes>

    </div>
    </>
  );
}

export default App;
