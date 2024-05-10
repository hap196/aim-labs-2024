import React from 'react';
import { Select } from 'antd';
import '../InputForm.css'; 

const Region = ({ setRegion }) => (
  <div className="centerStyle">
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      onChange={setRegion}
      options={[
        {
          value: "1",
          label: "Option 1",
        },
        {
          value: "2",
          label: "Option 2",
        },
        {
          value: "3",
          label: "Option 3",
        },
      ]}
    />
  </div>
);

export default Region;