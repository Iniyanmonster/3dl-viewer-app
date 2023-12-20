import React, { Component } from "react";
// import { StlViewer } from "./stl-viewer";

class Parameter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedOption: "open",
        };
      }

  handleInputChange = (e) => {
    // Update state based on user input
    this.setState({ [e.target.name]: e.target.value });
  };

  generate3DModel = () => {
    // Call the function to pass parameters to StlViewer
    const selectedParameters = { ...this.state };
    this.props.updateStlViewer(selectedParameters);
  };

  render() {
    // const selected
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "300px",
          margin: "20px",
        }}
      >
        <h3>Base configuration</h3>

        {/* ... Other input fields for windowType, subType, numberOfGlasses ... */}
        <label htmlFor="windowType">Window Type</label>
        <select
          name="windowType"
          id="windowType"
          // value={windowType}
          // onChange={(e) => setWindowType(e.target.value)}
        >
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <br />
        <br />

        <label htmlFor="subType">Sub Type</label>
        <select
          name="subType"
          id="subType"
          // value={subType}
          // onChange={(e) => setSubType(e.target.value)}
        >
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <br />
        <br />

        <label htmlFor="numberOfGlasses">Number of Glasses</label>
        <select
          name="numberOfGlasses"
          id="numberOfGlasses"
          // value={numberOfGlasses}
          // onChange={(e) => setNumberOfGlasses(e.target.value)}
        >
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <br />
        <br />

        <h3>Aperture Dimensions</h3>

        <label htmlFor="height">Height</label>
        <input
          id="height"
          name="height"
          type="text"
          value={this.state.height}
          onChange={this.handleInputChange}
        />
        <br />
        <br />

        <label htmlFor="width">Width</label>
        <input
          id="width"
          name="width"
          type="text"
          value={this.state.width}
          onChange={this.handleInputChange}
        />
        <br />
        <br />

        <label htmlFor="thickness">Thickness</label>
        <input
          id="thickness"
          name="thickness"
          type="text"
          value={this.state.thickness}
          onChange={this.handleInputChange}
        />
        <br />
        <br />

        <button onClick={this.generate3DModel} type="button">
          Generate 3D Model
        </button>

        {/* ... Other input fields for Texture, Color, Animation ... */}
        <h3>Texture</h3>

        <label for="componentSelect">Component</label>
        <select class="form-control" id="componentSelect">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <br />

        <label for="colorSelect">Color</label>
        <select class="form-control" id="colorSelect">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <br />

        <button type="submit" class="btn btn-primary">
          Update
        </button>

        <h3>Animate</h3>

        <label class="radio-label">
          <input
            type="radio"
            value="open"
            // checked={selectedOption === "open"}
            // onChange={handleOptionChange}
            name="animationGroup"
          />
          Open
        </label>

        <label class="radio-label">
          <input
            type="radio"
            value="close"
            // checked={selectedOption === "close"}
            // onChange={handleOptionChange}
            name="animationGroup"
          />
          Close
        </label>
      </div>
    );
  }
}

export default Parameter;
