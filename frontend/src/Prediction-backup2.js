import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import "./Prediction.css";

const PredictionButton = ({ selectedShoe }) => {
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    if (!selectedShoe) return;

    const currentDate = new Date();
    const releaseDate = new Date(selectedShoe.ReleaseDate);
    const DaysFromRelease = Math.floor(
      (currentDate - releaseDate) / (1000 * 60 * 60 * 24)
    );

    const formValues = {
      Brand: selectedShoe.Brand,
      SneakerNamePred: selectedShoe.SneakerName,
      Brand1: selectedShoe.Brand1,
      Brand2: selectedShoe.Brand2,
      ProductId: "boost-350-low-v2",
      Color2: selectedShoe.Color,
      Color: selectedShoe.Color2,
      PriceRatio: 4.986363636363636,
      RetailPrice: selectedShoe.RetailPrice,
      Size: selectedShoe.ShoeSize,
      DaysFromRelease: DaysFromRelease,
    };

    console.log("formvalues", formValues); // Log form values

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formValues
      );
      setResult(response.data.prediction);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
            <p className="label">Next Sell Price</p>
            <p className="price">${parseFloat(result).toFixed(2)}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PredictionButton;
