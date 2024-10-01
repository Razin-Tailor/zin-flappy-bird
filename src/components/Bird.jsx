import React from "react";
import { Circle } from "react-konva";

const Bird = ({ birdY }) => {

  return (
    <Circle

      fill={"#f5f5f5f5"}
      x={30}
      y={birdY}
      radius={20}
    ></Circle>
  );
};

export default Bird;
