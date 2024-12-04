import React, { useState } from "react";
import "./styles/Cart.css";

const Cart = ({ cartItems, addToCart, removeFromCart, deleteFromCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "+380",
    deliveryMethod: "",
    city: "",
    branch: "",
  });

  const totalPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitOrder = () => {
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.deliveryMethod) {
      alert("Будь ласка, заповніть усі обов'язкові поля.");
      return;
    }

    if (
      (orderDetails.deliveryMethod === "Укрпошта" ||
        orderDetails.deliveryMethod === "Нова пошта") &&
      (!orderDetails.city || !orderDetails.branch)
    ) {
      alert("Будь ласка, вкажіть місто та номер відділення.");
      return;
    }

    const emailData = {
      subject: "Нове замовлення з сайту",
      body: `
        <h1>Деталі замовлення:</h1>
        <p><b>Ім'я та прізвище:</b> ${orderDetails.name}</p>
        <p><b>Номер телефону:</b> ${orderDetails.phone}</p>
        <p><b>Метод доставки:</b> ${orderDetails.deliveryMethod}</p>
        ${
          orderDetails.city
            ? `<p><b>Місто:</b> ${orderDetails.city}</p>`
            : ""
        }
        ${
          orderDetails.branch
            ? `<p><b>Відділення:</b> ${orderDetails.branch}</p>`
            : ""
        }
        <p><b>Товари:</b></p>
        ${cartItems
          .map(
            (item) =>
              `<p>- ${item.product_name} (${item.quantity} шт.) на суму $${(
                item.price * item.quantity
              ).toFixed(2)}</p>`
          )
          .join("")}
        <p><b>Загальна сума:</b> $${totalPrice.toFixed(2)}</p>
      `,
    };

    fetch("http://localhost:5003/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Замовлення успішно оформлене!");
          setShowModal(false);
        } else {
          alert("Сталася помилка під час оформлення замовлення.");
        }
      })
      .catch((error) => {
        console.error("Помилка надсилання email:", error);
      });
  };

  return (
    <div className="cart-container">
      <h1>Ваш кошик</h1>
      {cartItems.length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.product_name} />
              <div>
                <h3>{item.product_name}</h3>
                <p>Ціна: ${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => removeFromCart(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
                <button
                  className="delete-button"
                  onClick={() => deleteFromCart(item.id)}
                >
                  Видалити товар
                </button>
              </div>
            </div>
          ))}
          <h2>Загальна сума: ${totalPrice.toFixed(2)}</h2>
          <button onClick={() => setShowModal(true)} className="checkout-button">
            Оформити замовлення
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Оформлення замовлення</h2>
            <label>
              Прізвище та ім'я:
              <input
                type="text"
                name="name"
                value={orderDetails.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Номер телефону:
              <input
                type="tel"
                name="phone"
                value={orderDetails.phone}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Метод доставки:
              <select
                name="deliveryMethod"
                value={orderDetails.deliveryMethod}
                onChange={handleInputChange}
                required
              >
                <option value="">Оберіть метод доставки</option>
                <option value="Самовивіз">Самовивіз</option>
                <option value="Укрпошта">Укрпошта</option>
                <option value="Нова пошта">Нова пошта</option>
              </select>
            </label>
            {(orderDetails.deliveryMethod === "Укрпошта" ||
              orderDetails.deliveryMethod === "Нова пошта") && (
              <>
                <label>
                  Місто:
                  <input
                    type="text"
                    name="city"
                    value={orderDetails.city}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Відділення:
                  <input
                    type="text"
                    name="branch"
                    value={orderDetails.branch}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </>
            )}
            <button onClick={handleSubmitOrder} className="submit-order-button">
              Підтвердити замовлення
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="cancel-order-button"
            >
              Скасувати
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
