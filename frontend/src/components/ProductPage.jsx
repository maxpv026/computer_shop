import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles/ProductPage.css";

const ProductPage = ({ addToCart }) => {
  const { id } = useParams(); // Отримуємо ID товару з URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/api/products/${id}`);
        setProduct(response.data); // Отримуємо дані товару
      } catch (error) {
        console.error("Помилка завантаження товару:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="product-page">
      <img src={product.image_url} alt={product.product_name} />
      <div className="product-details">
        <h1>{product.product_name}</h1>
        <p>Ціна: ${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <ul>
          <li>Марка: {product.manufacturer}</li>
          <li>Категорія: {product.type}</li>
        </ul>
        <button onClick={() => addToCart(product)}>Додати в кошик</button>
      </div>
    </div>
  );
};

export default ProductPage;

