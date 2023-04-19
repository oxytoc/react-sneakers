import {useState, useEffect, useContext} from 'react';
import Card from '../components/Card';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() =>{
    ( async () =>{
      try {
        const {data} = await axios.get('https://my-json-server.typicode.com/oxytoc/react-sneakers/orders')
        setOrders(data.map(obj => obj.items).flat())
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