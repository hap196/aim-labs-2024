import React, { useRef, useState, useEffect } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import BrandSelection from "./InputForm/BrandSelection";
import ModelSelection from "./InputForm/ModelSelection";
import SneakerName from "./InputForm/SneakerName";
import RetailPrice from "./InputForm/RetailPrice";
import ReleaseDate from "./InputForm/ReleaseDate";
import ColorSelection from "./InputForm/ColorSelection";
import ColorSelection2 from "./InputForm/ColorSelection2";
import ShoeSize from "./InputForm/ShoeSize";
import Region from "./InputForm/Region";
import { Carousel, Button } from "antd";
import PredictionButton from "./Prediction";
import "./InputForm.css";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#2D3267",
  lineHeight: "200px",
  textAlign: "center",
  fontSize: "24px", 
};

const App = ({ onFormSubmit }) => {
  const carouselRef = useRef();

  const next = () => {
    carouselRef.current.next();
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      next();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const prev = () => {
    carouselRef.current.prev();
  };
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [sneakerName, setSneakerName] = useState(null);
  const [retailPrice, setRetailPrice] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const [color, setColor] = useState(null);
  const [colorSpec, setColorSpec] = useState(null);
  const [shoeSize, setShoeSize] = useState(null);
  const [region, setRegion] = useState(null);

  const handleSubmit = () => {
    const formValues = {
      // Brand: model,
      Brand2: model,
      SneakerName: sneakerName,
      Brand1: brand,

      // ProductId: "boost-350-low-v2",
      Color2: color,
      Color: colorSpec,
      // PriceRatio: 4.986363636363636,
      RetailPrice: retailPrice,
      ShoeSize: shoeSize,
      ReleaseDate: releaseDate,
    };

    console.log("formValues in handleSubmit", formValues); // Log form values

    onFormSubmit(formValues);
  };

  return (
    <>
      <div className="carouselWrapper">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={prev}
          className="prevArrow"
        />
        <Carousel
          ref={carouselRef}
          arrows
          dotPosition="left"
          infinite={false}
          className="carousel"
        >
          <div className="carouselSlide">
            <div className="carouselContent">
              <h3 style={contentStyle}>Choose Brand</h3>
              <BrandSelection setBrand={setBrand} />
            </div>
          </div>
          <div className="carouselContent">
            <div className="carouselSlide">
              <h3 style={contentStyle}>Choose Model</h3>
              <ModelSelection setModel={setModel} />
            </div>
          </div>
          <div className="carouselSlide">
            <div className="carouselContent">
              <h3 style={contentStyle}>Sneaker Name</h3>
              <SneakerName setSneakerName={setSneakerName} />
            </div>
          </div>
          <div className="carouselSlide">
            <div className="carouselContent">
              <h3 style={contentStyle}>Retail Price</h3>
              <RetailPrice setRetailPrice={setRetailPrice} />
            </div>
          </div>
          <div className="carouselSlide">
            <div className="carouselContent">
              <h3 style={contentStyle}>Release Date</h3>
              <ReleaseDate setReleaseDate={setReleaseDate} />
            </div>
          </div>
          <div className="carouselSlide">
            <div className="carouselContent">
              <h3 style={contentStyle}>
                What is the primary color of your shoe?
              </h3>
              <ColorSelection setColor={setColor} />
            </div>
          </div>
          <div className="carouselSlide">
            <div className="carouselContent">
              <h3 style={contentStyle}>
                (Optional) Choose a specific colorway
              </h3>
              <ColorSelection2 setColorSpec={setColorSpec} />
            </div>
          </div>
          <div className="carouselSlide">
            <div className="carouselContent">
              <h3 style={contentStyle}>Shoe Size</h3>
              <ShoeSize setShoeSize={setShoeSize} />
            </div>
          </div>
          {/* <div className="carouselSlide">
            <div className="carouselContent">
              <h3 style={contentStyle}>Your Region</h3>
              <Region setRegion={setRegion} />
            </div>
          </div> */}
        </Carousel>
        <p className="enterContinue">Press 'Enter' to continue</p>
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={next}
          className="nextArrow"
        />
      </div>
      <div className="buttonWrapper">
        <Button
          type="primary"
          onClick={handleSubmit}
          className="submitBtn"
          disabled={
            !brand ||
            !model ||
            !sneakerName ||
            !retailPrice ||
            !releaseDate ||
            !color ||
            !shoeSize
          }
        >
          Done
        </Button>
      </div>
    </>
  );
};

export default App;
