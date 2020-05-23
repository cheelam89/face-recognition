import React, { Component } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import "tachyons";
import Logo from "./Components/Logo/Logo";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Rank from "./Components/Rank/Rank";
import Clarifai from "clarifai";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import ParticleOptions from "./ParticleOptions";

const app = new Clarifai.App({
  apiKey: "e3fe16f4c9c94c43990457ad642b1ee4",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signIn",
      isSignIn: false,
    };
  }

  onRouteChange = (route) => {
    if (route === "home") this.setState({ isSignIn: true });
    else this.setState({ isSignIn: false });
    this.setState({ route: route });
  };

  calculateFaceLocation = (data) => {
    const clarifaiResponse =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const imgWidth = Number(image.width);
    const imgHeight = Number(image.height);
    return {
      leftCol: clarifaiResponse.left_col * imgWidth,
      topRow: clarifaiResponse.top_row * imgHeight,
      rightCol: imgWidth - clarifaiResponse.right_col * imgWidth,
      bottomRow: imgHeight - clarifaiResponse.bottom_row * imgHeight,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };

  render() {
    const {box, imageURL, route, isSignIn} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={ParticleOptions} />
        <Navigation
          isSignIn={isSignIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              faceBox={box}
              imageURL={imageURL}
            />
          </div>
        ) : route === "signIn" ? (
          <Login onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
