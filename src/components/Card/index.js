import { useState } from 'react';
import styles from './Card.module.scss';


function Card({ onPlus, imageUrl, title, price}) {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const onClickPlus = () =>{
        onPlus({imageUrl, title, price});
        setIsAdded(!isAdded);
    }

    const onClickFavorite = () =>{
        setIsFavorite(!isFavorite);
    }

    return(
        <div className={styles.card}>
        <div className={styles.favorite}  onClick={onClickFavorite} > <img src={isFavorite ? "img/heart-licked.svg" : "img/heart-unlicked.svg"} alt="Unlicked" /></div>
        <img width={133} height={112} src={imageUrl} alt="Nike Blazer Mid Suede" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
            <span>Цена</span>
            <b>{price} руб.</b>
        </div>
        <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg" } alt="Plus" />
        </div>
    </div>
    )
}

export default Card