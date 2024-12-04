import React, { useState, useEffect } from "react";
import "./styles/ProductList.css";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5003/api/products");
        if (!response.ok) {
          throw new Error("Не вдалося отримати продукти");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Помилка отримання продуктів:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (products.length === 0) {
    return <div>Продукти не знайдені</div>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image_url} alt={product.product_name} />
          <h3>{product.product_name}</h3>
          <p>Ціна: ${product.price.toFixed(2)}</p>
          <button className="cartButton" onClick={() => addToCart(product)}>
            Додати в кошик
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;



