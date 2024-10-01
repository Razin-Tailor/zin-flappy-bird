import React, { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import Bird from "./Bird";
import Pipes from "./Pipes";

const FlappyBird = () => {
  const stageRef = useRef();
  const [birdY, setBirdY] = useState(window.innerHeight / 2);
  const [velocity, setVelocity] = useState(0);
  const [pipeDrift, setPipeDrift] = useState(0);
  const gravity = 0.5;
  const acceleration = 0.5;
  const lift = 30;
  const [pipes, setPipes] = useState([]);

  const gameLoop = () => {
    requestAnimationFrame(gameLoop);

    setBirdY((birdY) => birdY + gravity);
    setVelocity((velocity) => velocity + gravity);
    setPipeDrift((pipeDrift) => pipeDrift + acceleration);
  }

  useEffect(() => {
    const animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId); // Cleanup on unmount
  }, [birdY, velocity]);

  return (
    <div>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          <Bird birdY={birdY} />
          {pipes.map((pipe) => pipe)}
        </Layer>
      </Stage>
    </div>
  );
};

export default FlappyBird;
