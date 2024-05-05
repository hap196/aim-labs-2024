import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import data from "./data/AveragePredictedSalesPrice.csv";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Typography } from "antd";
import "./ShoeDetails.css"; 

const { Title } = Typography;

const ShoeDetails = ({ selectedShoe }) => {
  const [predictedSalesPrice, setPredictedSalesPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [color, setColor] = useState("");
  const capitalizeFirstLetter = (string) => {
    return string
      .replace(/-/g, " ") 
      .split(" ") 
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
      .join(" "); 
  };

  useEffect(() => {
    console.log("Selected shoe:", selectedShoe); 

    fetch(data)
      .then((response) => response.text())
      .then((csvString) => {
        Papa.parse(csvString, {
          header: true,
          complete: function (results) {
            console.log("CSV data parsed"); 
            console.log("Parse results:", results);
            results.data.forEach((row, index) => {
              console.log(`Row ${index} SneakerName:`, row["SneakerName"]); 
            });

            console.log(results.data[0]); 

            const shoeData = results.data.find(
              (row) =>
                row["SneakerName"].trim().toLowerCase() ===
                selectedShoe.trim().toLowerCase()
            ); 

            if (shoeData) {
              setPredictedSalesPrice(
                parseFloat(shoeData["PredictedSalesPrice"]).toFixed(2)
              );
              setBrand(
                `${capitalizeFirstLetter(
                  shoeData["Brand1"]
                )} ${capitalizeFirstLetter(shoeData["Brand2"])}`
              ); 
              setColor(shoeData["Color"].replace(/-/g, " "));
              setRetailPrice(parseFloat(shoeData["RetailPrice"]).toFixed(2));


              console.log(
                "Predicted Sales Price:",
                shoeData["PredictedSalesPrice"]
              );
              console.log(
                "Brand:",
                `${shoeData["Brand1"]} ${shoeData["Brand2"]}`
              );
              console.log("Retail Price:", shoeData["RetailPrice"]);
              console.log("Color:", shoeData["Color"]);
            }
          },
        });
      });
  }, [selectedShoe]);

  const priceRatio = (predictedSalesPrice / retailPrice) * 100;
  const isPositive = priceRatio > 100;

  return (
    <div className="center-text">
      <Title level={3}>{capitalizeFirstLetter(selectedShoe)}</Title>
      <Title level={2} className="predicted-price">
       Predicted Sales Price: ${parseFloat(predictedSalesPrice).toFixed(2)}
      </Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Brand" value={brand} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Retail Price"
              value={`$${parseFloat(retailPrice).toFixed(2)}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Color" value={color} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Price Ratio"
              value={priceRatio.toFixed(2)}
              precision={2}
              valueStyle={{
                color: isPositive ? "#3f8600" : "#cf1322",
              }}
              prefix={isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ShoeDetails;
