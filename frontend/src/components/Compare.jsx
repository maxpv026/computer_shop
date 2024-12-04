import React from "react";
import "./styles/Compare.css";

const Compare = ({ compareItems, removeFromCompare }) => {
  const handleRemoveAll = () => {
    // Викликаємо `removeFromCompare` для кожного товару
    compareItems.forEach((item) => {
      removeFromCompare(item.id);
    });
  };

  return (
    <div className="compare-container">
      <h1>Порівняння товарів</h1>
      {compareItems.length === 0 ? (
        <p>Немає товарів для порівняння.</p>
      ) : (
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Характеристика</th>
                {compareItems.map((item) => (
                  <th key={item.id}>{item.product_name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ціна</td>
                {compareItems.map((item) => (
                  <td key={item.id}>${item.price.toFixed(2)}</td>
                ))}
              </tr>
              <tr>
                <td>Опис</td>
                {compareItems.map((item) => (
                  <td key={item.id}>{item.description}</td>
                ))}
              </tr>
            </tbody>
          </table>
          <button onClick={handleRemoveAll} className="remove-button">
            Видалити всі товари
          </button>
        </div>
      )}
    </div>
  );
};

export default Compare;

