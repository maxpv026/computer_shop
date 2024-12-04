import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  // Завантаження даних з API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5003/api/products"); // Заміни на свій URL API
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Помилка завантаження товарів:", error);
      }
    };

    fetchProducts();
  }, []);

  // Вибираємо перші 8 товарів для відображення на головній
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home">
      {/* Головний банер */}
      <div className="banner">
        <div className="banner-overlay">
          <img src="/images/tech-banner.jpg" alt="Новинки техніки 2024" />
          <div className="banner-content">
            <h2>Нові колекції техніки 2024</h2>
            <p>Найкращі гаджети, ноутбуки та аксесуари.</p>
            <Link to="/catalog" className="catalog-link">Перейти в каталог</Link>
          </div>
        </div>
      </div>

      {/* Популярні товари */}
      <div className="popular-products">
        <h2>Популярні товари</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Ціна: ${product.price}</p>
              <p>{product.description}</p>
              <button>Додати в кошик</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
