import Card from '../components/Card';
function Home({
    favorite,
    cartItems,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    items,
    onAddToCart,
    onAddToFavorite,
    isLoading
}) {

  const renderItems = () => {
    const filterItems = items.filter(item=>item.title.toLowerCase().includes(searchValue.toLowerCase()));

    return(isLoading ? [...Array(10)] : filterItems).map((item, index) => (
      <Card
        favorited={favorite.some(obj => Number(obj.id) === Number(item.id))}
        added={cartItems.some(obj => Number(obj.id) === Number(item.id))} // если вернет хотя бы один обхет то передастся true
        onPlus={(obj) => onAddToCart(obj)}
        onFavorite={(obj) => onAddToFavorite(obj)}
        key={index}
        loading ={isLoading}
        {...item}
      />
    ))
  }
    return(
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

          {renderItems()}

        </div>
      </div>
    )
}

export default Home;