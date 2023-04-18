import React from 'react'
import AppContext from '../context'

const Info = ({title, description, image}) => {
const {setCartOpenned} = React.useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
        <img src={image} alt="emptyCart" width={120} className="mb-20" />
        <h2 className="text-center">{title}</h2>
        <p className="opacity-6 text-center">{description}</p>
        <button onClick={() => setCartOpenned(false)} className="greenButton">
            <img src="/img/arrow.svg" alt="arrow" />
            Вернуться назад
        </button>
    </div>
  )
}


export default Info