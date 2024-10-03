/* eslint-disable react/prop-types */
import { Circle } from "react-konva";

const Bird = ({ birdY }) => {

  return (
    <Circle
      fill={"#000000"}
      x={100}
      y={birdY}
      radius={20}
    ></Circle>
  );
};

export default Bird;
