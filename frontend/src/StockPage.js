import React, { useState } from 'react';
import Search from './Search';
import StockChart from './StockChart';
import ShoeDetails from './ShoeDetails';

const StockPage = () => {
  const [selectedShoe, setSelectedShoe] = useState(null);

  const handleShoeSelect = (shoe) => {
    setSelectedShoe(shoe);
  };

  return (
    <div>
      <Search onShoeSelect={handleShoeSelect} />
      {selectedShoe && <StockChart selectedShoe={selectedShoe} />}
      {selectedShoe && <ShoeDetails selectedShoe={selectedShoe} />} {/* Add this line */}
    </div>
  );
};

export default StockPage;