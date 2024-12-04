import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Header.css";

const Header = ({ cartCount, compareCount, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">
          <Link to="/">Computer Shop</Link>
        </h1>
        <input
          type="text"
          className="search-bar"
          placeholder="Пошук товару..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch} // Пошук при натисканні Enter
        />
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/catalog">Каталог</Link>
            </li>
            <li>
              <Link to="/favorites">Улюблені</Link>
            </li>
            <li>
              <Link to="/about-us">Про Нас</Link>
            </li>
            <li>
              <Link to="/compare">
                Порівняти
                <span className="compare-count">{compareCount}</span>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                Корзина
                <span className="cart-count">{cartCount}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
