import React from 'react';
import { DatePicker, Space } from 'antd';
import '../InputForm.css';

const ReleaseDate = ({ setReleaseDate }) => {
  const onChange = (date, dateString) => {
    setReleaseDate(dateString);
  };

  return (
    <div className="centerStyle">
      <Space direction="vertical">
        <DatePicker className="selectWidth" onChange={onChange} />
      </Space>
    </div>
  );
};

export default ReleaseDate;