import React from "react";
import "./styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>Про Нас</h1>
      <p>Ласкаво просимо до Computer Shop! Ми пропонуємо найкращі технічні товари за доступними цінами.
      Наш асортимент включає сучасні комп’ютери, ноутбуки, комплектуючі, аксесуари та багато іншого. Ми прагнемо забезпечити вас якісними товарами, які відповідають вашим потребам.
      </p>
      <p>Зв’яжіться з нами: <a href="mailto:support@computershop.com" className="email-link">support@computershop.com</a></p>
      <button className="contact-button">Зв’яжіться з нами</button>
    </div>
  );
};

export default AboutUs;


