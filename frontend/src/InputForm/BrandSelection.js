import React, { useState } from 'react';
import { Button, Space } from 'antd';
import '../InputForm.css'; 

const BrandSelection = ({ setBrand }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleChange = (brand) => {
    setBrand(brand);
    setSelectedBrand(brand);
  };

  return (
    <div className="centerStyle">
      <Space>
        <Button type={selectedBrand === 'adidas' ? 'primary' : 'default'} onClick={() => handleChange('adidas')}>Adidas</Button>
        <Button type={selectedBrand === 'air-jordan' ? 'primary' : 'default'} onClick={() => handleChange('air-jordan')}>Air Jordan</Button>
        <Button type={selectedBrand === 'nike' ? 'primary' : 'default'} onClick={() => handleChange('nike')}>Nike</Button>
      </Space>
    </div>
  );
};

export default BrandSelection;