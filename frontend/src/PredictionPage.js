import React, { useState } from "react";
import { Link } from "react-router-dom";
import PredictionButton from "./Prediction";
import "./PredictionPage.css";
import InputForm from "./InputForm";
import { Card } from "antd"; 
import graph from "./images/graph.png";

const PredictionPage = () => {
  const [selectedShoe, setSelectedShoe] = useState(null);

  const handleFormSubmit = (formValues) => {
    console.log("formValues", formValues);
    setSelectedShoe(formValues);
  };

  return (
    <div className="PredictionPageStyle">
      <div className="PredictionText">
        <h1 className="PredictionTitle">
          How much is your shoe today? Tomorrow? Next Week?
        </h1>
        <p>
          Searching for a new pair of shoes but concerned about overpaying? Want
          to make bank by reselling trending shoes? SneakIn helps you sneak-in
          to buy and sell your favorite sneakers for the best price!
        </p>
        <Link to="/stockpage">See Past Sale Trends by Sneaker</Link>
      </div>

      <div className="InputFormStyle">
        <Card className="InputFormCard">
          <InputForm onFormSubmit={handleFormSubmit} />
          {selectedShoe && <PredictionButton selectedShoe={selectedShoe} />}
        </Card>
      </div>
    </div>
  );
};

export default PredictionPage;
