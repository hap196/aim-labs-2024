import React, { useEffect, useState } from "react";
import { Select } from "antd";
import Papa from "papaparse";
import data from "./data/AveragePredictedSalesPrice.csv";

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
                value: row["SneakerName"], // Store the original shoe name as the value
                label: row["SneakerName"].replace(/-/g, " "), // Display the shoe name without dashes as the label
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
    onShoeSelect(value); // Pass the original shoe name to onShoeSelect
  };

  return (
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
      options={options}
      onSelect={handleSelect} // Call handleSelect when an option is selected
    />
  );
};

export default Search;