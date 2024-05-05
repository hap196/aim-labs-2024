import React, { useEffect, useState } from "react";
import { Select } from "antd";
import Papa from "papaparse";
import data from "./data/AveragePredictedSalesPrice.csv";
import "./Search.css";

const Search = ({ onShoeSelect }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    Papa.parse(data, {
      download: true,
      header: true,
      complete: function (results) {
        const sneakerNames = results.data
          .map((row) => {
            if (row["SneakerName"]) {
              return {
                value: row["SneakerName"],
                label: row["SneakerName"].replace(/-/g, " "),
              };
            } else {
              return null;
            }
          })
          .filter((option) => option !== null && option.label !== "");

        setOptions(sneakerNames);
      },
    });
  }, []);

  const handleSelect = (value) => {
    onShoeSelect(value);
  };

  return (
    <Select
      showSearch
      style={{ width: "80%", fontSize: "1.2em" }}
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={options}
      onSelect={handleSelect}
    />
  );
};

export default Search;
