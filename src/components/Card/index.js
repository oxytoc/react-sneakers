import { useState } from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";


function Card({id, onFavorite, onPlus, imageUrl, title, price, favorited = false, added = false, loading = false }) {
    const [isAdded, setIsAdded] = useState(added);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () =>{
        onPlus({id, imageUrl, title, price});
        setIsAdded(!isAdded);
    }

    const onClickFavorite = () =>{
        onFavorite({id, imageUrl, title, price});
        setIsFavorite(!isFavorite);
    }

    return(
        <div className={styles.card}>
            {
                loading ? <ContentLoader 
                speed={2}
                width={150}
                height={220}
                viewBox="0 0 150 220"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                >
                <rect x="0" y="20" rx="10" ry="10" width="150" height="90" /> 
                <rect x="0" y="125" rx="3" ry="3" width="150" height="15" /> 
                <rect x="0" y="150" rx="3" ry="3" width="93" height="15" /> 
                <rect x="0" y="190" rx="8" ry="8" width="80" height="24" /> 
                <rect x="118" y="190" rx="8" ry="8" width="32" height="32" />
              </ContentLoader> : <>
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
              </>

            }
    </div>
    )
}

export default Card