import React from "react";
import { InputNumber } from "antd";
import "../InputForm.css";

const ShoeSize = ({ setShoeSize }) => {
  const onChange = (value) => {
    setShoeSize(value);
  };

  return (
    <div className="centerStyle">
      <InputNumber min={2} max={14} onChange={onChange} />
    </div>
  );
};

export default ShoeSize;