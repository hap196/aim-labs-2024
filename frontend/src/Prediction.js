import React, { useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [result, setResult] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        // replace with input data here
        // Brand: ' Yeezy',
        SneakerNamePred: 'nike',
        Brand1: 'adidas',
        Brand2: 'yeezy',
        // ProductId: 'boost-350-low-v2',
        Color: 'beluga',
        Color2: 'black',
        // PriceRatio: 4.986363636363636,
        RetailPrice: 220.0,
        Size: 11.0,
        DaysFromRelease: 342
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default YourComponent;
