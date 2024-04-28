import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import data from "./data/AveragePredictedSalesPrice.csv";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Typography } from 'antd';

const { Title } = Typography;

const ShoeDetails = ({ selectedShoe }) => {
  const [predictedSalesPrice, setPredictedSalesPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [color, setColor] = useState("");
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  useEffect(() => {
    // ...
  }, [selectedShoe]);

  const priceRatio = (predictedSalesPrice / retailPrice) * 100;
  const isPositive = priceRatio > 100;

  return (
    <div>
      <Title level={2}>Predicted Price: ${parseFloat(predictedSalesPrice).toFixed(2)}</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Brand"
              value={brand}
            />
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
            <Statistic
              title="Color"
              value={color}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Price Ratio"
              value={priceRatio.toFixed(2)}
              precision={2}
              valueStyle={{
                color: isPositive ? '#3f8600' : '#cf1322',
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