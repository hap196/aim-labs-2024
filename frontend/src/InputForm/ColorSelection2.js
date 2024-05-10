import React, { useState } from "react";
import { Button, Space } from "antd";
import "../InputForm.css";

const ColorSelection = ({ setColorSpec }) => {
  const [colorSpec, setColorSpecLocal] = useState(null);

  const handleChange = (color) => {
    setColorSpec(color);
    setColorSpecLocal(color);
  };

  const colors = [
    "beluga",
    "black",
    "black-green",
    "black-red",
    "black-silver",
    "black-white",
    "blue",
    "butter",
    "cream-white",
    "desert-ore",
    "grim-reaper",
    "hallows-eve",
    "menta",
    "menta-rose-queen",
    "moonrock",
    "orange",
    "pink",
    "pirate-black",
    "reflective-static",
    "semi-frozen-yellow",
    "sesame",
    "static",
    "tan",
    "tint-blue",
    "turtledove",
    "volt",
    "white",
    "wolf-grey",
    "zebra",
  ];

  return (
    <div className="centerStyle">
      <div className="buttonWrapperColor">
        {colors.map((color) => (
          <Button
            key={color}
            type={colorSpec === color ? "primary" : "default"}
            onClick={() => handleChange(color)}
          >
            {color}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
