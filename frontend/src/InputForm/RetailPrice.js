import React from 'react';
import { InputNumber, Space } from 'antd';
import '../InputForm.css'; 

const RetailPrice = ({ setRetailPrice }) => {
  const onChange = (value) => {
    setRetailPrice(value);
  };

  return (
    <div className="centerStyle">
      <Space>
        <InputNumber
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
          onChange={onChange}
        />
      </Space>
    </div>
  );
};

export default RetailPrice;