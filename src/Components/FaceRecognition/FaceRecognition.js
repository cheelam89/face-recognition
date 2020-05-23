import React from "react";
import "./FaceRecognition.css";

function FaceRecognition({ imageURL, faceBox }) {
  console.log(faceBox);
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageURL}
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: faceBox.topRow,
            right: faceBox.rightCol,
            left: faceBox.leftCol,
            bottom: faceBox.bottomRow,
          }}
        ></div>
      </div>
    </div>
  );
}

export default FaceRecognition;
