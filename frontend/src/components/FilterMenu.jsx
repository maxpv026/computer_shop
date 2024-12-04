import React from "react";
import "./styles/FilterMenu.css";

const FilterMenu = ({ filters, setFilters, manufacturers, applyFilters }) => {
  const handleManufacturerChange = (manufacturer) => {
    setFilters((prevFilters) => {
      const updatedManufacturers = prevFilters.manufacturers.includes(manufacturer)
        ? prevFilters.manufacturers.filter((m) => m !== manufacturer)
        : [...prevFilters.manufacturers, manufacturer];
      return { ...prevFilters, manufacturers: updatedManufacturers };
    });
  };

  return (
    <div className="filter-menu">
      <h3>Filters</h3>
      <div className="filter-section">
        <label htmlFor="type">type:</label>
        <select
          id="type"
          value={filters.type}
          onChange={(e) =>
            setFilters((prevFilters) => ({ ...prevFilters, type: e.target.value }))
          }
        >
          <option value="All">All</option>
          <option value="1">Laptops</option>
          <option value="2">Keyboards</option>
          <option value="3">Monitors</option>
        </select>
      </div>

      <div className="filter-section">
        <label>Manufacturer:</label>
        <div className="manufacturer-list">
          {manufacturers.map((manufacturer, index) => (
            <div key={index} className="manufacturer-item">
              <input
                type="checkbox"
                id={`manufacturer-${index}`}
                value={manufacturer}
                onChange={() => handleManufacturerChange(manufacturer)}
              />
              <label htmlFor={`manufacturer-${index}`}>{manufacturer}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label>Price:</label>
        <div className="price-filter">
          <input
            type="number"
            placeholder="Min"
            value={filters.price.min}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                price: { ...prevFilters.price, min: e.target.value },
              }))
            }
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.price.max}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                price: { ...prevFilters.price, max: e.target.value },
              }))
            }
          />
        </div>
      </div>

      <button className="apply-filters-button" onClick={applyFilters}>
        Apply Filters
      </button>
    </div>
  );
};

export default FilterMenu;

