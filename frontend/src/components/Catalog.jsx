import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./styles/Catalog.css";

const Catalog = ({ addToCart, addToFavorites, addToCompare, searchQuery, setSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    manufacturer: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get("http://localhost:5003/api/products");
        const fetchedProducts = productResponse.data;

        if (fetchedProducts && fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts);

          const uniqueManufacturers = Array.from(
            new Set(fetchedProducts.map((product) => product.manufacturer).filter(Boolean))
          );
          const uniqueCategories = Array.from(
            new Set(fetchedProducts.map((product) => product.type).filter(Boolean))
          );

          setManufacturers(uniqueManufacturers);
          setCategories(uniqueCategories);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Помилка завантаження продуктів:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.manufacturer) {
      filtered = filtered.filter((product) => product.manufacturer === filters.manufacturer);
    }

    if (filters.type) {
      filtered = filtered.filter((product) => product.type === filters.type);
    }

    if (filters.minPrice) {
      filtered = filtered.filter((product) => product.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((product) => product.price <= parseFloat(filters.maxPrice));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, filters, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterReset = () => {
    setFilters({
      manufacturer: "",
      type: "",
      minPrice: "",
      maxPrice: "",
    });
    setSearchQuery("");
    setFilteredProducts(products);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="catalog-container">
      <div className="filter-menu">
        <h3>Пошук та фільтри</h3>
        <div>
          <label>Пошук:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Введіть назву товару"
          />
        </div>
        <div>
          <label>Марка:</label>
          <select name="manufacturer" value={filters.manufacturer} onChange={handleFilterChange}>
            <option value="">Всі</option>
            {manufacturers.map((manufacturer, index) => (
              <option key={index} value={manufacturer}>
                {manufacturer}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Категорія:</label>
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">Всі</option>
            {categories.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Мін. ціна:</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="0"
          />
        </div>
        <div>
          <label>Макс. ціна:</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="0"
          />
        </div>
        <button onClick={handleFilterReset}>Скинути фільтри</button>
      </div>

      <div className="catalog-grid">
        {filteredProducts.length === 0 ? (
          <p className="empty-message">Товари не знайдені</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              addToFavorites={addToFavorites}
              addToCompare={addToCompare}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Catalog;

