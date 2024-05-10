import React from "react";
import { Select } from "antd";
import "../InputForm.css";

const ModelSelection = ({ setModel }) => (
  <div className="centerStyle">
    <Select
      className="inputWidth"
      showSearch
      placeholder="Search to Select"
      optionFilterProp="children"
      onChange={(value) => setModel(value)}
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={[
        {
          value: "yeezy",
          label: "Yeezy",
        },
        {
          value: "off-white",
          label: "Off-White",
        },
      ]}
    />
  </div>
);

export default ModelSelection;
