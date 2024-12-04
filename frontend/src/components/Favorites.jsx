import React from "react";
import "./styles/Favorites.css";

const Favorites = ({ favorites, addToCart, removeFromFavorites }) => {
  return (
    <div className="favorites-container">
      <h1>Улюблені товари</h1>
      {favorites.length === 0 ? (
        <p>Немає улюблених товарів.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={item.id} className="favorite-card">
              <img src={item.image_url} alt={item.product_name} />
              <h3>{item.product_name}</h3>
              <p>Ціна: ${item.price.toFixed(2)}</p>
              <div className="favorite-actions">
                <button onClick={() => addToCart(item)}>Додати в кошик</button>
                <button onClick={() => removeFromFavorites(item.id)}>
                  Видалити з улюблених
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;




