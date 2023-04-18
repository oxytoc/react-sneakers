import {useState, useEffect, useContext} from 'react';
import Card from '../components/Card';
import axios from 'axios';
import AppContext from '../context';

function Orders() {
  const {onAddToCart, onAddToFavorite} = useContext(AppContext)
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() =>{
    ( async () =>{
      try {
        const {data} = await axios.get('http://localhost:3001/orders')
        setOrders(data.map(obj => obj.items).flat())
        console.log(data.map(obj => obj.items).flat());
        setIsLoading(false)
      } catch (error) {
        alert('Не удалось отобразить список покупок')
        console.error(error)
      }
    })();
  }, [])

    return(
        <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>Мои покупки</h1>  
        </div>
        

        <div className="d-flex flex-wrap">

        {isLoading ? [...Array(8)] : orders.map((item, index) => (
            <Card
            key={index}
            loading ={isLoading}
            {...item}
          />
          ))}

        </div>
      </div>
    )
}

export default Orders;