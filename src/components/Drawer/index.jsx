import React from 'react'
import axios from 'axios';

import Info from "../Info"
import AppContext from '../../context'

import styles from './Drawer.module.scss'


function Drawer({onClose, onRemove, items = [], opened}) {
    const {setCartItems, cartItems} = React.useContext(AppContext);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('http://localhost:3001/orders', {
                items: cartItems,
            });
            data.items.forEach(elem =>{
                axios.delete(`http://localhost:3001/cart/${elem.id}`);
            });
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItems([]);
        } catch (error) {
            alert('Не удалось заказать товар')
        }
       setIsLoading(false)
    }

    const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

    return(
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={`${styles.drawer} p-30`}>
            <h2 className="d-flex justify-between mb-30">Корзина 
            <img onClick={onClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt="Remove" /></h2>

            {
                items.length > 0 ? 
                <div className="d-flex flex-column flex">
                    <div className="items flex">
                    {items.map((obj) =>(
                        <div key={obj.id} className={`${styles.cartItem} d-flex align-center mb-20`}>
                            <div style={{backgroundImage: `url(${obj.imageUrl})` }} className={`${styles.cartItemImg}`}></div>
                            <div className="mr-20 flex">
                            <p className="mb-5">{obj.title}</p>
                            <b>{obj.price} руб.</b>
                            </div>
                            <img onClick={() => onRemove(obj.id)} className="removeBtn" src="img/btn-remove.svg" alt="Remove"/>
                        </div>
                    ))}
                    </div> 

                    <div className={`${styles.cardTotalBlock}`}>
                        <ul>
                            <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>{totalPrice} руб. </b>
                            </li>
                            <li>
                            <span>Налог 5%:</span>
                            <div></div>
                            <b>{Math.floor(totalPrice * 0.05)} руб. </b>
                            </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="img/arrow.svg" alt="arrow" /></button>
                    </div>
                </div>
                : <Info 
                    title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                    description={isOrderComplete ?`Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавть хотя бы одну пару кроссовок, чтобы сделать заказ"}
                    image={isOrderComplete ? "img/order-processed.svg" : "img/empty-cart.avif"}
                />
            }

        </div>
      </div>
    )
}

export default Drawer