import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import "./Prediction.css";

const PredictionButton = ({ selectedShoe }) => {
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    if (!selectedShoe) return;

    const currentDate = new Date();
    const releaseDate = new Date(selectedShoe.ReleaseDate);
    let DaysFromRelease = Math.floor(
      (currentDate - releaseDate) / (1000 * 60 * 60 * 24)
    );

    const results = [];

    const days = [0, 2, 10, 14];

    for (let day of days) {
      const formValues = {
        // Brand: selectedShoe.Brand,
        SneakerNamePred: selectedShoe.SneakerName,
        Brand1: selectedShoe.Brand1.toLowerCase(),
        Brand2: selectedShoe.Brand2.toLowerCase(),
        Color: selectedShoe.Color,
        Color2: selectedShoe.Color2,
        RetailPrice: selectedShoe.RetailPrice,
        Size: selectedShoe.ShoeSize,
        DaysFromRelease: DaysFromRelease + day,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/predict",
          formValues
        );
        results.push({ day: day, prediction: response.data.prediction });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    setResult(results);
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="bestPriceContainer">
        <Button type="primary" onClick={fetchData} className="bestPriceBtn">
          SEE BEST PRICE
        </Button>
      </div>
      <Modal
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="edit" onClick={handleOk}>
            Edit Details
          </Button>,
          <Button key="new" onClick={() => window.location.reload()}>
            New Prediction
          </Button>,
        ]}
      >
        {result && (
          <div className="modalContent">
            {result.map(({ day, prediction }, index) => {
              const price = parseFloat(prediction).toFixed(2);
              const isPositive = price > parseFloat(result[0].prediction);
              return (
                <div key={day}>
                  <p className="label">
                    {day === 0 ? "Today's Price" : `In ${day} Days (Projected)`}
                  </p>
                  {day !== 0 && (
                    <Statistic
                      className="pricefuture"
                      value={price}
                      precision={2}
                      valueStyle={{
                        color: isPositive ? "#3f8600" : "#cf1322",
                      }}
                      suffix={
                        isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                      }
                      prefix="$"
                    />
                  )}
                  {day === 0 && <p className="price">${price}</p>}
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PredictionButton;
