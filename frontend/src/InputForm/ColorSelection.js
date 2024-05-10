import React, { useState } from 'react';
import { Button, Space } from 'antd';
import '../InputForm.css'; 

const ColorSelection = ({ setColor }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleChange = (color) => {
    setColor(color);
    setSelectedColor(color);
  };

  const colors = ['black', 'red', 'white', 'blue', 'yellow', 'orange', 'green', 'pink', 'grey'];

  return (
    <div className="centerStyle">
      <Space>
        {colors.map(color => (
          <Button key={color} type={selectedColor === color ? 'primary' : 'default'} onClick={() => handleChange(color)}>{color}</Button>
        ))}
      </Space>
    </div>
  );
};

export default ColorSelection;