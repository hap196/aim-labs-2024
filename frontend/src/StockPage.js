import React, { useState } from 'react';
import Search from './Search';
import StockChart from './StockChart';
import ShoeDetails from './ShoeDetails';
import './StockPage.css';

const StockPage = () => {
  const [selectedShoe, setSelectedShoe] = useState(null);

  const handleShoeSelect = (shoe) => {
    setSelectedShoe(shoe);
  };

  return (
    <div className="container">
      <div className="search-container">
        <Search onShoeSelect={handleShoeSelect} />
      </div>
      {selectedShoe && <ShoeDetails selectedShoe={selectedShoe} />}
      {selectedShoe && <StockChart selectedShoe={selectedShoe} />}
    </div>
  );
};

export default StockPage;