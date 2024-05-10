import React from 'react';
import { Input } from 'antd';
import '../InputForm.css'; 

const SneakerName = ({ setSneakerName }) => (
  <div className="centerStyle">
    <Input className="inputWidth" placeholder="Type sneaker name..." onChange={e => setSneakerName(e.target.value)} />
  </div>
);

export default SneakerName;