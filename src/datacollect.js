import React, { useState } from "react";

const Datacollect = () => {
  const [dimensions, setDimensions] = useState({
    width: 1,
    height: 1,
    length: 1
  });
  const [scaleFactor, setScaleFactor] = useState(1);

  const handleDimensionChange = (dimension, value) => {
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [dimension]: value
    }));
    setScaleFactor(1); // Reset scale factor when dimensions change
  };

  const handleScaleFactorChange = (value) => {
    setScaleFactor(value);
    setDimensions({ width: 1, height: 1, length: 1 }); // Reset dimensions when scale factor changes
  };

  return (
    <div>
      <div>
        <label>Width:</label>
        <input
          type="number"
          value={dimensions.width}
          onChange={(e) => handleDimensionChange("width", e.target.value)}
        />
      </div>
      <div>
        <label>Height:</label>
        <input
          type="number"
          value={dimensions.height}
          onChange={(e) => handleDimensionChange("height", e.target.value)}
        />
      </div>
      <div>
        <label>Length:</label>
        <input
          type="number"
          value={dimensions.length}
          onChange={(e) => handleDimensionChange("length", e.target.value)}
        />
      </div>
      <div>
        <label>Scale Factor:</label>
        <input
          type="number"
          value={scaleFactor}
          onChange={(e) => handleScaleFactorChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Datacollect;
