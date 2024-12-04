import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ProductCard.css";

const ProductCard = ({ product, addToCart, addToFavorites, addToCompare }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`); // Перенаправлення на сторінку товару
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img src={product.image_url} alt={product.product_name} />
      <h3>{product.product_name}</h3>
      <p>Ціна: ${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      <div className="product-actions">
        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Додати в кошик</button>
        <button className="heart-button" onClick={() => addToFavorites(product)}>
  ❤️
</button>

        <button
          className="compare-button"
          onClick={(e) => { e.stopPropagation(); addToCompare(product); }}
        >
          Додати до порівняння
        </button>
      </div>
    </div>
  );
};

export default ProductCard;



















