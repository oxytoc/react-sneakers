import {useContext } from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";
import AppContext from '../../context';


function Card({id, onFavorite, onPlus, imageUrl, title, price, loading = false }) {
    const {isItemAdded} = useContext(AppContext)
    const {isItemFavorite} = useContext(AppContext)


    const onClickPlus = () =>{
        onPlus({id, imageUrl, title, price});
    }

    const onClickFavorite = () =>{
        onFavorite({id, imageUrl, title, price});
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
                
                {onFavorite && <div className={styles.favorite}  onClick={onClickFavorite} > <img src={isItemFavorite(id) ? "img/heart-licked.svg" : "img/heart-unlicked.svg"} alt="Unlicked" /></div>}
                <img width={133} height={112} src={imageUrl} alt={title} />
                <h5>{title}</h5>
                <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена</span>
                    <b>{price} руб.</b>
                </div>
                {onPlus && <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg" } alt="Plus" />}
                </div>
              </>

            }
    </div>
    )
}

export default Card