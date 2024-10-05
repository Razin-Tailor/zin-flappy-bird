/* eslint-disable react/prop-types */
import { Circle } from "react-konva";
import Constants from "../constants";

const Bird = ({ birdY }) => {

  return (
    <Circle
      fill={"#000000"}
      x={Constants.BIRD_START_X}
      y={birdY}
      radius={Constants.BIRD_RADIUS}
    ></Circle>
  );
};

export default Bird;
