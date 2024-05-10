import React, { useState } from "react";
import Search from "./Search";
import StockChart from "./StockChart";
import ShoeDetails from "./ShoeDetails";
import "./StockPage.css";

const StockPage = () => {
  const [selectedShoe, setSelectedShoe] = useState(null);

  const handleShoeSelect = (shoe) => {
    setSelectedShoe(shoe);
  };

  return (
    <div className="container">
      <h2 className="stock-title"> Past Sale Trends by Sneaker </h2>
      <div className="search-container">
        <Search onShoeSelect={handleShoeSelect} />
      </div>
      {selectedShoe ? (
        <>
          <ShoeDetails selectedShoe={selectedShoe} />
          <StockChart selectedShoe={selectedShoe} />
        </>
      ) : (
        <p className = "stock-direction">Search to Select a Sneaker</p>
      )}
    </div>
  );
};

export default StockPage;
