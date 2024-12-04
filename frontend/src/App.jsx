import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Catalog from "./components/Catalog";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import ProductPage from "./components/ProductPage";
import Compare from "./components/Compare";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [compareItems, setCompareItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem.quantity === 1) {
        // Видаляємо товар, якщо його кількість 1
        return prevItems.filter((item) => item.id !== productId);
      } else {
        // Зменшуємо кількість товару
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const deleteFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };


  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((item) => item.id === product.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, product];
    });
  };
  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== productId)
    );
  };

  const addToCompare = (product) => {
    if (compareItems.length >= 2) {
      alert("Можна порівняти тільки два товари одночасно.");
      return;
    }
    if (!compareItems.find((item) => item.id === product.id)) {
      setCompareItems((prevItems) => [...prevItems, product]);
    }
  };
  const removeFromCompare = (productId) => {
    setCompareItems((prevCompareItems) =>
      prevCompareItems.filter((item) => item.id !== productId)
    );
  };
  

  return (
    <Router>
      <Header
        cartCount={cartItems.reduce((count, item) => count + item.quantity, 0)}
        compareCount={compareItems.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/catalog"
          element={
            <Catalog
              addToCart={addToCart}
              addToFavorites={addToFavorites}
              addToCompare={addToCompare}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<ProductPage addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cartItems={cartItems} addToCart={addToCart}
              removeFromCart={removeFromCart}
              deleteFromCart={deleteFromCart} />} />
        <Route path="/compare" element={<Compare compareItems={compareItems} removeFromCompare={removeFromCompare}/>} />
        <Route path="/favorites" element={<Favorites favorites={favorites}  addToCart={addToCart}
              removeFromFavorites={removeFromFavorites}/>} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Footer" element={<Footer/>} />
      </Routes>
    </Router>
  );
};

export default App;

